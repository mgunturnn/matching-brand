import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation;
  const [addedToCart, setAddedToCart] = useState(false); // edited at critoe
  const height = (width * 100) / 100;
  const dispatch = useDispatch(); // edited at critoe
  const addItemToCart = (item)=>{
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  }; // modified at critoe
  const cart = useSelector((state) => state.cart.cart); // edited at critoe
  console.log(cart);
  
  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#D3A29D",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            padding: 5,
            gap: 10,
            backgroundColor: "#E7C7C3",
            borderRadius: 20,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="#FFFFFF"
          />
          <TextInput style={{ color: "#FFFFFF" }} placeholder="Search" />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
               
                </Text>
              </View> */}

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          $ {route?.params?.oldPrice}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#BDD1C5", backgroundColor: "#BDD1C5", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#BDD1C5", backgroundColor: "#BDD1C5", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total: ${route.params.price}
        </Text>
        <Text style={{ color: "#D4A29C" }}>
          FREE Delivery with SiCepat Logistic
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Deliver To Bandung - Jawa Barat
          </Text>
        </View>
      </View>

      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)} // edited at critoe
        style={{
          borderColor:"#BDD1C5",
          backgroundColor:'white',
          borderWidth:2, 
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
      {addedToCart ? (
        <View >
          <Text>Added to Cart</Text>
        </View>
      ) : (
        <Text>Add to Cart</Text>
      )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#BDD1C5",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{color:"black"}}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
