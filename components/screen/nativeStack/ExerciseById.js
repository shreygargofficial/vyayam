import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import { colors } from "../../../constants/Colors";
import { SERVERURL } from "../../../constants/Environment";
import CustomLoader from "../../ui/CustomLoader";

function ExerciseById() {
    const route = useRoute();
    const navigation = useNavigation()
    const [myExercise, setMyExercise] = useState(null)
    const [imageLoading, setImageLoading] = useState(true);
    const exercise = useSelector(state => state.exercise)
    const { _id, from } = route.params;

    useEffect(() => {
        navigation.setOptions({ headerBackTitle: from })
        let myExercise = exercise?.exerciseData.find(ele => ele._id == _id);
        setMyExercise(myExercise);
    }, [_id])


    const videoURI = 'https://www.youtube.com/embed/0cXAp6WhSj4';
    return (
        <View style={styles.root}>
            {imageLoading && <CustomLoader />}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100, backgroundColor: colors.darkBackground }}
            >
                {myExercise?.photoURL ?
                    <Image
                        onLoadEnd={() => setImageLoading(false)}
                        source={{ uri: SERVERURL + '/' + myExercise?.photoURL }}
                        style={styles.image} /> :
                    <Image
                        onLoadEnd={() => setImageLoading(false)}
                        source={require('../../../assets/images/exercise/exercise.jpg')}
                        style={styles.image} />
                }
                <Text style={styles.title}>{myExercise?.exerciseName}</Text>
                <Text style={styles.normalText}>
                    <Text style={styles.bold}>Type of Exercise:</Text>
                </Text>
                <Text style={styles.normalText}>{myExercise?.exerciseType}</Text>
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
        </View>
    );
}

export default ExerciseById;

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.darkBackground
    },
    title: {
        fontSize: 44,
        textAlign: 'center',
        fontWeight: '200',
        textTransform: 'capitalize',
        color: colors.white,
        fontFamily: 'caviar',
        marginTop: 30,
    },
    normalText: {
        textAlign: 'center',
        marginTop: 19,
        fontSize: 16,
        color: colors.white,
        fontFamily: 'caviar'
    },
    bold: {
        fontWeight: '700',
        color: colors.white,
        fontFamily: 'caviar'
    },
    allMusclesContainer: {
        paddingHorizontal: 50,
        alignSelf: 'center',
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: 200,
    },
    rowFlex: {
        flexDirection: 'row'
    },
    videoContainer: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 50,
    },
    video: {
        width: '100%',
        height: '100%'
    },

})