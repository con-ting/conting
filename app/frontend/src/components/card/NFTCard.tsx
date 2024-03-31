import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NftFront from '../nft/NftFront.tsx';
import NftClick from '../nft/NftClick.tsx';
import {PopUpModal} from '../modal/Modal.tsx';
import {MAINWHITE} from '../../config/Color.ts';

type NFTCardProps = {
  poster: string;
  title: string;
  date: string;
  location: string;
  row: string;
  no: string;
  ticketAddress: string;
  webmUrl: string;
};
export default function NFTCard(props: NFTCardProps) {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    console.log('모달 온 NFT');
    setModal(!modal);
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={modalToggle}>
      <NftFront
        poster={props.poster}
        row={props.row}
        date={props.date}
        location={props.location}
        title={props.title}
        no={props.no}
      />
      {/* 인증번호 안올 때 모달 */}
      <PopUpModal
        isVisible={modal}
        backGroundColor={MAINWHITE}
        setIsVisible={setModal}>
        <NftClick url={props.webmUrl} />
      </PopUpModal>
    </TouchableOpacity>
  );
}
