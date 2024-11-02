import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import { colors } from "../../constants/Colors";
import { SERVERURL } from "../../constants/Environment";

function ExerciseById() {
    const route = useRoute();
    const navigation = useNavigation()
    const [myExercise, setMyExercise] = useState(null)
    const exercise = useSelector(state => state.exercise)
    const { _id, from } = route.params;

    useEffect(() => {
        navigation.setOptions({ headerBackTitle: from })
        let myExercise = exercise?.exerciseData.find(ele => ele._id == _id);
        setMyExercise(myExercise);
    }, [_id])


    const videoURI = 'https://www.youtube.com/embed/0cXAp6WhSj4';
    return (

        <ScrollView
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        >
            {myExercise?.photoURL ?
                <Image source={{ uri: SERVERURL + '/' + myExercise?.photoURL }} style={styles.image} /> :
                <Image source={require('../../assets/images/exercise/exercise.jpg')} style={styles.image} />
            }
            <Text style={styles.title}>{myExercise?.exerciseName}</Text>
            <Text style={styles.normalText}>
                <Text style={styles.bold}>Type of Exercise:</Text>
                {myExercise?.exerciseType}
            </Text>
            <View style={styles.allMusclesContainer}>
                <Text style={[styles.normalText, styles.bold]}>All Muscles used: </Text>
                {myExercise?.allMusclesUsed?.map((ele, key) => (
                    <Text key={key} style={styles.normalText}>{ele}, </Text>
                ))}
            </View>
            <Text style={styles.normalText}><Text style={styles.bold}>Primary Muscle used:</Text> {myExercise?.primaryMuscleTargeted}</Text>

            <View style={styles.videoContainer}>
                {myExercise?.videoURL ?
                    <WebView
                        mediaPlaybackRequiresUserAction={true}
                        source={{ uri: myExercise?.videoURL + '?autoplay=0' }}
                        style={styles.video}
                    /> :
                    <WebView
                        mediaPlaybackRequiresUserAction={true}
                        source={{ uri: videoURI + '?autoplay=0' }}
                        style={styles.video}
                    />}
            </View>
        </ScrollView>
    );
}

export default ExerciseById;

const styles = StyleSheet.create({
    title: {
        fontSize: 44,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 30,
    },
    normalText: {
        textAlign: 'center',
        marginTop: 19,
        fontSize: 16,
    },
    bold: {
        fontWeight: '700'
    },
    allMusclesContainer: {
        borderColor: colors.grey,
        borderWidth: 1,
        paddingVertical: 50,
        paddingHorizontal: 50,
        alignSelf: 'center',
        margin: 30
    },
    image: {
        alignSelf: 'center',
        marginTop: 30,
        width: 200,
        height: 200,
    },
    rowFlex: {
        flexDirection: 'row'
    },
    videoContainer: {
        width: 300,
        height: 300,
        borderWidth: 4,
        borderColor: colors.primaryDark,
        alignSelf: 'center',
        marginTop: 50,
    },
    video: {
        width: '100%',
        height: '100%'
    },

})