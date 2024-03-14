import {View, Text, Image} from 'react-native';
import { fontPercent, heightPercent, widthPercent } from '../../config/Dimensions';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export type cardProps = {
  name: string;
  img_url?: string;
  start_at?: string;
  end_at?: string;
};

{/* <EventCard name="김형민 굿즈" img_url='https://image.newsis.com/2023/09/25/NISI20230925_0001372950_web.jpg'/>
<SingerProfile profile='https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230428214640258.jpg'/> */}

const EventCard = (props: cardProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        marginBottom: 20,
        height: heightPercent(180),
      }}>
      <Image
        style={{
          flex :1,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10
        }}
        source={{
          uri: props.img_url,
        }}
      />
      <View
        style={{
          flex: 2,
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
          }}>
            {props.name}
        </Text>
        <Text
          style={{
            fontSize: fontPercent(20),
            color: '#FFFFFF',
          }}>
          응모 시작 : {props.start_at}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
          }}>
          응모 마감 : {props.end_at}
        </Text>
      </View>
    </View>
  );
};

export default EventCard;