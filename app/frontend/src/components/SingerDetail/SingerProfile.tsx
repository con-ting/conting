import {Image, View} from 'react-native';

export type profileProps = {
  profile: string;
};

const SingerProfile = (props: profileProps) => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        overflow: 'hidden', // 넘치는 부분을 숨김
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      }}>
      <Image
        style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        source={{uri: props.profile}}
      />
    </View>
  );
};

export default SingerProfile;
