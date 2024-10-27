import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { styles as weightLogStyles } from "./WeightLog";
import IconButton from "../../components/ui/IconButton";
import { colors } from "../../constants/Colors";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import UserMeasurementModalContent from "../../components/userMeasurement/UserMeasurementModalContent";
import { sortArrayBasedOnDate } from "../../utils/helperFunction/DateFunction";
import GraphUserMeasurements from "../../components/ui/GraphUserMeasurements";


function BodyMeasurement() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.user);
    const { height } = useWindowDimensions();

    useEffect(() => {
        if (user.userData.bodyMeasurements.length == 0) {
            setShowModal(true)
        }
    }, [user.userData.bodyMeasurements])

    const modalToggler = () => {
        setShowModal(prev => !prev)
    }
    let sortedBodyMeasurement = useMemo(() => {
        return sortArrayBasedOnDate(user.userData.bodyMeasurements)
    }, [user.userData]);


    const {
        dateData,
        armLeftData,
        armRightData,
        chestData,
        hipsData,
        leftCalfData,
        leftThighData,
        rightCalfData,
        rightThighData,
        waistData,
    } = useMemo(() => {
        let dateData = [];
        let armLeftData = [];
        let armRightData = [];
        let chestData = [];
        let hipsData = [];
        let leftCalfData = [];
        let leftThighData = [];
        let rightCalfData = [];
        let rightThighData = [];
        let waistData = [];
        for (let measurementData of sortedBodyMeasurement) {
            dateData.push(measurementData.date);
            armLeftData.push(measurementData.measurements.armLeft)
            armRightData.push(measurementData.measurements.armRight)
            chestData.push(measurementData.measurements.chest)
            hipsData.push(measurementData.measurements.hips)
            leftCalfData.push(measurementData.measurements.leftCalf)
            leftThighData.push(measurementData.measurements.leftThigh)
            rightCalfData.push(measurementData.measurements.rightCalf)
            rightThighData.push(measurementData.measurements.rightThigh)
            waistData.push(measurementData.measurements.waist)

        }
        return {
            dateData,
            armLeftData,
            armRightData,
            chestData,
            hipsData,
            leftCalfData,
            leftThighData,
            rightCalfData,
            rightThighData,
            waistData,
        }
    }, [sortedBodyMeasurement]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: height }}>
                {
                    (sortedBodyMeasurement && sortedBodyMeasurement?.length) ?
                        <View style={styles.allGraphs}>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Left calf Measurement</Text>
                                <GraphUserMeasurements color={colors.red} dateData={dateData} measurementData={leftCalfData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Right calf Measurement</Text>
                                <GraphUserMeasurements color={colors.primary} dateData={dateData} measurementData={rightCalfData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Right Thigh Measurement</Text>
                                <GraphUserMeasurements color={colors.purple100} dateData={dateData} measurementData={rightThighData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Left Thigh Measurement</Text>
                                <GraphUserMeasurements color={colors.brown} dateData={dateData} measurementData={leftThighData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Left Arm Measurement</Text>
                                <GraphUserMeasurements color={colors.orange} dateData={dateData} measurementData={armLeftData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Right Arm Measurement</Text>
                                <GraphUserMeasurements color={colors.purple800} dateData={dateData} measurementData={armRightData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Chest Measurement</Text>
                                <GraphUserMeasurements color={colors.red200} dateData={dateData} measurementData={chestData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Waist Measurement</Text>
                                <GraphUserMeasurements color={colors.black} dateData={dateData} measurementData={waistData} />
                            </View>
                            <View style={styles.graphContainer}>
                                <Text style={styles.headingMuscle}>Hips Measurement</Text>
                                <GraphUserMeasurements color={colors.green} dateData={dateData} measurementData={hipsData} />
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', marginTop: -130 }}>
                            <Text style={styles.headingMuscle}>
                                Please Log your First Measurement!
                            </Text>
                        </View>
                }

                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.overlay} >
                        <View style={styles.modalContent}>
                            <Pressable style={styles.crossContainer} onPress={modalToggler}>
                                <Text style={styles.cross}>x</Text>
                            </Pressable>
                            <UserMeasurementModalContent
                                modalToggler={modalToggler}
                                userName={user.userData.userName}
                                sortedBodyMeasurement={
                                    (sortedBodyMeasurement && sortedBodyMeasurement.length)
                                        ? (sortedBodyMeasurement[sortedBodyMeasurement.length - 1])
                                        : null
                                }
                            />
                        </View>

                    </View>


                </Modal>
            </ScrollView>

            <IconButton
                name={'add'}
                size={25}
                color={colors.white}
                style={[weightLogStyles.iconButton, styles.iconButton]}
                onPress={modalToggler}
            />
        </View>
    );
}

export default BodyMeasurement;

const styles = StyleSheet.create({
    iconButton: {
        bottom: 100,
        right: 16
    },
    allGraphs: {
        marginTop: 2,
    },
    graphContainer: {
        marginVertical: 10,
    },
    headingMuscle: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '300',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#bbb',
        maxHeight: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'

    },
    crossContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 2,
        elevation: 2,
        right: 10,
        padding: 10
    },
    cross: {
        fontSize: 30,
        fontWeight: '400',
        color: colors.primaryDark
    },

})