import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomLoader from "../../ui/CustomLoader";
import { colors } from "../../../constants/Colors";
import { SERVERURL } from "../../../constants/Environment";
import HTMLView from "react-native-htmlview";

const TEXT_COLOR = colors.black
function SupplementByID() {

    const route = useRoute();
    const { _id } = route.params;
    const supplementData = useSelector(state => state.supplement.supplementData);
    const [mySupplement, setMySupplement] = useState(null);
    const [imageIsLoading, setImageIsLoading] = useState(true);

    useEffect(() => {
        if (supplementData.length) {
            let filteredSupplement = supplementData.find(ele => ele._id == _id)
            setMySupplement(filteredSupplement)
        }
    }, [supplementData]);

    const openBrowser = async (url) => {
        const urlDefault = "https://www.google.com"; // Replace with your desired URL
        const supported = await Linking.canOpenURL(urlDefault);

        if (supported) {
            await Linking.openURL(urlDefault); // Opens the URL in the default browser
        } else {
            alert(`Cannot open the URL: ${urlDefault}`);
        }
    };

    return (
        <View style={styles.root}>
            {imageIsLoading && <CustomLoader />}
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {mySupplement?.photoURL ? (
                    <Image
                        source={{ uri: SERVERURL + '/' + mySupplement?.photoURL }}
                        onLoadEnd={() => setImageIsLoading(false)}
                        style={styles.image}
                    />
                ) : (
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/supplement/defaultSupplement.jpg')}
                        onLoadEnd={setImageIsLoading.bind(this, false)}
                    />
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>
                        {mySupplement?.supplementName}
                    </Text>
                    <Text style={styles.description}>
                        <HTMLView
                            stylesheet={{
                                p: {
                                    color: TEXT_COLOR,
                                    lineHeight: 23,
                                    letterSpacing: 1,
                                },
                                span: {
                                    color: TEXT_COLOR
                                },
                                h1: {
                                    color: TEXT_COLOR
                                },
                                h2: {
                                    color: TEXT_COLOR
                                },
                                h3: {
                                    color: TEXT_COLOR
                                },
                                h4: {
                                    color: TEXT_COLOR
                                },
                                strong: {
                                    color: TEXT_COLOR
                                },
                                ul: {
                                    color: TEXT_COLOR
                                },
                                b: {
                                    color: TEXT_COLOR
                                },
                                li: {
                                    color: TEXT_COLOR
                                },

                            }}
                            value={mySupplement?.description || ''}
                        />
                    </Text>

                    {
                        mySupplement?.linkToBuy &&
                        (
                            <Pressable onPress={openBrowser.bind(mySupplement?.linkToBuy)}>
                                <Text style={styles.link}>Link to Buy</Text>
                            </Pressable>
                        )}
                    <View style={styles.trustedContainer}>
                        <Text style={styles.trustedBrandsHeading}>Some Trusted Brands:</Text>
                        {mySupplement?.trustedBrands?.map((ele, key) => {
                            return (
                                <View key={key} >
                                    <Text style={styles.trustedBrandName}>
                                        {ele}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default SupplementByID;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    heading: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: '400',
        color: colors.primary,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 300,
    },
    description: {
        marginTop: 30,
        letterSpacing: 1,
        fontSize: 18,
    },
    infoContainer: {
        paddingHorizontal: 20
    },
    link: {
        marginTop: 20,
        color: colors.purple800
    },
    trustedContainer: {
        marginTop: 20,
    },
    trustedBrandsHeading: {
        marginBottom: 8,
        fontSize: 17,
        fontWeight: '500',
    },
    trustedBrandName: {
        marginTop: 5,
        letterSpacing: 1,
        marginRight: 5,
    },
})