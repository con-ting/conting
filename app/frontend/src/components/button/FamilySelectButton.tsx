import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {getFamilies} from '../../api/web3/web3.ts';
import {PublicKey} from '@solana/web3.js';
import {useAnchorWallet} from '../../config/web3Config.tsx';
import {useConnection} from '../mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms.ts';
import {H3} from '../../config/Typography.tsx';
import {findFamilyInfo} from '../../api/web3/did.ts';
import {
  biometricsAuth,
  checkKey,
  createKey,
  deleteKey,
} from '../../utils/biometric/Biometrics.tsx';

type familyData = {
  id: string;
  email: string;
  name: string;
  wallet: string;
};

export default function FamilySelectButton(showID) {
  const [isFamily, setIsFamily] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [settingData, setSettingData] = useState(false);
  const {connection} = useConnection();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const handleBiometricAuth = async () => {
    try {
      const hasKey = await checkKey();
      let signatureKey;

      if (hasKey) {
        console.log('해시키', hasKey);
        const bioAuthResult = await biometricsAuth();
        // id,
        // '지문 인증을 위해 인증해주세요.',
        if (!bioAuthResult.result) {
          await deleteKey();
          const keyCreationResult = await createKey();
          if (!keyCreationResult.result) {
            console.log('새 키 생성 실패');
            return;
          }
          signatureKey = await biometricsAuth();
          // id,
          // '지문 인증을 위해 인증해주세요.',
        } else {
          signatureKey = bioAuthResult;
        }
      } else {
        const keyCreationResult = await createKey();
        if (!keyCreationResult.result) {
          console.log('키 생성 실패');
          return;
        }
        signatureKey = await biometricsAuth();
        // id,
        // '지문 인증을 위해 인증해주세요.',
      }

      if (signatureKey && signatureKey.result) {
        console.log('서명 키 생성 성공', signatureKey.key);
        await findFamilyInfo({
          performance_id: showID.showID,
          owner_fingerprint_key: signatureKey.key,
          owner_id: userInfo?.user_id,
          owner_wallet: userInfo?.walletAddress,
          families: isFamily,
        });
      } else {
        console.log('서명 키 생성 실패');
        new Error('서명 키 생성 실패');
      }
    } catch (error) {
      console.error('지문 인증 처리 중 오류 발생:', error);
    }
  };

  const renderingData = async () => {
    const families = await getFamilies(
      new PublicKey(userInfo.walletAddress),
      connection,
      useAnchorWallet,
    );
    setButtons(families);
  };

  useEffect(() => {
    renderingData();
    setSettingData(true);
  }, []);
  const switchColor = (data: any) => {
    if (isFamily.includes(data)) {
      // 이미 선택된 경우, 제거
      setIsFamily(isFamily.filter(item => item.id !== data.id));
    } else {
      // 선택되지 않은 경우, 추가
      setIsFamily([...isFamily, data]);
    }
  };
  useEffect(() => {
    console.log('isFamily', isFamily);
  }, [isFamily]);
  if (settingData) {
    return (
      <View style={styles.container}>
        {buttons.map(data => (
          <TouchableOpacity
            key={data.id}
            style={[
              styles.button,
              {
                backgroundColor: isFamily.includes(data)
                  ? '#FCC434'
                  : '#1C1C1C',
              },
              {borderColor: isFamily.includes(data) ? '#FCC434' : '#000000'},
            ]}
            onPress={() => switchColor(data)}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.name,
                  {color: isFamily.includes(data) ? '#000000' : '#FFFFFF'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {data.name}
              </Text>
              <Text
                style={[
                  styles.email,
                  {color: isFamily.includes(data) ? '#000000' : '#FFFFFF'},
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                ({data.email})
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.buttonAsk,
            {backgroundColor: '#000000'},
            {borderColor: '#FCC434'},
          ]}
          onPress={handleBiometricAuth}>
          <Text style={[styles.title, {color: '#FCC434'}]}>예매 부탁하기</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <H3>로딩</H3>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 55,
    borderRadius: 10,
    margin: 5,
    borderWidth: 2,
  },
  buttonAsk: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
  email: {
    flex: 1,
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
});
