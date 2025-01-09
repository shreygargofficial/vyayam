import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Values } from "../../../constants/Values";

function About() {
    return (
        <ScrollView
            contentContainerStyle={styles.root}
        >
            <Text style={styles.paragraph}>
                Welcome to {Values.appName} – your all-in-one fitness companion, designed to support every step of your health journey. Whether you’re a seasoned athlete or just starting out, {Values.appName} has everything you need to stay on track and achieve your fitness goals.
            </Text>

            <Text style={[styles.bold, styles.heading]}> Our features include</Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Workout Logging: </Text>Keep track of every workout, with details on sets, reps, and weights, helping you monitor your progress over time.
                Weight and Measurement
            </Text>

            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Tracking: </Text> Easily log body measurements and weight to stay motivated and see your improvement.
            </Text>

            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Customized Workout Plans: </Text>
                Create your own gym workout split or choose from professionally designed routines tailored to different fitness levels.
            </Text>

            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Exercise Library: </Text>
                Discover new exercises and learn the proper techniques with our comprehensive exercise guides.
            </Text>

            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Healthy Recipes:</Text>
                Fuel your workouts and lifestyle with a selection of nutritious, easy-to-make recipes for recipes and snacks.
            </Text>

            <Text style={[styles.bold, styles.heading]}> Credits</Text>
            <Text style={styles.paragraph}>
                We would love to thanks some of the platform who helped us indirectly in the journey
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Media Credits: </Text>
                FREEPIK.com, Unsplash.com, Pexels.com, logo.com, lottiefiles.com
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Ticket Raising: </Text>
                Plane.so
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Version Control: </Text>
                GitHub.com
            </Text>


        </ScrollView>
    );
}

export default About;

const styles = StyleSheet.create({
    root: {
        padding: 10,
        paddingBottom: 120,
    },
    heading: {
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: 30,
        fontFamily: 'caviarb',
        marginVertical: 20,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 32,
        marginTop: 12,
        fontFamily: 'caviar'
    },
    bold: {
        fontWeight: '500',
        fontSize: 18,
        fontFamily: 'caviarb'
    }

})