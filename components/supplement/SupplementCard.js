import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/Colors';
import { useState } from 'react';
import ImageLoader from '../ui/ImageLoader';
import { useNavigation } from '@react-navigation/native';
import { SERVERURL } from '../../constants/Environment';

function SupplementCard({ item }) {
    const [imageLoader, setImageLoader] = useState(true);
    const navigation = useNavigation();

    const navigateToSupplementByID = (_id) => {
        navigation.navigate('mySupplement', {
            _id: _id
        })
    }
    return (
        <Pressable
            style={({ pressed }) => [styles.supplementCard, pressed && styles.pressedCard]}
            onPress={navigateToSupplementByID.bind(this, item._id)}
        >
            <View style={styles.imageContainer}>
                {imageLoader && <ImageLoader />}
                {item?.photoURL ? (
                    <Image
                        source={{ uri: SERVERURL + '/' + item.photoURL }}
                        onLoadEnd={() => setImageLoader(false)}
                        style={styles.image}
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/supplement/defaultSupplement.jpg')}
                        onLoadEnd={() => setImageLoader(false)}
                        style={styles.image}
                    />
                )}
            </View>
            <Text style={styles.heading}>
                {item.supplementName}
            </Text>
            <View style={styles.trustedContainer}>
                <Text style={styles.trustedBrandsHeading}>Some Trusted Brands:</Text>
                {item.trustedBrands?.map((ele, key) => {
                    return (
                        <View key={key} >
                            <Text style={styles.trustedBrandName}>
                                {ele}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </Pressable>
    );
}

export default SupplementCard;

const styles = StyleSheet.create({
    supplementCard: {
        width: 300,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
    },
    pressedCard: {
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    heading: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: '400',
        color: colors.primary,
        fontFamily: 'caviar'
    },
    imageContainer: {
        width: '100%',
        height: 160
    },
    image: {
        width: '100%',
        height: 160
    },
    description: {
        marginTop: 20,
        letterSpacing: 1,
        lineHeight: 27,
        fontFamily: 'caviar'
    },
    trustedContainer: {
        marginTop: 20,
    },
    trustedBrandsHeading: {
        marginBottom: 8,
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'caviarb'
    },
    trustedBrandName: {
        marginTop: 5,
        letterSpacing: 1,
        marginRight: 5,
        fontFamily: 'caviar'
    },
})