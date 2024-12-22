import { Text, View, StyleSheet, ScrollView, Image, ImageBackground, useWindowDimensions, Pressable } from "react-native";
import { colors } from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allExercisesFetchActionCreator } from "../../../redux/ActionCreators/exerciseActionsCreator";
import LandingCardsTiles from "../../LandingPage/LandingCardsTiles";
import Testimonials from "../../LandingPage/Testimonials";
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from "@react-navigation/native";
import WeightManagementCard from "../../LandingPage/WeighManagementCard";
import { commonStyle } from "../../../constants/Style";
import OneRepMaxCalculatorCard from "../../LandingPage/OneRepMaxCalculatorCard";


function Landing({ navigation }) {
    const { height, width } = useWindowDimensions()
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(() => {
        dispatch(allExercisesFetchActionCreator())

    }, [])


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
                    <OneRepMaxCalculatorCard />
                    <Testimonials />
                    <Pressable
                        style={({ pressed }) => [commonStyle.overlayCard, pressed && commonStyle.pressed]}
                        onPress={allExerciseButtonhandler}
                    >
                        <Image
                            style={commonStyle.imageOverlay}
                            source={require('../../../assets/images/exercise/allExercise.jpg')}
                        />
                        <View style={commonStyle.overlay}>
                            <Text style={commonStyle.overlayText}>
                                Learn Exercise
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [commonStyle.overlayCard, pressed && commonStyle.pressed]}
                        onPress={allMealsButtonhandler}
                    >
                        <Image
                            style={commonStyle.imageOverlay}
                            source={require('../../../assets/images/recipes/recipe.jpg')}
                        />
                        <View style={commonStyle.overlay}>
                            <Text style={commonStyle.overlayText}>
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

})