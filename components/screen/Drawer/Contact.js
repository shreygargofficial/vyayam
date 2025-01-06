import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Values } from "../../../constants/Values";
import * as Linking from 'expo-linking';
import { colors } from "../../../constants/Colors";
function Contact() {
    const handleEmailPress = () => {
        const email = Values.support; // replace with your email
        const subject = "Contact Us"; // Optional: pre-fill a subject
        const body = "Hello, I have a question about..."; // Optional: pre-fill a message body

        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.canOpenURL(emailUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(emailUrl);
                } else {
                    Alert.alert("Email client not available");
                }
            })
            .catch((err) => console.error("An error occurred", err));
    };

    return (
        <View style={styles.root} >
            <View style={styles.infoContainer}>
                <Image source={require('../../../assets/images/about/shrey.png')} style={styles.myImage} />
                <Text style={[styles.text, styles.heading]}>Any Query?</Text>
                <Text style={styles.text}>Reach out to us at</Text>
                <Pressable onPress={handleEmailPress}>
                    <Text style={[styles.text, styles.mail]}>{Values.support}</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Contact;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,

    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 40,
        fontFamily: 'caviar',
    },
    myImage: {
        alignSelf: 'center',
        height: 400,
        width: 300,
    },
    text: {
        color: colors.primary,
        fontSize: 20,
        lineHeight: 32,
        fontFamily: 'caviar',
    },
    heading: {
        fontSize: 23,
        marginVertical: 10,
        color: colors.black,
        // textAlign: 'center',
        fontWeight: '200',
        fontFamily: 'caviarb',
    },
    mail: {
        color: colors.purple800
    }
})