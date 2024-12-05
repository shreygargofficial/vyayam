import { Text, View, StyleSheet, ScrollView, Image, ImageBackground, useWindowDimensions, Pressable } from "react-native";
import { colors } from "../../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allExercisesFetchActionCreator } from "../../../redux/ActionCreators/exerciseActionsCreator";
import LandingCardsTiles from "../../LandingPage/LandingCardsTiles";
import LandingExerciseDrawer from "../../LandingPage/LandingExerciseDrawers";
import ButtonWithBorder from "../../ui/ButtonWithBorder";
import Testimonials from "../../LandingPage/Testimonials";
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from "@react-navigation/native";
import ButtonSimple from "../../ui/ButtonSimple";
import WeightManagementCard from "../../LandingPage/WeighManagementCard";


function Landing({ navigation }) {
    const { height, width } = useWindowDimensions()
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const exercise = useSelector(state => state.exercise)
    const [muscleOBJ, setMuscleOJ] = useState(null);
    const isFocused = useIsFocused();
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
    const allMealsButtonhandler = () => {
        navigation.navigate('recipes')
    }
    return (
        <>
            {isFocused && <StatusBar style="light" />}
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                style={
                    {
                        backgroundColor: colors.black,
                    }}
            >
                <ImageBackground
                    source={user?.userData?.gender == "male" ?
                        require('../../../assets/images/banner/male.jpg') :
                        require('../../../assets/images/banner/female.jpg')}
                    style={[styles.banner, { width, height }]}
                >
                    <View >
                        <Text style={[styles.slogan, styles.fontSlogan]}>"Lets start your journey with us!"</Text>
                    </View>
                </ImageBackground>

                <View style={styles.landingContent}>
                    <Text style={styles.slogan}>Record Your</Text>
                    <LandingCardsTiles />
                    <WeightManagementCard />
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

                    <Pressable
                        style={styles.overlayCard}
                        onPress={allExerciseButtonhandler}
                    >
                        <Image
                            style={styles.imageOverlay}
                            source={require('../../../assets/images/exercise/allExercise.jpg')}
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                                All Exercise
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable
                        style={styles.overlayCard}
                        onPress={allMealsButtonhandler}
                    >
                        <Image
                            style={styles.imageOverlay}
                            source={require('../../../assets/images/recipes/recipe.jpg')}
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                                All Recipes
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    );
}

export default Landing;


const styles = StyleSheet.create({
    banner: {
        justifyContent: 'center',
        marginTop: -90,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    landingContent: {
        paddingBottom: 100,
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
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: '400',
        marginBottom: 20,
        color: colors.primary
    },
    allExerciseButton: {
        marginTop: 40,
        alignItems: 'center',
        alignSelf: 'center'
    },
    overlayCard: {
        marginTop: 40,
        height: 200,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    overlayText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'king',
        textAlign: 'center'
    },
    imageOverlay: {
        width: '100%',
        height: '100%'
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9,
        textAlign: 'center',
        justifyContent: 'center'
    },
})