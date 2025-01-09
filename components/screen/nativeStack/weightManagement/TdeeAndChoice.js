
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import TDEE from "../../../weightGainLoss/TDEE";
import { useState } from "react";
import MyMaintenceInfoAndChoiceSelection from "../../../weightGainLoss/MyMaintenceInfoAndChoiceSelection";


export default function TdeeAndChoice() {
    const [tdee, setTdee] = useState(null);
    const [bmr, setBMR] = useState(null);
    const [showModal, setShowModal] = useState(false)

    return (
        <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 100,
                paddingHorizontal: 20,
                paddingTop: 20,
            }}>
            <Text style={styles.tdeeHeading}>
                Calculate Calories you need to Maintain your current weight(TDEE)
            </Text>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <Pressable style={styles.modal} onPress={() => setShowModal(false)}>
                    <MyMaintenceInfoAndChoiceSelection bmr={bmr} tdee={tdee} setShowModal={setShowModal} />
                </Pressable>
            </Modal>
            <TDEE setTdee={setTdee} setBMR={setBMR} setShowModal={setShowModal} />

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
        fontFamily: 'caviar'
    },
    modal: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 600,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center'
    }
})