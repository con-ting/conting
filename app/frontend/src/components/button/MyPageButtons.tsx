import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { F_SIZE_BUTTON } from "../../config/Font";
import { ArrowRight2, ShoppingCart, Ticket2, Translate } from "iconsax-react-native";
import { heightPercent, widthPercent } from "../../config/Dimensions";
import { MAINWHITE } from "../../config/Color";
import { useNavigation } from "@react-navigation/native";

export default function MyPageButtons({onPress}: any){
    
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('ConcertRegist')} style={styles.button}>
            <View style={styles.name}>
            <Ticket2 style={styles.icon}/>
            <Text style={F_SIZE_BUTTON}>공연 등록하기</Text>
            </View>
            <ArrowRight2 style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.line}/>
        <TouchableOpacity onPress={() => navigation.navigate('TicketCheck')} style={styles.button}>
            <View style={styles.name}>
            <ShoppingCart style={styles.icon}/>
            <Text style={F_SIZE_BUTTON}>검표하기</Text>
            </View>
            <ArrowRight2 style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.line}/>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.name}>
            <Translate style={styles.icon}/>
            <Text style={F_SIZE_BUTTON}>나의 가족 인증서 가져오기</Text>
            </View>
            <ArrowRight2 style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.line}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        height: heightPercent(32),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 24,
    },
    name:{
        flexDirection: 'row',
        gap: 16,
    },

    icon: {
        width: widthPercent(32),
        height: heightPercent(32),
        color: MAINWHITE,
    },

    line: {
        borderBottomColor: '#595959',
    borderBottomWidth: 1,
    }
})