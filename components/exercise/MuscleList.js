import { FlatList } from "react-native";
import MuscleCard from "./MuscleCard";
import { colors } from "../../constants/Colors";

const MuscleArray = ['chest', 'legs', 'biceps', 'triceps', 'shoulder', 'back', 'core', 'forearm']
function MuscleList() {
    return (
        <FlatList
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={MuscleArray}
            renderItem={({ item }) => <MuscleCard muscle={item} />}
            keyExtractor={(item) => item}
            contentContainerStyle={{ flex: 1, alignItems: 'center', paddingTop: 80, backgroundColor: colors.white }}

        />
    );
}

export default MuscleList;