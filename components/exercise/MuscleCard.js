import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

function MuscleCard({ muscle }) {
    const myItem = {
        'chest': require(`../../assets/images/exercise/chest.png`),
        'legs': require(`../../assets/images/exercise/legs.png`),
        'biceps': require(`../../assets/images/exercise/biceps.png`),
        'triceps': require(`../../assets/images/exercise/triceps.png`),
        'shoulder': require(`../../assets/images/exercise/shoulder.png`),
        'core': require(`../../assets/images/exercise/core.png`),
        'back': require(`../../assets/images/exercise/back.png`),
        'forearm': require(`../../assets/images/exercise/forearm.png`),
    }
    const navigation = useNavigation()
    const navigateToSelectedMuscleExercises = (muscle) => {
        navigation.navigate('selectedMuscle', {
            muscle: muscle
        })
    }
    return (

        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={navigateToSelectedMuscleExercises.bind(this, muscle)}
        >
            <View style={styles.imageContainer}>
                <Image source={myItem[muscle]}
                    style={styles.image}
                />
            </View>
            <Text style={styles.text}>
                {muscle}
            </Text>
        </Pressable>
    );
}

export default MuscleCard;


const styles = StyleSheet.create({
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 0.3,
        padding: 10,

    },
    image: {
        flex: 1,
        width: '100%'
    },
    text: {
        textTransform: 'capitalize',
        fontFamily: 'caviar',
        color: colors.primary
    },
    card: {
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 40,
    },
    pressed: {
        backgroundColor: 'rgba(0,0,0,0.9)'
    }
})