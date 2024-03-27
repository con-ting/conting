# blockchain-service

### 설치

```sh
sudo corepack enable pnpm
pnpm install
```

- `corepack`은 node와 함께 기본적으로 제공되는 명령어입니다. 별도의 설치 과정 없이 `yarn`이나 `pnpm`과 같은 node package manager를 활성화하기 위해 사용할 수 있습니다.

### 환경변수

`.env` 파일.

```
SERVER_PORT=3000
RPC_ENDPOINT=https://api.devnet.solana.com
WALLET_SECRET=[1, 2, 3, ..., 64]
```

- `SERVER_PORT` 기본값은 `3000`입니다.
- `RPC_ENDPOINT` 기본값은 `https://api.devnet.solana.com`입니다.
- `WALLET_SECRET`은 필수로 설정해야 합니다.

### 실행

```sh
pnpm build && pnpm start
```
