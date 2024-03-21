# S10P22C209
# 기능 구현 내역

### 스플래시 뷰

![스플래시.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/38d5d1c2-b167-46ab-9f9b-d6f009dd7208/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/18ad98cb-a5ac-4b34-a05a-5c99b23a6146/Untitled.gif)

```
스플레쉬 화면에서 서버에 모든 콘서트 정보를 요청합니다. 
해당 요청이 완료가 된경우 앱 내 저장소에 저장 후 로그인 페이지로 이동합니다.
요청이 실패한 경우는 앱을 재 구동해달라는 메세지를 보냅니다.
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/29c23e16-a677-442c-aab9-d69cfcd4b089/Untitled.gif)

### 로그인

![로그인.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/d9477a2c-5da7-4f01-b941-64f402c1cfa2/%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/8e1ebe7b-e0cb-474e-a460-bde6008c9c5a/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/339fcd6e-4d4d-4e4b-8303-b92d9a4aad5e/Untitled.gif)

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

![메인카드.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/12fcc2f7-06ff-48c9-97cf-1b23f5d0e120/%EB%A9%94%EC%9D%B8%EC%B9%B4%EB%93%9C.gif)

```
[작업 내용]
메인 포스터 전체 이미지 색에 따라 배경이 동적으로 변화합니다. 
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/ffc38d85-e4bc-4b5f-9bf9-bbbe4d389c5a/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/55a0a0e0-1c9e-4a1e-84f2-e8b0530edd06/Untitled.gif)

- 선착순 공연
    
    ![메인선착리스트.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/f1baea72-e5d2-472f-a9ab-7f15adb5c037/%EB%A9%94%EC%9D%B8%EC%84%A0%EC%B0%A9%EB%A6%AC%EC%8A%A4%ED%8A%B8.gif)
    
    ```java
    [작업 내용]
    예매 방식이 선착순 예매인 공연을 횡스크롤로 확인할 수 있습니다. 
    ```
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c054f191-45ca-491a-a7f6-8282f9177b2c/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/43380fcc-1654-4687-8f5e-de05dd31bafd/Untitled.gif)

- 추첨 공연
    
    ![메인추첨리스트.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/68c52106-3c4b-4ad6-bd25-e8dcfdd18f2c/%EB%A9%94%EC%9D%B8%EC%B6%94%EC%B2%A8%EB%A6%AC%EC%8A%A4%ED%8A%B8.gif)
    
    ```java
    [작업 내용]
    예매 방식이 추첨 예매인 공연을 횡스크롤로 확인할 수 있습니다. 
    ```
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/d330c477-3c5e-40b5-96a4-e311db5e3382/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/ca07e8a7-11fb-49c7-b4fe-bf0930e61dca/Untitled.gif)

- 광고 배너 및 응모 이벤트 리스트
    
    ![배너와응모.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/d15d286c-a5f8-4b9a-a16b-9e49dbb2e575/%EB%B0%B0%EB%84%88%EC%99%80%EC%9D%91%EB%AA%A8.gif)
    
    ```java
    [작업 내용]
    NFT 응모권을 활용한 응모 굿즈를 확인할 수 있습니다. 
    ```
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/93d7b262-3df6-4c6f-a9b2-e42de9f7bcf8/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c4e87ed6-f779-4d41-b485-12015b5dc435/Untitled.gif)

### 공연 상세 페이지에서 토글이 될 예매부탁/직접예매 버튼

![버튼리스트.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c75f657b-312a-4d9e-831f-b720737a4a64/%EB%B2%84%ED%8A%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/5bfef430-64ec-4bf9-950b-dc51fd8c8f54/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/8808b717-390b-4b3d-8780-e2f22053942d/Untitled.gif)

### 예매할 경우 대기열 입장

![대기열.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/5671135a-4ad9-42db-92e7-685e92607a5f/%EB%8C%80%EA%B8%B0%EC%97%B4.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c110213b-84a1-46a7-aab8-48a65b327cf6/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/80f04948-7339-4b21-91f0-a438d06e1c68/Untitled.gif)

### 구역 선택

![구역선택.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/d68f7cbf-469f-4a27-931f-77cf3b9515e9/%EA%B5%AC%EC%97%AD%EC%84%A0%ED%83%9D.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/7aa6ad19-92f6-4a70-bdaf-c68b5de83bf9/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/51fc62f2-e340-47b4-abe0-aaeb4cea23b3/Untitled.gif)

### 좌석 선택

![좌석선택.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/2c6ba99a-8c86-49eb-9c05-135e6645ae36/%EC%A2%8C%EC%84%9D%EC%84%A0%ED%83%9D.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/202513bc-690a-43a2-af49-928c04e48233/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/15857614-0227-4560-9802-a527659c54fe/Untitled.gif)

### 결제 정보 및 결제 결과

- 결제 성공 시
    
    ![결제결과성공.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/6853829d-2f99-4085-8dff-537630e6ed8d/%EA%B2%B0%EC%A0%9C%EA%B2%B0%EA%B3%BC%EC%84%B1%EA%B3%B5.gif)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c31ae651-f9c7-48fa-bf98-b9d3c3803bed/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/19d772c6-7401-4d66-a831-d0305b207ec3/Untitled.gif)

- 응모 성공 시
    
    ![응모성공시.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/6b63d3d0-f17c-45c0-b72c-c190b908f994/%EC%9D%91%EB%AA%A8%EC%84%B1%EA%B3%B5%EC%8B%9C.gif)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/20fb600b-0ed5-48c3-8264-d64f04bee935/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/21180f4a-7318-4e5f-bc54-288effb45520/Untitled.gif)

- 결제 실패 시
    
    ![결제실패.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/15472cd4-d2a0-4105-b610-2045c8ea31b4/%EA%B2%B0%EC%A0%9C%EC%8B%A4%ED%8C%A8.gif)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/99abf123-b536-4b4c-9b3a-e07f03ac4210/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/2ee5cdd7-707f-45bf-9921-417cde89e4d4/Untitled.gif)

### 입장권

![입장권.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/aa902428-791e-4bd8-8968-5649fe362832/%EC%9E%85%EC%9E%A5%EA%B6%8C.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/4db1b1f0-55ae-4650-9549-adbf03c25298/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/4d2a7949-3b3d-475a-9649-f5f2f5801b1a/Untitled.gif)

### 구매 내역

![구매내역.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/5de818ee-f222-42da-9599-a1f841aa33cf/%EA%B5%AC%EB%A7%A4%EB%82%B4%EC%97%AD.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/8520d860-57fa-4e30-a43b-0cbec71851ad/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/abe2b922-fb18-4f99-89df-f3be11b120a1/Untitled.gif)

### 환불

- 성공 시
    
    ![환불성공.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/f8c17564-90d6-439e-8e3e-ea9cb1c40f90/%ED%99%98%EB%B6%88%EC%84%B1%EA%B3%B5.gif)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/6949a004-8ed7-43ab-a194-61b07693fa87/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/35badc70-947c-4b1f-9881-9941eb45eb33/Untitled.gif)

- 실패 시
    
    ![환불실패.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/0cac6adb-8979-43ee-8730-809847e66505/%ED%99%98%EB%B6%88%EC%8B%A4%ED%8C%A8.gif)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/d598c3ad-a0eb-4bda-8d08-5f34df57df80/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/2ff9d81d-7ac9-4a81-89c9-0f9a57c42978/Untitled.gif)

### 그 외 작업중인 추첨결과 및 티켓북 탭 화면

![작업중탭.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/2ba85697-62aa-4569-9ce1-e6c9fbcad03c/%EC%9E%91%EC%97%85%EC%A4%91%ED%83%AD.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/54606da5-ae54-4507-93e2-e2771eaed283/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/4de3576d-e5ba-414d-b1db-6028f4898061/Untitled.gif)

# 인프라

## 중앙 로그 관리소

```java
[작업 내용]
Elastic Search, Fluent D, Kibana를 활용해 기동중인 모든 도커 컨테이너의 로그를 수집하여 한 곳에서 관리합니다. 
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/7f1f7dad-5014-4a00-aad1-fb5d31dd79a9/Untitled.png)

## 젠킨스와 도커 컨테이너 기반 CI/CD 환경 구축

```java
[작업 내용] 
도커 컨테이너와 EC2, Jenkins를 활용해 모노레포에서의 MSA CI/CD 환경을 구축하였습니다. 
```

## locust를 활용해 대기큐 성능 측정 중

```java
[작업 내용]
web flux와 단일 Redis를 활용해 완전 비동기 방식으로 
대기큐 진입 및 대기큐 조회, 대기큐 제거 API를 개발하였습니다. 
locust를 이용해 사용자 수 10만명 ramp up time 10초로 초당 1만명이 몰려드는 상황으로
peek test를 진행하고 성능 개선 방안을 고민중입니다. 

동일 호스트 내부에서 테스트를 진행해서 정확하지 않은 상태라, 추후 배포 후 다시 실험해볼 생각입니다.
 
```

![/](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/6fcf0da4-c1b9-4d5a-8010-d256c1b10079/Untitled.png)

/

```java
현재 결과에서는 약 82만의 리퀘스트에 대해 3만 정도의 에러가 발생했습니다. 
하지만 33,495건의 에러는 전부 유저가 동일 큐에 대해 진입 요청을 하는 409 (Conflict)에러 상황이므로 
connection out에 따른 서버 에러는 없는 상태입니다. 

```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e7472e42-7118-406f-8758-f9c76b1cf86a/c6a149ea-dec8-4753-bb7b-0923c5b33828/Untitled.png)

```java
대부분 
0.2초에서 4초 사이의 응답을 받지만, 
일부 유저들의 경우 대기시간이 6초를 넘어가기 때문에 이를 해결해야할 것 같습니다
```
