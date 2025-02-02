import { View, Text, StyleSheet, Image, ScrollView, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { updateUserCreator } from "../../../redux/ActionCreators/userActionsCreator";
import UserInfo from "../../user/UserInfo";
import UserUpdateForm from "../../user/UserUpdateForm";
import { colors } from "../../../constants/Colors";
import IconButton from "../../ui/IconButton";
import { sortArrayBasedOnDate } from "../../../utils/helperFunction/DateFunction";
import * as Animatable from "react-native-animatable";


function User() {
    const user = useSelector(state => state.user);
    const [scrollViewPadding, setScrollViewPadding] = useState(100);
    const [editEnable, setEditEnable] = useState(false)
    const dispatch = useDispatch()
    const sortedWeightArray = useMemo(() => sortArrayBasedOnDate(user?.userData?.weight), [user?.userData?.weight])

    const defaultValueUser = {
        firstName: user?.userData?.firstName || "",
        lastName: user?.userData?.lastName || "",
        birthDate: user?.userData?.birthDate || 0,
        height: user?.userData?.height || 0,
        weight: sortedWeightArray[user?.userData?.weight?.length - 1].value,
        targetedWeight: user?.userData?.targetedWeight || 0,
        bio: user?.userData?.bio || "",
        gender: user?.userData?.gender || ""


    };


    const randomFolder = user?.userData?.gender ? user?.userData?.gender : 'others'
    const images = {
        'male': require('../../../assets/images/avatar/male/3.png'),
        'female': require('../../../assets/images/avatar/female/3.png'),
        'others': require('../../../assets/images/avatar/others/3.png')
    }


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setScrollViewPadding(event.endCoordinates.height); // Set padding based on keyboard height
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setScrollViewPadding(100); // Reset padding when keyboard hides
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const submitHandler = (val) => {
        let dataToSend = {
            ...val,
            birthDate: val.birthDate.getFullYear()
        }
        dispatch(updateUserCreator(user?.userData?.userName, dataToSend))
        editToggler()
    }
    const editToggler = () => {
        setEditEnable(prev => !prev)
    }
    return (
        <ScrollView
            style={styles.root}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scrollViewPadding }}>

            <Animatable.View
                style={styles.rowFlexing}
                animation="fadeIn"
                easing={'linear'}
                duration={1000}
                iterationCount={1}
            >
                <View style={styles.imageContainer}>
                    <Image source={images[randomFolder]} style={styles.image} />
                </View>
                <View style={styles.unEditTextContainer}>
                    <Text style={[styles.userName, styles.lineHeight]}>
                        {user?.userData?.userName}
                    </Text>
                    <Text style={styles.emailAddress}>
                        {user?.userData?.emailAddress}
                    </Text>
                    <Text style={styles.phoneNumber}>
                        {user?.userData?.userPhoneNumber}
                    </Text>
                </View>
            </Animatable.View>

            <Animatable.View
                animation={'fadeIn'}
                duration={500}
                delay={500}
                iterationCount={1}
                easing={'linear'}
                style={styles.canEditTextContainer}
            >
                <View style={styles.rowFlexing}>
                    <Text style={styles.basicInfoText}>Basic Information</Text>
                    <View style={styles.iconContainer}>
                        <IconButton name="edit" size={30} color={colors.primaryDark} onPress={editToggler} />
                    </View>
                </View>

                {editEnable ?
                    (<UserUpdateForm defaultValueUser={defaultValueUser} submitHandler={submitHandler} user={user} />)
                    : (<UserInfo defaultValueUser={defaultValueUser} />)}
                {user?.error && <Text style={[styles.errorText]}>{user?.error}</Text>}
            </Animatable.View>

        </ScrollView>);
}

export default User;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 30,
        marginTop: 40
    },
    lineHeight: {
        lineHeight: 24,
    },
    rowFlexing: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    imageContainer: {
        flex: 3,
        overflow: 'hidden',
    },
    image: {
        width: 80,
        height: 80
    },

    unEditTextContainer: {
        flex: 8,
        paddingLeft: 20

    },

    userName: {
        fontSize: 22,
        fontWeight: '300',
        color: '#222',
    },
    emailAddress: {
        fontSize: 12,
        fontWeight: '200',
        lineHeight: 30,
        color: '#222',
    },
    phoneNumber: {
        fontSize: 11,
        fontWeight: '200',
        color: '#222',
    },

    basicInfoText: {
        textAlign: 'center',
        // marginTop: 40,
        fontSize: 34,
        fontFamily: 'caviar',
        fontWeight: '200',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 40,
        textAlign: 'center'
    },

})