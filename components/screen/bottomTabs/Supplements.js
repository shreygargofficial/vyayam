import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allSupplementsFetchActionCreator } from "../../../redux/ActionCreators/supplementActionCreator";
import { commonStyle } from "../../../constants/Style";
import { colors } from "../../../constants/Colors";
import SupplementCard from "../../supplement/SupplementCard";

function Supplements() {
    const dispatch = useDispatch();
    const supplements = useSelector(state => state.supplement);

    useEffect(() => {
        dispatch(allSupplementsFetchActionCreator());
    }, []);


    if (!supplements.supplementData)
        return (
            <View style={styles.root}>
                <Text>
                    {supplements.supplementError}
                </Text>
            </View>
        );
    return (
        <View>
            <FlatList
                data={supplements.supplementData}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                renderItem={({ item }) => {
                    return (
                        <SupplementCard item={item} />
                    )
                }}
            />
        </View>
    )

}

export default Supplements;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


})