import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';

const Ticket = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ticketWrapper}>
        <ImageBackground
          source={require('../../assets/images/iuconcert.png')} // 이미지 경로는 프로젝트에 맞게 조정하세요
          style={styles.imageBackground}
          resizeMode="cover">
          {/* 동그라미 모양을 추가하기 위한 View */}
          <View style={[styles.circle, styles.circleLeft]}></View>
          <View style={[styles.circle, styles.circleRight]}></View>
          <View style={styles.overlay}>
            <View style={styles.details}>
              <Text style={styles.detailText}>Date: 24.01.25 목 8:00PM</Text>
              <Text style={styles.detailText}>Location: KSPO DOME</Text>
              <Text style={styles.detailText}>Row: E</Text>
              <Text style={styles.detailText}>No: 41</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  ticketWrapper: {
    width: widthPercent(220),
    height: heightPercent(389),
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  overlay: {height: heightPercent(100)},
  details: {
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    // borderRadius: 10,
  },
  detailText: {
    fontFamily: 'Jalnan2TTF',
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'rgba(0,0,0,0.6)',
    // backgroundColor: 'transparent',
    // backgroundColor: '#fff',
    position: 'absolute',
    top: '50%',
    marginTop: 35, // 동그라미의 반지름만큼 위로 올려서 중앙에 위치시킵니다.
  },
  circleLeft: {
    left: -30, // 동그라미의 반지름만큼 왼쪽으로 이동
  },
  circleRight: {
    right: -30, // 동그라미의 반지름만큼 오른쪽으로 이동
  },
});

export default Ticket;
