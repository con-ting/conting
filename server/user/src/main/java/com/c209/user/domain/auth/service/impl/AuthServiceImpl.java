package com.c209.user.domain.auth.service.impl;


import com.c209.user.domain.auth.data.dto.TokenDto;
import com.c209.user.domain.auth.data.dto.request.LoginRequest;
import com.c209.user.domain.auth.data.dto.request.TokenRefreshRequest;
import com.c209.user.domain.auth.data.dto.request.VerificationSendRequest;
import com.c209.user.domain.auth.data.dto.response.LoginResponse;
import com.c209.user.domain.auth.error.AuthErrorCode;
import com.c209.user.domain.auth.repository.redis.AuthRepository;
import com.c209.user.domain.user.data.dto.UserDto;
import com.c209.user.domain.user.exception.UserErrorCode;
import com.c209.user.global.jwt.JwtTokenProvider;
import com.c209.user.global.jwt.RefreshTokenRepository;
import com.c209.user.global.redis.repository.AuthRedisRepository;
import com.c209.user.domain.auth.service.AuthService;
import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.user.data.entity.UserEntity;
import com.c209.user.domain.user.repository.UserRepository;
import com.c209.user.global.error.CommonException;
import com.c209.user.global.util.RandomNumberUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    @Value("${cool.sms.outgoing.number}")
    private String phoneNumber;

    private final UserRepository userRepository;
    private final AuthRepository authRedisRepository;
    private final PasswordEncoder passwordEncoder;
    private final RandomNumberUtil randomNumberUtil;
    private final DefaultMessageService messageService;

    private final JwtTokenProvider jwtTokenProvider;

    private final RefreshTokenRepository refreshTokenRepository;



    @Override
    public Long registryUser(JoinUserRequest request) {

        //다음과 같은 근거로  join쿼리가 아닌, 단일 쿼리로 각각 조회합니다.
        //1. 요구사항 변경에 유연하게 대처하기 위함
        //2. 트래픽이 몰리지 않는 구간
        //3. 지속적으로 호출되지 않는 api (유저당 약 1번만 호출)

        //중복된 이메일이 있는 조회하기
        if(userRepository.existsByEmail(request.email())){
            throw new CommonException(AuthErrorCode.DUPLICATE_EMAIL_ERROR);
        };

        //중복된 fcm 있는지 조회하기
        if(userRepository.existsByFcmToken(request.fcm())){
            throw new CommonException(AuthErrorCode.DUPLICATE_FCM_ERROR);
        }

        String encodedPassword = passwordEncoder.encode(request.password());
        UserEntity user = request.toEntity(encodedPassword);
        log.debug(request.toString());
        log.debug(user.toString());

        return userRepository.save(user).getId();

    }

    @Override
    public boolean sendMessage(VerificationSendRequest request) {
        //난수 생성
        int randomNumber = randomNumberUtil.getRandomNumber();
        //레디스에 fcm과 난수 저장
        authRedisRepository.deleteRandomNumberByFCMToken(request.fcm());
        authRedisRepository.saveRandomNumberWithFCMToken(request.fcm(), randomNumber);
        //난수 메시지 보내기

        Message message = new Message();
        message.setFrom(phoneNumber);
        message.setTo(request.phone_number());
        message.setText("[콘팅] : 다음 번호를 입력해주세요 "+ randomNumber );

        log.debug("인증 번호 : {}", randomNumber);
        try{
            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        }catch(Exception e){
            throw new CommonException("CoolSMS :: "+ e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return true;
    }

    @Override
    public boolean verify(String randomNumber, String fcm) {

        String savedRandomNumber = authRedisRepository.findRandomNumberByFCMToken(fcm)
                                                    .orElseThrow(()-> new CommonException(AuthErrorCode.NOT_FOUND_RANDOM_NUMBER));

        if(!savedRandomNumber.equals(randomNumber)){
            throw new CommonException(AuthErrorCode.NOT_MATCHED_RANDOM_NUMBER);
        }

        return true;
    }


    @Override
    public LoginResponse login(LoginRequest request) {

        UserDto loginUser = userRepository.findByEmail(request.email())
                                            .orElseThrow(()-> new CommonException(UserErrorCode.NOT_FOUND_USER)).toDto();


        //비밀번호가 일치하는지 확인

        if(!passwordEncoder.matches(request.password(), loginUser.getPassword())){

            throw new CommonException(AuthErrorCode.NOT_MATCHED_PASSWORD);
        }

        String accessToken = jwtTokenProvider.issueAccessToken(loginUser.getId());
        String refreshToken = jwtTokenProvider.issueRefreshToken();



        refreshTokenRepository.delete(String.valueOf(loginUser.getId()));
        refreshTokenRepository.save(refreshToken, String.valueOf(loginUser.getId()));



        return LoginResponse.builder()
                .token(
                        TokenDto.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build()
                )
                .user(
                        UserDto.builder()
                                .id(loginUser.getId())
                                .email(loginUser.getEmail())
                                .build()
                )
                .build();
    }

    @Override
    public TokenDto refresh(TokenRefreshRequest request) {

        Long userId = jwtTokenProvider.parseAccessTokenByBase64((request.accessToken()));


        String savedRefreshToken = String.valueOf(refreshTokenRepository.find(String.valueOf(userId))
                .orElseThrow(()-> new CommonException(AuthErrorCode.INVALID_TOKEN)));


        if(!savedRefreshToken.equals(request.refreshToken())){
            throw new CommonException(AuthErrorCode.INVALID_TOKEN);
        }

        String renewalAccessToken = jwtTokenProvider.issueAccessToken(userId);
        String renewalRefreshToken = jwtTokenProvider.issueRefreshToken();

        refreshTokenRepository.delete(request.refreshToken());
        refreshTokenRepository.save(renewalRefreshToken, String.valueOf(userId));


        return TokenDto.builder()
                .accessToken(renewalAccessToken)
                .refreshToken(renewalRefreshToken)
                .build();
    }


}
