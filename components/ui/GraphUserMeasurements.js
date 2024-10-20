import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { dateFormatterToShowOnXAxis } from "../../utils/helperFunction/DateFunction";
import { useState } from "react";
import { colors } from "../../constants/Colors";
import IconButton from "./IconButton";
import { usePagination } from "../../hooks/usePagination";

function GraphUserMeasurements({ color, dateData, measurementData, CONTENT_TO_SHOW = 5 }) {

    const [choosenIndex, setChoosenIndex] = useState(-1);
    const { begginingIndex, lastIndex, prevPage, nextPage } = usePagination(CONTENT_TO_SHOW, measurementData);

    const onDataPointClick = (data) => {
        setChoosenIndex(data.index)
    }
    const chartConfig = {
        backgroundGradientFrom: '#eee',
        backgroundGradientTo: '#eee',
        color: () => color,
        strokeWidth: 1, // optional, default 3,
        barPercentage: 0.9,
        propsForLabels: {
            fontSize: 9,  // Adjust the font size here
        },
    };

    const XAxis = (begginingIndex != null && lastIndex != null) ? dateData.slice(begginingIndex, lastIndex) : dateData;
    const YAxis = (begginingIndex != null && lastIndex != null) ? measurementData.slice(begginingIndex, lastIndex) : measurementData;
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
            <View style={styles.flexRow}>
                <IconButton name="keyboard-arrow-left" size={30} color={begginingIndex > 0 ? colors.primaryDark : colors.grey} onPress={prevPage} />
                <IconButton name="keyboard-arrow-right" size={30} color={(lastIndex && lastIndex == measurementData.length) ? colors.grey : colors.primaryDark} onPress={nextPage} />
            </View>
            <LineChart
                withInnerLines={false}
                withOuterLines={true}
                fromZero={true}
                yAxisSuffix={" cm"}
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
                        <Text style={{ color: colors.primary }}>{(choosenIndex >= 0 && choosenIndex == index) && `${indexData} cm`}</Text>
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
    );
}

export default GraphUserMeasurements;

const styles = StyleSheet.create({
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
    flexRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})