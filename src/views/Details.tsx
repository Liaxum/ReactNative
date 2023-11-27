import React from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import HTML from "react-native-render-html";

export default function Details({ route }: any) {
  const { occasion } = route.params;
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: occasion.image,
        }}
      />
      <Text style={styles.title}>{occasion.title}</Text>
      <HTML source={{ html: occasion.longDesc }} contentWidth={width} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
