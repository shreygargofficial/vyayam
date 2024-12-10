import { useRoute } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DietCard from "../../../weightGainLoss/DietCard";
import { allDietsFetchActionCreator } from "../../../../redux/ActionCreators/dietActionCreator";
import { colors } from "../../../../constants/Colors";

function AllMealsForWeightManagement() {
    const { params } = useRoute();
    const type = params?.type;
    const tdee = params?.tdee
    const resultCalories = type === "loss" ? tdee - 500 : tdee + 500;
    const diet = useSelector(state => state.diet)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allDietsFetchActionCreator())
    }, []);

    return (
        <View style={styles.root}>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {tdee && type && <View style={styles.mainWrapper}>
                    <Text style={styles.description}>
                        You need to eat around {resultCalories} kcal for weight {type}. There are diets mentioned below that can fulfill your desired daily calories intake. Click on each to get details
                    </Text>
                </View>}
                {diet?.dietData && diet.dietData?.length &&
                    diet?.dietData.map((ele, index) => {
                        return (
                            <DietCard key={ele._id} item={ele} index={index + 1} />
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

export default AllMealsForWeightManagement;

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.white,
        flex: 1
    },
    mainWrapper: {
        paddingHorizontal: 30,
        marginVertical: 30
    },
    nutritionContent: {
        marginVertical: 10,

    },
    nutrientValue: {
        marginTop: 5,
    },
    description: {
        letterSpacing: 0.2,
        fontSize: 18,
    },
})