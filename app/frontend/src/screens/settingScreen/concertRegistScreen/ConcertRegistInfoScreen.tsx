import { Image, StyleSheet, Text, View } from "react-native";
import { MAINBLACK, MAINWHITE } from "../../../config/Color";
import { F_SIZE_BIGTEXT, F_SIZE_TITLE } from "../../../config/Font";
import { Gallery } from "iconsax-react-native";
import { heightPercent, widthPercent } from "../../../config/Dimensions";
import { GrayButton } from "../../../components/button/Button";

export default function COncertRegistInfoScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.context}>
                <View style={styles.posterContainer}>
                    <View>
                        <View style={styles.title}>
                            <Gallery style={styles.icon}/>
                            <Text style={F_SIZE_TITLE}>포스터 등록</Text>
                        </View>
                        <View style={styles.findFileContainer}>
                        <GrayButton width={'100%'} btnText="파일찾기" textSize={16}/>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../../assets/images/iuconcert.png')} style={styles.img}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAINBLACK,
    },
    context: {
        margin: 20,
    },

    findFileContainer:{
        marginLeft: 10,
        marginTop: 14,
    },

    posterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    img: {
        width: widthPercent(195),
        height: heightPercent(162),
        borderRadius: 16,
    },
    
    title: {
        gap: 16,
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        width: widthPercent(32),
        height: heightPercent(32),
        color: MAINWHITE,
    },
})