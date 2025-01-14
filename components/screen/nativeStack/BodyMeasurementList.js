import { FlatList, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { styles as weightLogStyles } from "./WeightLog";
import IconButton from "../../ui/IconButton";
import { colors } from "../../../constants/Colors";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import GraphUserMeasurements from "../../ui/GraphUserMeasurements";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { commonStyle } from "../../../constants/Style";
import UserMeasurementModalContent from '../../userMeasurement/UserMeasurementModalContent'

function ListCardComponentBodyMeasurement({ label, data = [], onPress, selected }) {

    return (
        <Pressable
            onPress={() => onPress(label)}
            style={({ pressed }) => [styles.listCard, pressed && commonStyle.pressed]}
        >
            <Text style={styles.listLabel}>{label}</Text>
            {data.length > 0 ?
                <Text style={styles.listValue}>{data[data.length - 1].value} inch</Text>
                :
                <Text style={styles.listValue}>NA</Text>
            }
            {selected ? <MaterialIcons style={styles.listIcon} name="keyboard-arrow-down" size={24} color={colors.primary} /> : <MaterialIcons style={styles.listIcon} name="arrow-forward-ios" size={14} color={colors.primary} />}
        </Pressable>
    )
}

export default function BodyMeasurementList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [editMuscle, setEditMuscle] = useState('')
    const [field, setField] = useState('')
    const user = useSelector(state => state.user);


    const muscleSelectedToggle = (label) => {
        if (selectedMuscle !== label)
            setSelectedMuscle(label)
        else
            setSelectedMuscle(null)
    }
    const modalToggler = useCallback(() => {
        setShowModal((prev) => !prev);
    }, []);


    let arrayMuscleData = [
        {
            label: 'Arm Left',
            field: 'armLeft',
            data: user?.userData?.bodyMeasurement?.armLeft,
            color: colors.red
        },
        {
            label: 'Arm Right',
            field: 'armRight',
            data: user?.userData?.bodyMeasurement?.armRight,
            color: colors.primary
        },
        {
            label: 'Chest',
            field: 'chest',
            data: user?.userData?.bodyMeasurement?.chest,
            color: colors.green
        },
        {
            label: 'Hips',
            field: 'hips',
            data: user?.userData?.bodyMeasurement?.hips,
            color: colors.purple100
        },
        {
            label: 'Left Calf',
            field: 'leftCalf',
            data: user?.userData?.bodyMeasurement?.leftCalf,
            color: colors.red200
        },
        {
            label: 'Right Calf',
            field: 'rightCalf',
            data: user?.userData?.bodyMeasurement?.rightCalf,
            color: colors.orange
        },
        {
            label: 'Forearm',
            field: 'forearm',
            data: user?.userData?.bodyMeasurement?.forearm,
            color: colors.brown
        },
        {
            label: 'Left Thigh',
            field: 'leftThigh',
            data: user?.userData?.bodyMeasurement?.leftThigh,
            color: colors.black
        },
        {
            label: 'Right Thigh',
            field: 'rightThigh',
            data: user?.userData?.bodyMeasurement?.rightThigh,
            color: colors.primaryDark
        },
        {
            label: 'Belly In',
            field: 'bellyIn',
            data: user?.userData?.bodyMeasurement?.bellyIn,
            color: colors.purple800
        },
        {
            label: 'Belly Out',
            field: 'bellyOut',
            data: user?.userData?.bodyMeasurement?.bellyOut,
            color: colors.red
        },

        {
            label: 'Waist',
            field: 'waist',
            data: user?.userData?.bodyMeasurement?.waist,
            color: colors.brown
        }


    ]
    const addClickHandler = (label, value) => {
        setEditMuscle(prev => value)
        setField(prev => label)
        modalToggler()
    }
    return (
        <View style={styles.root}>
            <View>
                <View>
                    <Text style={styles.heading}>Measurements </Text>
                </View>

                <ScrollView contentContainerStyle={{
                    paddingBottom: 260
                }}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    {arrayMuscleData.map(muscleData => (
                        <Animatable.View
                            animation="fadeIn"
                            easing={'linear'}
                            duration={1000}
                            iterationCount={1}
                            key={muscleData.label}>
                            <ListCardComponentBodyMeasurement
                                label={muscleData?.label}
                                data={muscleData?.data}
                                onPress={muscleSelectedToggle}
                                selected={muscleData.label == selectedMuscle}
                            />
                            {muscleData.label == selectedMuscle &&
                                (
                                    <Animatable.View
                                        style={styles.rowFlexing}
                                        animation="fadeInDown"
                                        easing={'linear'}
                                        duration={360}
                                        iterationCount={1}
                                    >
                                        <Text style={styles.subHeading}>{muscleData.label}</Text>
                                        <IconButton
                                            name={'add'}
                                            size={20}
                                            color={colors.white}
                                            style={[weightLogStyles.iconButton, styles.iconButton]}
                                            onPress={() => addClickHandler(muscleData.field, muscleData.data)}
                                        />
                                        <GraphUserMeasurements color={muscleData?.color} allDataArray={muscleData?.data || []} />
                                    </Animatable.View>
                                )}
                        </Animatable.View>
                    ))}

                </ScrollView>

            </View>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <Pressable style={styles.overlay} onPress={modalToggler}>
                    <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                        <Pressable style={styles.crossContainer} onPress={modalToggler}>
                            <Text style={styles.cross}>x</Text>
                        </Pressable>
                        <UserMeasurementModalContent
                            modalToggler={modalToggler}
                            userName={user.userData.userName}
                            label={selectedMuscle}
                            field={field}
                            data={editMuscle}
                        />
                    </Pressable>
                </Pressable>
            </Modal>


        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    heading: {
        margin: 20,
        fontFamily: 'caviarb',
        fontSize: 40,

    },
    headingMuscle: {
        textAlign: 'center',
        fontFamily: 'caviar',
        fontSize: 18,
    },
    subHeading: {
        margin: 20,
        fontFamily: 'caviarb',
        fontSize: 20,
        textAlign: 'center'
    },
    iconButton: {
        top: 16,
        right: 16,
        width: 40,
        height: 40,
        borderRadius: Platform.select({ ios: '50%', android: 20 }),
        // borderRadius: 20
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 5,
        margin: 10,
        elevation: 7,
        shadowColor: colors.grey,
        backgroundColor: colors.white,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.6,
        zIndex: 900,
        shadowRadius: 4,

    },
    listLabel: {
        color: colors.black,
        fontWeight: '400',
        flex: 8
    },

    listValue: {
        flex: 2,
        textAlign: 'right',
        // marginLeft: 240,
    },
    listIcon: {
        flex: 1,
        textAlign: 'right'
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        height: 500,
        backgroundColor: colors.white,
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
        paddingBottom: 2,
        paddingHorizontal: 8,
        fontSize: 20,
        fontWeight: '800',
        color: colors.primaryDark
    },

})