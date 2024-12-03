import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconInputCustom from "../../../ui/IconInputCustom";
import { colors } from "../../../../constants/Colors";
import ButtonWithBorder from "../../../ui/ButtonWithBorder";
import { updateSplitForUserCreator } from "../../../../redux/ActionCreators/userActionsCreator";

function EditSplitPerDay({ navigation, route }) {
    const { day } = route.params;
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData);
    const allExercise = useSelector(state => state.exercise.exerciseData);

    const [searchTerm, setSearchTerm] = useState("")
    const [allExerciseState, setAllExerciseState] = useState(allExercise)
    const [daysExistingExerciseArrayOfId, setDaysExistingExerciseArrayOfId] = useState(user?.exerciseSplit[day]);

    const existingSelectedExerciseObjArray = useMemo(() => {
        return allExercise.filter(exercise => daysExistingExerciseArrayOfId?.includes(exercise._id))
    }, [allExercise, daysExistingExerciseArrayOfId])

    const ITEMS_TO_DISPLAY = 8;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: day,
            title: 'Edit ' + day + ' Split'
        })
    }, [])
    useEffect(() => {

        if (searchTerm.length >= 3 && allExercise) {
            const search = searchTerm.trim().toLowerCase();
            const filteredExercise = allExercise.filter(ex =>
                ex.exerciseName.toLowerCase().includes(search) ||
                ex.exerciseType.toLowerCase().includes(search) ||
                ex.primaryMuscleTargeted.toLowerCase().includes(search) ||
                ex.splitDerivative.some(ele => ele.toLowerCase().includes(search))
            );
            setAllExerciseState(filteredExercise);
        }
        else {
            setAllExerciseState(allExercise)
        }
    }, [searchTerm])


    const onChangeText = (val) => {
        val = val.toLowerCase();
        setSearchTerm(val)


    }
    const onExerciseSelect = (_id) => {
        setDaysExistingExerciseArrayOfId(prev => {
            if (!prev.includes(_id))
                return [...prev, _id]
            else {
                return prev.filter(existId => existId != _id)
            }
        })
    }

    const submitHandler = () => {
        let dataToSubmit = {
            ...user?.exerciseSplit,
            [day]: daysExistingExerciseArrayOfId
        }
        dispatch(updateSplitForUserCreator(user.userName, dataToSubmit))

    }
    const cancelHandler = () => {
        setDaysExistingExerciseArrayOfId(user?.exerciseSplit[day])
    }
    return (
        <View style={styles.root}>
            <View style={styles.existingTileSrollContainer}>
                <Text style={styles.title}> Your Selected One</Text>
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.existingTileContainer}>
                        {
                            (existingSelectedExerciseObjArray.length > 0) ?
                                existingSelectedExerciseObjArray.map(ele => {
                                    return (
                                        <View style={styles.selectedExerciseTile} key={ele._id}>
                                            <Text style={styles.selectedExerciseTileText}>{ele.exerciseName}</Text>
                                        </View>
                                    )
                                })
                                :
                                <Text style={styles.notSelected}>Not Selected Any Exercise</Text>

                        }
                    </View>
                </ScrollView>

            </View>

            <View style={styles.searchInputContainer}>
                <IconInputCustom
                    name={'search'}
                    placeholder={'Search'}
                    size={30}
                    value={searchTerm}
                    onChangeText={onChangeText}
                    style={styles.searchInput}
                />
                <Text style={styles.numberOfItemsText}>Top {ITEMS_TO_DISPLAY} Items</Text>
            </View>

            <View style={styles.searchResultContainer}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 40 }}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    {allExerciseState.slice(0, ITEMS_TO_DISPLAY).map(ele => {
                        return (
                            <Pressable
                                key={ele._id}
                                onPress={onExerciseSelect.bind(this, ele._id)}
                                style={({ pressed }) => [styles.card, pressed && styles.pressed]}

                            >
                                <Text style={styles.cardText}>{ele.exerciseName}</Text>
                            </Pressable>
                        )
                    })
                    }

                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonWithBorder
                    title={'Save'}
                    color={colors.white}
                    style={styles.buttonSave}
                    onPress={submitHandler}
                />
                <ButtonWithBorder
                    title={'Reset'}
                    color={colors.white}
                    style={styles.buttonCancel}
                    onPress={cancelHandler}
                />
            </View>

        </View>);
}

export default EditSplitPerDay;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 20,

    },
    title: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.primary,
        marginVertical: 10,
        textAlign: 'center'
    },
    existingTileSrollContainer: {
        flex: 3
    },
    notSelected: {
        fontSize: 20,
        fontWeight: '100'
    },
    pressed: {
        opacity: 0.2
    },
    searchInputContainer: {
        flex: 3,
        paddingHorizontal: 20
    },
    searchResultContainer: {
        flex: 7
    },
    existingTileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginVertical: 20
    },
    selectedExerciseTile: {
        backgroundColor: colors.black,
        borderRadius: 20,
        padding: 8,
        margin: 5,
    },
    selectedExerciseTileText: {
        color: colors.white,
        fontSize: 11
    },
    searchInput: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'center',
        width: '70%',
        borderRadius: 10,
    },
    numberOfItemsText: {
        marginTop: 0,
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 12,
        color: colors.black
    },
    card: {
        padding: 14,
        margin: 8,
        borderRadius: 5,
        backgroundColor: colors.primary,
        elevation: 4,
        alignSelf: 'center',
        width: 300,
        shadowColor: colors.purple800,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    cardText: {
        color: colors.white
    },
    buttonContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 30,
        marginHorizontal: 20

    },
    buttonSave: {
        marginHorizontal: 10,
        backgroundColor: colors.green,
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'transparent'

    },
    buttonCancel: {
        marginHorizontal: 10,
        flex: 1,
        backgroundColor: colors.red200,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'transparent'
    },


})