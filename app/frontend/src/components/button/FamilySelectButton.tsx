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
          onPress={() => {
            Alert.alert('예매 부탁하는 API 전송 후 다시 콘서트로');
          }}>
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
