import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Values } from "../../../constants/Values";

function Privacy() {
    return (
        <ScrollView
            contentContainerStyle={styles.root}
        >
            <Text style={[styles.bold, styles.small]}>Privacy Policy</Text>
            <Text>
                <Text style={[styles.bold, styles.small]}>Effective Date: </Text>01-Jan-2025
            </Text>

            <View>
                <Text style={[styles.bold, styles.heading]}>1. Introducion</Text>
                <Text style={styles.paragraph}>
                    Welcome to {Values.appName}. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information.
                </Text>
            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>2. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We collect information to provide better services to all our users. This includes:
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Personal Information: </Text>When you register, we may collect personal information such as your name, email address, and other contact details.

                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Usage Information:  </Text>We collect information about how you interact with our app, including your preferences, features used, and activities performed.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Device Information: </Text>Information about the device you use, including hardware model, operating system, and unique device identifiers.
                </Text>
            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>3. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    • We use the information we collect to:
                </Text>
                <Text style={styles.paragraph}>
                    • Provide, maintain, and improve our services.
                </Text>
                <Text style={styles.paragraph}>
                    • Personalize your experience.
                </Text>
                <Text style={styles.paragraph}>
                    • Communicate with you about updates, offers, and promotions.
                </Text>
                <Text style={styles.paragraph}>
                    • Respond to your questions or requests for support.
                </Text>
            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>4. Information Sharing</Text>
                <Text style={styles.paragraph}>
                    We may share information with trusted service providers who work on our behalf to perform services.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>With Service Providers:  </Text>We may share information if required to comply with applicable laws or respond to lawful requests.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>For Legal Reasons:  </Text>We collect information about how you interact with our app, including your preferences, features used, and activities performed.
                </Text>
            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>5. Data Security</Text>
                <Text style={styles.paragraph}>
                    We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                </Text>

            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>6. Your Choices and Rights</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Access and Update:   </Text>You can access and update your personal information through your account settings.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Opt-Out: </Text>You may opt-out of receiving promotional communications at any time.
                </Text>
            </View>


            <View>
                <Text style={[styles.bold, styles.heading]}>7. Children’s Privacy</Text>
                <Text style={styles.paragraph}>
                    Our app is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
                </Text>

            </View>

            <View>
                <Text style={[styles.bold, styles.heading]}>8. Changes to This Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy periodically. Any changes will be posted in the app, and your continued use of the app after any changes constitutes acceptance of the new policy.
                </Text>

            </View>

        </ScrollView>
    );
}

export default Privacy;

const styles = StyleSheet.create({
    root: {
        padding: 12,
        paddingBottom: 120,
    },
    heading: {
        textTransform: 'capitalize',
        fontSize: 26,
        marginVertical: 10,
        fontFamily: 'caviarb',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 32,
        marginTop: 6,
        fontFamily: 'caviar',
    },
    bold: {
        fontWeight: '600',
        fontSize: 18,
        fontFamily: 'caviarb',
    },
    small: {
        fontSize: 13,
        fontFamily: 'caviar',
    }

})