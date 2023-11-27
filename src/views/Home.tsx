import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Occasion from "@/services/Occasion";
import Occasions from "@/services/Occasions";
import { TextInput } from "react-native-gesture-handler";

type ItemProps = { occasion: Occasion };

export default function Home({ navigation }: any) {
  const instance = Occasions.instance;
  const [occasions, setOccasions] = React.useState<Occasion[]>([]);
  const [search, setSearch] = React.useState<string>();
  const [date, setDate] = React.useState<Date>();
  const [page, setPage] = React.useState<number>(1);

  const fetchOccasions = async () => {
    await instance.fetch({ search, date });
    setOccasions(instance.occasions);
  };

  const fetchOccasionsPageChange = async () => {
    await instance.fetch({ page });
    occasions.push(...instance.occasions);
    setOccasions(occasions);
  };

  React.useEffect(() => {
    fetchOccasions();
  }, [search, date]);

  React.useEffect(() => {
    fetchOccasionsPageChange();
  }, [page]);

  const Item = ({ occasion }: ItemProps) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details")} style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: occasion.image,
          }}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{occasion.title}</Text>
          <Text style={styles.subTitle}>{occasion.shortDesc}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.window}>
      <TextInput onChange={({ nativeEvent: { text } }) => setSearch(text)} style={styles.search} placeholder="Search, (Event title, Keywords)"/>
      <FlatList
        data={occasions}
        renderItem={({ item }: any) => <Item occasion={item} />}
        keyExtractor={(item) => item.uid}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page < instance.pages) setPage(page + 1);
        }}
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
  container: {
    flex: 1,
  },
  search: {
    padding: 10,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flexShrink: 1,
  },
  subTitle: {
    flexShrink: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});
