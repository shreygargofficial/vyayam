import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DietCard from "../../../weightGainLoss/DietCard";
import { allDietsFetchActionCreator } from "../../../../redux/ActionCreators/dietActionCreator";
import { colors } from "../../../../constants/Colors";

function AllMealsForWeightManagement() {
    const { params } = useRoute();
    const type = params?.type;
    const tdee = params?.tdee
    const resultCalories = type === "loss" ? tdee - 500 : tdee + 500;
    const diet = useSelector(state => state.diet);
    const [dietData, setDietData] = useState([])
    const [vegEnabled, setVegEnabled] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allDietsFetchActionCreator())
    }, []);

    useEffect(() => {
        if (diet.dietData?.length > 0) {
            let unsortedDietData = []
            if (vegEnabled) {
                unsortedDietData = diet.dietData.filter(ele => ele.veg == true)
            }
            else {
                unsortedDietData = [...diet.dietData]
            }
            let sortedDiet = unsortedDietData.sort((a, b) => a.mealTotal - b.mealTotal);
            setDietData(sortedDiet);
        }
    }, [diet.dietData, vegEnabled]);


    const toggleVegSwitch = () => {
        setVegEnabled(prev => !prev)
    }
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
                <View style={styles.switchContainer}>

                    <Switch
                        trackColor={{ false: colors.grey, true: colors.green }}
                        ios_backgroundColor="#3e3e3e"
                        style={styles.switch}
                        thumbColor={colors.white}
                        onValueChange={toggleVegSwitch}
                        value={vegEnabled}
                    />
                    <Text style={styles.switchText}>Veg</Text>
                </View>

                {dietData && dietData?.length > 0 &&
                    dietData.map((ele, index) => {
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
    rootCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainWrapper: {
        paddingHorizontal: 30,
        marginVertical: 30
    },
    switchContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',

    },
    switchText: {
        paddingHorizontal: 10,
        fontWeight: '500',
        letterSpacing: 1,
        fontFamily: 'caviar'
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
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