import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { styles as weightLogStyles } from "./WeightLog";
import IconButton from "../../components/ui/IconButton";
import { colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalContent from "../../components/userMeasurement/ModalContent";


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
    return (
        <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{ minHeight: height }}>
            <Text>BodyMeasurement</Text>

            <IconButton
                name={'add'}
                size={25}
                color={colors.white}
                style={[weightLogStyles.iconButton, styles.iconButton]}
                onPress={modalToggler}
            />
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.overlay} >
                    <View style={styles.modalContent}>
                        <ModalContent modalToggler={modalToggler} />
                    </View>

                </View>


            </Modal>
        </ScrollView>
    );
}

export default BodyMeasurement;

const styles = StyleSheet.create({
    iconButton: {
        bottom: 170
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: colors.white,
        maxHeight: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    },

})