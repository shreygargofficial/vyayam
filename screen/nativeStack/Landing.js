import { Text, View, StyleSheet, ScrollView, Image, ImageBackground, useWindowDimensions, StatusBar } from "react-native";
import { colors } from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allExercisesFetchActionCreator } from "../../ActionCreators/exerciseActionsCreator";
import LandingCardsTiles from "../../components/LandingPage/LandingCardsTiles";
import LandingExerciseDrawer from "../../components/LandingPage/LandingExerciseDrawers";
import ButtonWithBorder from "../../components/ui/ButtonWithBorder";
import Testimonials from "../../components/LandingPage/Testimonials";




function Landing({ navigation }) {
    const { height, width } = useWindowDimensions()
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const exercise = useSelector(state => state.exercise)
    const [muscleOBJ, setMuscleOJ] = useState(null)
    useEffect(() => {
        dispatch(allExercisesFetchActionCreator())

    }, [])

    useEffect(() => {
        if (exercise.exerciseData) {
            let legs = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('leg')).slice(0, 4)
            let back = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('back')).slice(0, 5)
            let chest = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('chest')).slice(0, 5)
            let shoulders = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('shoulders')).slice(0, 3)
            let triceps = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('triceps')).slice(0, 5)
            let biceps = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('biceps')).slice(0, 5)
            let core = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('core')).slice(0, 5)
            let calves = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('calves')).slice(0, 1)
            let rd = exercise.exerciseData.filter(ele => ele.primaryMuscleTargeted.toLowerCase().includes('rear deltoids')).slice(0, 2)
            let obj = {
                legs: [...legs, ...calves], back, chest, shoulders: [...shoulders, ...rd], triceps, biceps, core
            }
            setMuscleOJ(obj)
        }
    }, [exercise?.exerciseData])


    const allExerciseButtonhandler = () => {
        navigation.navigate('allExercise')
    }
    return (
        <>
            <StatusBar backgroundColor={colors.black} />
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.black }}
            >
                <ImageBackground
                    source={user?.userData?.gender == "male" ?
                        require('../../assets/images/banner/male.jpg') :
                        require('../../assets/images/banner/female.jpg')}
                    style={[styles.banner, { width, height }]}
                >
                    <View >
                        <Text style={[styles.slogan, styles.fontSlogan]}>"Lets start your journey with us!"</Text>
                    </View>
                </ImageBackground>


                <LinearGradient
                    colors={['rgba(255,255,255,0.02)', 'rgba(255, 255, 255, 0.1)']}
                    style={{ width: width, paddingBottom: 200 }}
                >
                    <View>
                        <Text style={styles.slogan}>Record Your</Text>
                        <LandingCardsTiles />
                        <Testimonials />
                        <Text style={styles.slogan}>Learn Exercise</Text>
                        {muscleOBJ && Object.keys(muscleOBJ).length && Object.keys(muscleOBJ).map(muscleName => {
                            return (
                                <View style={styles.horizontalScrollContainer} key={muscleName}>
                                    <Text style={styles.horizontalScrollContainerTitle}>{muscleName.toUpperCase()}</Text>
                                    <LandingExerciseDrawer exerciseArray={muscleOBJ[muscleName]} />
                                </View>
                            )
                        })}
                        <ButtonWithBorder title={'More Exercise'} style={styles.allExerciseButton} color={colors.primary} onPress={allExerciseButtonhandler} />
                    </View>
                </LinearGradient>

            </ScrollView>
        </>
    );
}

export default Landing;


const styles = StyleSheet.create({
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    slogan: {
        marginTop: 60,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '200',
        color: colors.white
    },
    fontSlogan: {
        fontFamily: 'king',
    },
    horizontalScrollContainer: {
        marginTop: 40
    },
    horizontalScrollContainerTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '400',
        marginBottom: 20,
        color: colors.primary
    },
    allExerciseButton: {
        marginTop: 40,
        alignItems: 'center',
        alignSelf: 'center'
    },
})