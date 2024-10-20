import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/ui/IconButton";
import { colors } from "../../constants/Colors";
import { useMemo, useState } from 'react';
import { dateFormatterToShowOnXAxis, sortArrayBasedOnDate } from "../../utils/helperFunction/DateFunction";
import { LineChart } from 'react-native-chart-kit';
import WeightAddModalContent from "../../components/weight/WeightAddModalContent";
import { usePagination } from "../../hooks/usePagination";
import { MaterialIcons } from "@expo/vector-icons";


const chartConfig = {
    backgroundGradientFrom: '#eee',
    backgroundGradientTo: '#eee',
    color: () => colors.primaryDark,
    strokeWidth: 1, // optional, default 3,
    barPercentage: 0.9,
    propsForLabels: {
        fontSize: 9,  // Adjust the font size here
    },
};



function WeightLog() {

    const user = useSelector(state => state.user)
    const [choosenIndex, setChoosenIndex] = useState(-1)
    const [modalShow, setModalShow] = useState(false)
    const userData = user.userData;
    const sortedWeightArray = useMemo(() => sortArrayBasedOnDate(userData?.weight), [userData?.weight])

    const CONTENT_TO_SHOW = 5
    const { begginingIndex, lastIndex, prevPage, nextPage } = usePagination(CONTENT_TO_SHOW, sortedWeightArray);

    const { dateData, weightData } = useMemo(() => {
        let dateData = []
        let weightData = []
        for (let ele of sortedWeightArray) {
            dateData.push(ele.date);
            weightData.push(ele.value)
        }
        if (begginingIndex !== null && lastIndex !== null) {
            dateData = dateData.slice(begginingIndex, lastIndex)
            weightData = weightData.slice(begginingIndex, lastIndex)
        }
        return { dateData, weightData }
    }, [begginingIndex, lastIndex, sortedWeightArray])

    const data = {
        labels: dateData,
        datasets: [
            {
                data: weightData,
            },
        ],
    };
    const onDataPointClick = (data) => {
        setChoosenIndex(data.index)
    }
    const modalToggler = () => {
        setModalShow(prev => !prev)
    }

    return (
        <View style={styles.root}>
            <View style={styles.weightContainer}>
                <Text style={styles.weightText}>
                    Current Weight : <Text style={styles.bold}>{sortedWeightArray[sortedWeightArray.length - 1].value}kg</Text>
                </Text>
            </View>
            <IconButton
                name={'add'}
                size={25}
                color={colors.white}
                style={styles.iconButton}
                onPress={modalToggler}
            />
            <View style={styles.flexRow}>
                <IconButton name="keyboard-arrow-left" size={30} color={begginingIndex > 0 ? colors.primaryDark : colors.grey} onPress={prevPage} />
                <IconButton name="keyboard-arrow-right" size={30} color={(lastIndex && lastIndex == sortedWeightArray.length) ? colors.grey : colors.primaryDark} onPress={nextPage} />
            </View>
            <View style={styles.chartContainer}>
                <LineChart
                    withInnerLines={false}
                    withOuterLines={false}
                    fromZero={true}
                    yAxisSuffix={" kg"}
                    onDataPointClick={onDataPointClick}
                    renderDotContent={({ x, y, index, indexData }) => (
                        <View
                            style={{
                                position: 'absolute',
                                left: x - 10,
                                top: y - 30,
                                fontSize: 30,
                            }}
                            key={index}>
                            <Text style={{ color: colors.primary }}>{(choosenIndex >= 0 && choosenIndex == index) && `${indexData} Kg`}</Text>
                        </View>
                    )}
                    style={styles.chart}
                    data={data}
                    width={350}
                    formatXLabel={(x) => dateFormatterToShowOnXAxis(x)}
                    height={220}
                    chartConfig={chartConfig}
                    bezier // Optional for smooth curves
                />
            </View>
            <View style={styles.axisDenotion}>
                <Text style={styles.axisDenotionText}>X axis Date (dd/mm/yy)</Text>
                <Text style={styles.axisDenotionText}>Y axis Weight(Kg)</Text>
            </View>

            <Modal
                visible={modalShow}
                animationType="slide"
                transparent={true}
            >
                <WeightAddModalContent
                    sortedWeightArray={sortedWeightArray}
                    userName={userData.userName}
                    modalToggler={modalToggler}
                />
            </Modal>
        </View >
    );
}

export default WeightLog;

export const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    iconButton: {
        backgroundColor: colors.primaryDark,
        borderRadius: Platform.select({ ios: '50%', android: 30 }),
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        elevation: 22,
        zIndex: 10,
        bottom: 100,
        right: 40
    },
    weightContainer: {
        marginTop: 40,
        flex: 2,
        alignItems: 'center',

    },
    flexRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bold: {
        fontWeight: '700'
    },
    weightText: {},
    chartContainer: {
        flex: 8,
        alignItems: 'center',
        marginTop: 20,
        // padding: 20,
        alignItems: 'center'
    },
    axisDenotion: {
        flex: 1,
        // alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 100
    },
    axisDenotionText: {
        color: colors.primary,
        fontSize: 12
    },

})