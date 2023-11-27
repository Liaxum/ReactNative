import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import supabase from "src/supabase";

export default function Login({ navigation }: any){
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");

  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Une erreur est survenue");
      return;
    }
    navigation.navigate("Tabs");
  }

  const Register = async () => {
    if (password !== passwordConfirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Une erreur est survenue");
      return;
    }
    navigation.navigate("Tabs");
  }

  return (
    <View style={styles.window}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {isRegistering ? (
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            secureTextEntry
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
        ) : (
          <Pressable
            onPress={() => {Login()}}
            style={({ pressed }) => ({
              ...styles.btn,
              backgroundColor: pressed ? "lightgray" : "white",
            })}
          >
            <Text style={{ color: "blue" }}>Login</Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            if (!isRegistering) {
              setIsRegistering(!isRegistering);
              return;
            }
            Register()
          }}
          style={({ pressed }) => ({
            ...styles.btn,
            backgroundColor: pressed ? "lightgray" : "white",
          })}
        >
          <Text style={{ color: "blue" }}>Sign up</Text>
        </Pressable>
        {isRegistering ? (
          <Pressable
          onPress={() => {
            if (isRegistering) setIsRegistering(!isRegistering);
          }}
          style={({ pressed }) => ({
            ...styles.btn,
            backgroundColor: pressed ? "lightgray" : "white",
          })}
        >
          <Text style={{ color: "red" }}>Cancel</Text>
        </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "75%",
    padding: 20,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  btn: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
  },
});
