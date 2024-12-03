
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import TDEE from "../../weightGainLoss/TDEE";
import { useState } from "react";
import Info from "../../weightGainLoss/Info";

export default function WeightGainOrLoss() {
    const [tdee, setTdee] = useState(null);
    const [bmr, setBMR] = useState(null)
    return (
        <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 100,
                paddingHorizontal: 20,
                paddingTop: 30,
            }}>
            <Text style={styles.tdeeHeading}>
                Calculate Calories you need to Maintain your current weight(TDEE)
            </Text>
            {bmr && tdee && <Info bmr={bmr} tdee={tdee} />}

            <TDEE setTdee={setTdee} setBMR={setBMR} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    tdeeHeading: {
        lineHeight: 30,
        letterSpacing: 1,
        fontWeight: '200',
        fontSize: 22,
    },

})