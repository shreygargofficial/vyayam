import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function DayCard({ day, source = 1 }) {
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation()
    const imageSource = source == 1 ?
        require('../../assets/images/splits/dumbell.png') :
        require('../../assets/images/splits/kettleBell.png')
    const pressedStateChange = (day) => {
        navigation.navigate("perDaySplitScreen", {
            day: day
        })
    }

    return (
        <Pressable style={styles.card}
            onPress={pressedStateChange.bind(this, day)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <Pressable style={({ pressed }) => [(pressed || isPressed) && styles.pressed, styles.imageContainer]}
                onPress={pressedStateChange.bind(this, day)}
            >
                <Image source={imageSource} style={styles.image} />
            </Pressable>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {day}
                </Text>
            </View>
        </Pressable>
    );
}

export default DayCard;

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    pressed: {
        backgroundColor: colors.primaryDark,
        transform: [{ rotate: '90deg' }]
    },
    imageContainer: {
        width: 90,
        borderColor: colors.primaryDark,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        borderRadius: 45,
        overflow: 'hidden'
    },
    image: {
        width: 45,
        height: 45,
    },
    textContainer: {
        marginTop: 20,
    },
    text: {
        color: colors.primary
    },

})