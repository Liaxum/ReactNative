import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Occasion from "@/services/Occasion";
import Occasions from "@/services/Occasions";

type ItemProps = { occasion: Occasion, navigation: any };

export default function Categories({ navigation }: any) {
  const instance = Occasions.instance;
  const [filteredOccasions, setFilteredOccasions] = React.useState<Occasion[]>([]);
  const [category, setCategory] = React.useState<string | null>(null);

  const fetchFilteredOccasions = async () => {
    if (category) {
      await instance.fetch({ search: category });
      setFilteredOccasions(instance.occasions.slice(0, 20));
    }
  };

  React.useEffect(() => {
    fetchFilteredOccasions();
  }, [category]);

  const Item = ({ occasion, navigation }: ItemProps) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", { occasion })} style={styles.item}>
        <Text style={styles.title}>{occasion.title}</Text>
        <Text>{occasion.shortDesc}</Text>
      </TouchableOpacity>
    );
  };

  const renderButtons = () => {
    const categories = ["Mairie", "Cinema", "Politique", "Service", "Patrimoine"];

    return (
      <View style={styles.buttonContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={styles.button}
            onPress={() => setCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.window}>
      {renderButtons()}
      <FlatList
        data={filteredOccasions}
        renderItem={({ item }: any) => <Item occasion={item} navigation={navigation} />}
        keyExtractor={(item) => item.uid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});