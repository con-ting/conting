import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export function IsBiometric() {
  rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported');
    } else {
      console.log('Biometrics not supported');
    }
  });
}

//키생성
export const createKey = () => {
  return rnBiometrics
    .createKeys()
    .then(resultObject => {
      const {publicKey} = resultObject;
      console.log(publicKey);
      return {result: true, key: publicKey};
    })
    .catch(error => {
      console.log('createKey error ', error);
      return {result: false, key: null};
    });
};

//키존재여부
export const checkKey = () => {
  return rnBiometrics
    .biometricKeysExist()
    .then(resultObject => {
      const {keysExist} = resultObject;
      if (keysExist) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log('checkKey error ', error);
      return false;
    });
};

export const deleteKey = () => {
  return rnBiometrics
    .deleteKeys()
    .then(resultObject => {
      const {keysDeleted} = resultObject;

      if (keysDeleted) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log('deleteKey error ', error);
      return false;
    });
};

//값 확인
export const biometricsAuth = (
  userID: string = '',
  msg: string = '입장을 위한 인증',
) => {
  return rnBiometrics
    .createSignature({
      promptMessage: msg,
      payload: userID,
    })
    .then(resultObject => {
      const {success, signature} = resultObject;
      if (success) {
        return {result: true, key: signature};
      } else {
        return {result: false, key: null};
      }
    })
    .catch(error => {
      console.log('biometricsLogin error ', error);
      return {result: false, key: null, msg: error};
    });
};
