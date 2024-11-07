import { Pressable, StyleSheet, Text, View } from "react-native";
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        marginTop: 200
    },
    text: {
        color: colors.primary,
        fontSize: 20,
        lineHeight: 32,

    },
    heading: {
        fontSize: 23,
        marginVertical: 10,
        color: colors.black,
        // textAlign: 'center',
        fontWeight: '200',

    },
    mail: {
        color: colors.purple800
    }
})