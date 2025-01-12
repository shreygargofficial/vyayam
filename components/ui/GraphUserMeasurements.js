import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { dateFormatterToShowOnXAxis } from "../../utils/helperFunction/DateFunction";
import { useMemo, useState } from "react";
import { colors } from "../../constants/Colors";
import { usePagination } from "../../hooks/usePagination";
import IconButton from "./IconButton";

function GraphUserMeasurements({ color, allDataArray = [], CONTENT_TO_SHOW = 5 }) {
    let { measurementData, dateData } = useMemo(() => {
        let dates = [];
        let values = [];
        allDataArray.forEach(ele => {
            dates.push(ele.date);
            values.push(ele.value)
        })
        return { dateData: dates, measurementData: values }
    }, [allDataArray])

    const [choosenIndex, setChoosenIndex] = useState(-1);
    const { begginingIndex, lastIndex, prevPage, nextPage } = usePagination(CONTENT_TO_SHOW, measurementData);

    const onDataPointClick = (data) => {
        setChoosenIndex(data.index)
    }
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: () => color,
        strokeWidth: 1, // optional, default 3,
        barPercentage: 0.9,
        propsForLabels: {
            fontSize: 9,  // Adjust the font size here
        },
    };

    const XAxis = (begginingIndex != (null || 0) && lastIndex != (null || 0)) ? dateData.slice(begginingIndex, lastIndex) : dateData.slice(0, CONTENT_TO_SHOW);
    const YAxis = (begginingIndex != (null || 0) && lastIndex != (null || 0)) ? measurementData.slice(begginingIndex, lastIndex) : measurementData.slice(0, CONTENT_TO_SHOW);;


    const data = {
        labels: XAxis,
        datasets: [
            {
                data: YAxis
            },
        ],
    };

    return (
        <View style={styles.chartContainer}>
            {measurementData.length > 0 ? <View>
                <View style={styles.flexRow}>
                    <IconButton name="keyboard-arrow-left" size={30} color={begginingIndex > 0 ? colors.primaryDark : colors.grey} onPress={prevPage} />
                    <IconButton name="keyboard-arrow-right" size={30} color={(lastIndex && lastIndex == measurementData.length) ? colors.grey : colors.primaryDark} onPress={nextPage} />
                </View>
                <LineChart
                    withInnerLines={false}
                    withOuterLines={true}
                    fromZero={true}
                    yAxisSuffix={" inch"}
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
                            <Text style={{ color: colors.primary }}>{(choosenIndex >= 0 && choosenIndex == index) && `${indexData} inch`}</Text>
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
            </View> :
                <Text style={styles.noData}>Add Your first Entry!</Text>
            }

        </View>
    );
}

export default GraphUserMeasurements;

const styles = StyleSheet.create({
    chartContainer: {
        flex: 8,
        alignItems: 'center',
        backgroundColor: colors.white,
        marginTop: 20,
        alignItems: 'center'
    },
    axisDenotion: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginBottom: 100
    },
    axisDenotionText: {
        color: colors.primary,
        fontSize: 12
    },
    noData: {
        paddingVertical: 20
    },
    flexRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})