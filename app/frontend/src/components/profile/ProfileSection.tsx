import { Image, StyleSheet, Text, View } from "react-native";
import { heightPercent, widthPercent } from "../../config/Dimensions";
import { F_SIZE_TITLE } from "../../config/Font";
import { YellowButton } from "../button/Button";

export default function ProfileSection({name}: any){
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/images/profile.png')}
            style={styles.picture}/>
            <Text style={F_SIZE_TITLE}>{name}</Text>
            <YellowButton width={'40%'} btnText="내 지갑 연동하기" textSize={16} isRadius/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 44,
    },
    picture: {
        width: widthPercent(100),
        height: heightPercent(100),
        borderRadius: 50,
    }
    
})