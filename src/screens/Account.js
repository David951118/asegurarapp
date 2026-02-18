import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);


  const handleLogin = async () => {
    try {
      await signIn({ username, password });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CELLVI Mobil</Text>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" type="material" color="#fff" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Usuario CELLVI"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" type="material" color="#fff" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "visibility-off" : "visibility"}
            type="material"
            color="#fff"
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Button
        title="Ingresar"
        buttonStyle={styles.loginButton}
        onPress={handleLogin}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0044cc",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#ffcc00",
    borderRadius: 25,
    paddingVertical: 10,
    width: "60%",
    alignSelf: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  forgotPassword: {
    color: "#0044cc",
    textAlign: "center",
    marginTop: 15,
  },
});
