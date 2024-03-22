# S10P22C209
# 기능 구현 내역

### 스플래시 뷰
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/authScreen/SplashScreen.tsx)

  ![스플래시.gif](/docs/img/스플래시.gif)


```
스플레쉬 화면에서 서버에 모든 콘서트 정보를 요청합니다. 
해당 요청이 완료가 된경우 앱 내 저장소에 저장 후 로그인 페이지로 이동합니다.
요청이 실패한 경우는 앱을 재 구동해달라는 메세지를 보냅니다.
```


### 로그인
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/authScreen/LoginScreen.tsx)

  ![로그인.gif](/docs/img/로그인.gif)


```
[작업 내용]
이메일 형식을 검증합니다. 올바른 이메일 형식이 아니라면 올바른 이메일 형식을
알려주는 메세지를 보여줍니다.
비밀번호 패턴 검증을 합니다. 올바른 비밀번호 패턴이 아니라면 로그인 버튼이
활성화 되지 않습니다.
서버에 로그인 요청을 보낸 후 성공한다면 JWT 토큰을 전역으로 상태관리하여 
인스턴스 함수에서 사용되게 하여 프론트서버에서 보내게 되는 API는 토큰을 
넣거나, 재발행 같은 예외처리를 자동화하여 프론트 팀에서 작업하게 해야하는 
불편함을 해소했습니다.
```

### 메인화면
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/MainScreen.tsx)

  ![메인카드.gif](/docs/img/메인카드.gif)


```
[작업 내용]
메인 포스터 전체 이미지 색에 따라 배경이 동적으로 변화합니다. 
```


- 선착순 공연
    
![메인선착리스트.gif](/docs/img/메인선착리스트.gif)


```
[작업 내용]
예매 방식이 선착순 예매인 공연을 횡스크롤로 확인할 수 있습니다. 
```
    


- 추첨 공연

  ![메인추첨리스트.gif](/docs/img/메인추첨리스트.gif)
    
```
[작업 내용]
예매 방식이 추첨 예매인 공연을 횡스크롤로 확인할 수 있습니다. 
```
    


- 광고 배너 및 응모 이벤트 리스트
    
    ![배너와응모.gif](/docs/img/배너와응모.gif)

```
[작업 내용]
NFT 응모권을 활용한 응모 굿즈를 확인할 수 있습니다. 
```
    


### 공연 상세 페이지에서 토글이 될 예매부탁/직접예매 버튼
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/settingScreen/MyPageScreen.tsx)

![공연상세버튼들.gif](/docs/img/공연상세버튼들.gif)

```
[작업내용]
가족에게 티켓 구매 권한을 넘기는 UI 및 직접 구매를 하는 버튼 UI를 구현했습니다. 
```

### 예매할 경우 대기열 입장
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/ticketingScreen/WaitingScreen.tsx)

![대기열.gif](/docs/img/대기열.gif)

```
[작업내용]
대용량 트래픽을 처리하기 위한 대기열을 구성했습니다.
```

### 구역 선택
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/ticketingScreen/SeatingAreaSelectScreen.tsx)

![구역선택.gif](/docs/img/구역선택.gif)

```
[작업내용]
전체 구역을 다 보여준다면, 자리 선택하는 UI가 너무 작아지기 때문에
구역을 탭으로 나누어 선택할 수 있는 UI를 구현했습니다. 
```

### 좌석 선택
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/ticketingScreen/SeatSelectScreen.tsx)
![좌석선택.gif](/docs/img/좌석선택.gif)

```
좌석 이미지의 좌석 좌표를 찾은 뒤 해당 좌석을 터치로 접근할 수 있게 하는 UI를 구성했습니다. 
```

### 결제 정보 및 결제 결과
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/ticketingScreen/PaymentScreen.tsx)

- 결제 성공 시

![결제결과성공.gif](/docs/img/결제결과성공.gif)
    


- 응모 성공 시

![응모성공시.gif](/docs/img/응모성공시.gif)
    



- 결제 실패 시

![결제실패.gif](/docs/img/결제실패.gif)


```
[작업내용]
결제,응모 결과에 따른 UI를 구현했습니다.
```

### 입장권
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/ticketEntryScreen/TicketListScreen.tsx)

![입장권.gif](/docs/img/입장권.gif)

### 구매 내역
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/ticketEntryScreen/ticketRefundScreen/RefundInfoScreen.tsx)

![구매내역.gif](/docs/img/구매내역.gif)

```
[작업내용]
콘서트 NFT 티켓 입장권을 UI를 구성했습니다.
```


### 환불
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/mainScreen/ticketingScreen/ResultRefundScreen.tsx)

- 성공 시

![환불성공.gif](/docs/img/환불성공.gif)


- 실패 시

![환불실패.gif](/docs/img/환불실패.gif)
    

```
[작업내용]
환불 결과에 따른 UI를 구현했습니다.
```


### 그 외 작업중인 추첨결과 및 티켓북 탭 화면
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/lotteryResultScreen/ReservationWaitingScreen.tsx)
- [해당 화면 FE 코드 보기](/app/frontend/src/screens/ticketApplyScreen/TicketApplyListScreen.tsx)

![작업중탭.gif](/docs/img/작업중탭.gif)



# 인프라

## 중앙 로그 관리소

```
[작업 내용]
Elastic Search, Fluent D, Kibana를 활용해 기동중인 모든 도커 컨테이너의 로그를 수집하여 한 곳에서 관리합니다. 
```
![image.png](docs/img/image.png)


## 젠킨스와 도커 컨테이너 기반 CI/CD 환경 구축

```
[작업 내용] 
도커 컨테이너와 EC2, Jenkins를 활용해 모노레포에서의 MSA CI/CD 환경을 구축하였습니다. 
```

## locust를 활용해 대기큐 성능 측정 중

```
[작업 내용]
web flux와 단일 Redis를 활용해 완전 비동기 방식으로 
대기큐 진입 및 대기큐 조회, 대기큐 제거 API를 개발하였습니다. 
locust를 이용해 사용자 수 10만명 ramp up time 10초로 초당 1만명이 몰려드는 상황으로
peek test를 진행하고 성능 개선 방안을 고민중입니다. 

동일 호스트 내부에서 테스트를 진행해서 정확하지 않은 상태라, 추후 배포 후 다시 실험해볼 생각입니다.
 
```



![image-1.png](docs/img/image-1.png)

```
[작업내용]
현재 결과에서는 약 82만의 리퀘스트에 대해 3만 정도의 에러가 발생했습니다. 
하지만 33,495건의 에러는 전부 유저가 동일 큐에 대해 진입 요청을 하는 409 (Conflict)에러 상황이므로 
connection out에 따른 서버 에러는 없는 상태입니다. 

```

![image-2.png](docs/img/image-2.png)

```
[작업내용]
대부분 
0.2초에서 4초 사이의 응답을 받지만, 
일부 유저들의 경우 대기시간이 6초를 넘어가기 때문에 이를 해결해야할 것 같습니다
```
