import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import DayCard from "../../components/splits/DayCard";

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
function CustomSplit() {
    return (
        <FlatList
            alwaysBounceVertical={false}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 80 }}
            data={days}
            renderItem={({ item, index }) => <DayCard source={index % 2 + 1} day={item} />}
            numColumns={3}
            keyExtractor={(item) => item}
        />
    )
}

export default CustomSplit;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center'
    },
    dayTile: {
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 20,
        marginTop: 20,
        elevation: 5,
        shadowColor: colors.grey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 5,
        shadowRadius: 5,
        backgroundColor: colors.white
    },
    dayText: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.primary
    }
})