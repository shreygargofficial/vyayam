import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../redux/slice/snakbarSlice";
import { useEffect } from "react";

function Snackbar({ style, textStyle }) {
    let snakState = useSelector(state => state.snackbar);
    let dispatch = useDispatch()
    const onPress = () => {
        dispatch(snackbarActions.disableSnakBar())
    }
    useEffect(() => {
        if (snakState.show) {
            const timer = setTimeout(() => {
                dispatch(snackbarActions.disableSnakBar());
            }, 5000); // 5000 milliseconds = 5 seconds

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [snakState.show, dispatch]);

    return (
        <View style={[styles.root, style]} >
            <Pressable onPress={onPress}>
                <View style={styles.x}><Text style={styles.text}>x</Text></View>
                <Text style={[styles.text, textStyle, snakState?.message?.toLowerCase()?.includes('success') ? styles.green : styles.red]}>{snakState.message}</Text>
            </Pressable>
        </View>
    );
}

export default Snackbar;

let styles = StyleSheet.create({
    root: {
        position: 'absolute',
        width: '90%',
        padding: 25,
        bottom: 100,
        backgroundColor: colors.black,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        opacity: 1,
        zIndex: 6,

    },
    text: {
        color: colors.white,
        opacity: 1,
    },
    x: {
        position: 'absolute',
        top: 0,
        right: 5
    },
    green: {
        color: colors.green
    },
    red: {
        color: colors.red
    }
})