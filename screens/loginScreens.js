// menit 39:33 / 6:43:07
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logobaru.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const loginScreens = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image style={{ width: 150, height: 100, marginTop: 50 }} source={logo} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 400,
              marginTop: 40,
              color: "#000000",
            }}
          >
            LOGIN
          </Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              borderColor: "#A36361",
              borderWidth: 1,
              alignItems: "center",
              gap: 5,
              backgroundColor: "white",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="#A36361"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "#A36361",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              borderColor: "#A36361",
              borderWidth: 1,
              alignItems: "center",
              gap: 5,
              backgroundColor: "white",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              style={{ marginLeft: 8 }}
              name="key"
              size={24}
              color="#A36361"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "#A36361",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter Your Password"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#A36361" }}>Keep me logged in</Text>

          <Text style={{ color: "#A36361", fontWeight: 500 }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable
          style={{
            width: 200,
            backgroundColor: "#A36361",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15
          }}
        >
          <Text style={{textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold"}}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop: 15}}>
            <Text style={{textAlign:"center", color: "#A36361", fontSize: 16}}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default loginScreens;

const styles = StyleSheet.create({});
