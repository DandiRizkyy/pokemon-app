import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import useFetch from "../custom-hook/useFetch";

const Home = () => {
  const router = useRouter();
  const [input, setInput] = useState<string | undefined>("");
  const { data, isLoading, error, refetch } = useFetch(`pokemon/${input}`);
  const [pokemonImage, setPokemonImage] = useState<string | undefined>("");

  const imageUrl = () => {
    return `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png`;
  };

  const refetchData = () => {
    refetch();
  };
  console.log(data);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <TextInput
          onChangeText={(text) => setInput(text)}
          value={input}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Enter Pokémon name"
        />

        <View>
          <Text style={styles.title}></Text>
          <Button title="Display Pokemon Details" onPress={refetchData} />
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : data ? (
            <>
              <Image
                source={{
                  uri: "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png",
                }}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
              <FlatList
                data={data.abilities}
                renderItem={({ item }: any) => (
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {item.ability.name}
                    </Text>
                  </View>
                )}
                keyExtractor={(item: any) => item.ability.name}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
