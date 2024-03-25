import { useState } from "react"
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarSelect({onDateSelected}){
    const [selectedDates, setSelectedDates] = useState();

    const onDayPress = (day) => {
        //날짜 선택 로직
        const newSelectedDates = {...selectedDates, [day.dateString]: {selected: true, marked: true}};
        setSelectedDates(newSelectedDates);
        onDateSelected(newSelectedDates);
    } 
    return(
        <View>
            <Calendar 
            onDayPress={onDayPress}
            markedDates={selectedDates}/>
        </View>
    )
}

