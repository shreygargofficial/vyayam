import { useState } from "react";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { colors } from "../../../constants/Colors";
import InputLabelCustom from "../../ui/InputLabelCustom";
import ButtonSimple from "../../ui/ButtonSimple";
import { commonStyle } from "../../../constants/Style";
import ButtonWithBorder from "../../ui/ButtonWithBorder";
function OneRepMaxCalculator() {
    const [modalShow, setModalShow] = useState(false)
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const [lbsEnabled, setLbsEnabled] = useState(false)
    const [error, setError] = useState('')
    const [calculatedValue, setCalculatedValue] = useState(0)


    const onChangeWeight = (val) => {
        setWeight(val)
    }

    const toggleLbsSwitch = () => {
        setLbsEnabled(prev => !prev)
    }
    const onChangeReps = (val) => {
        setReps(val)
    }

    const calculate = () => {
        if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
            setError('Input valid weight and reps!')
            return;
        }
        let w = +weight;
        let r = +reps;
        if (r === 1)
            setCalculatedValue(w);
        else
            setCalculatedValue((w * (1 + r / 30)).toFixed(2))
        setError('');
        setModalShow(true)

    }
    return (
        <View style={styles.root}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>One Rep Max Calculator</Text>
                <Text style={styles.textInfo}>
                    Calculate your one-rep max (1RM) for any lift. Your one-rep max is the max weight you can lift for a single repetition for a given exercise.
                </Text>
                <InputLabelCustom
                    label={'Weight (kg/lbs)'}
                    placeholder={'Enter Weight in lbs/kg'}
                    labelColor={colors.primary}
                    keyboardType={'numeric'}
                    value={weight.toString()}
                    style={styles.input}
                    onChangeText={onChangeWeight}
                />

                <InputLabelCustom
                    label={'Repitations'}
                    placeholder={'Repitation'}
                    labelColor={colors.primary}
                    keyboardType={'numeric'}
                    value={reps.toString()}
                    style={styles.input}
                    onChangeText={onChangeReps}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>KG</Text>
                    <Switch
                        trackColor={{ false: colors.grey, true: colors.primary }}
                        ios_backgroundColor="#3e3e3e"
                        style={styles.switch}
                        thumbColor={colors.white}
                        onValueChange={toggleLbsSwitch}
                        value={lbsEnabled}
                    />
                    <Text style={[styles.switchText, styles.leftMargin]}>LBS</Text>
                </View>
                <Text style={commonStyle.textDanger}>{error}</Text>
                <View style={{ alignItems: 'flex-start' }}>
                    <ButtonSimple
                        disabled={!weight || !reps}
                        color={colors.white}
                        style={styles.button}
                        title={'Calculate'}
                        onPress={calculate}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalShow}>
                <Pressable style={styles.overlay} onPress={(e) => setModalShow(false)}>
                    <Pressable style={styles.modal} onPress={(e) => {
                        e.stopPropagation()
                    }}>
                        <Text style={[styles.heading, styles.heading2]}>Results</Text>
                        <Text style={styles.resultValue}><Text style={styles.bold}>Your One Rep Max: </Text>{calculatedValue} {lbsEnabled ? 'lbs' : 'kg'}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <ButtonWithBorder
                                disabled={!weight || !reps}
                                color={colors.primary}
                                style={{ marginTop: 50 }}
                                title={'Close'}
                                onPress={() => setModalShow(false)}
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

export default OneRepMaxCalculator;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.black
    },
    textContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    heading: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '200',
        color: colors.white,
        lineHeight: 40,
        letterSpacing: 1
    },
    heading2: {
        color: colors.black
    },
    textInfo: {
        letterSpacing: 1,
        lineHeight: 26,
        fontSize: 20,
        marginTop: 50,
        color: colors.white
    },
    input: {
        color: colors.white,
        borderBottomColor: colors.primaryDark,
        borderBottomWidth: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    switchText: {
        color: colors.primary,
    },
    switch: {
        marginLeft: 20,
    },
    leftMargin: {
        marginLeft: 20,
    },
    button: {
        backgroundColor: colors.primaryDark,
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 4,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end'
    },
    modal: {
        height: 400,
        padding: 20,
        backgroundColor: colors.white,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },

    resultValue: {
        marginTop: 50
    },
    bold: {
        fontWeight: '600'
    }
})