import {useRecoilValue} from 'recoil';
import {goMainPageState} from './utils/recoil/Atoms';
import MainStack from './stacks/MainStack';
import AuthStack from './stacks/AuthStack';

export const RootApp = () => {
  const goMainPage = useRecoilValue(goMainPageState);

  if (!goMainPage) {
    return <AuthStack />;
  }
  return <MainStack />;
};
