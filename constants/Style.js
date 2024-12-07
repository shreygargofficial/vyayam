
import { StyleSheet } from 'react-native';
import { colors } from './Colors';
export const commonStyle = StyleSheet.create({
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex: {
        flexDirection: 'row',
    },
    textCenter: {
        textAlign: 'center'
    },
    bold: {
        fontFamily: '500'
    },
    overlayCard: {
        marginTop: 40,
        height: 200,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    overlayText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'king',
        textAlign: 'center'
    },
    overlayTextNormal: {
        fontFamily: 'inherit',
    },
    overlayTextSmall: {
        fontSize: 19,
    },
    imageOverlay: {
        width: '100%',
        height: '100%'
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 9,
        textAlign: 'center',
        justifyContent: 'center'
    },

    pressed: {
        opacity: 0.5
    }
})