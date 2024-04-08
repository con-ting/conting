import {Dimensions, Image, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {heightPercent, widthPercent} from '../../config/Dimensions';

/**
 * 광고 배너입니다.
 * @param props
 * - [필수]
 * @returns
 * @author 강성권
 */

interface BannerProps {
  imageUrl: string;
}

interface BannerListProps {
  banners: BannerProps[];
}

export default function BannerList({banners}: BannerListProps) {
  const windowWidth = Dimensions.get('window').width;
  const renderItem = ({item, index}: {item: BannerProps; index: number}) => {
    return (
      <View
        style={{
          borderRadius: widthPercent(16),
          marginBottom: heightPercent(20),
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="stretch"
          source={{uri: item.imageUrl}}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 2, alignItems: 'center'}}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        width={widthPercent(380)}
        height={heightPercent(200)}
        autoPlay={true}
        autoPlayInterval={2000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
    </View>
  );
}
