import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import logo from "../assets/logobaru.png";
import { Entypo } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://i.pinimg.com/550x/f2/1b/61/f21b6136325ccda55e99b6db131bb716.jpg",
      name: "Cloths",
    },
    {
      id: "1",
      image:
        "https://w7.pngwing.com/pngs/315/659/png-transparent-white-cap-red-rojo-blanco-blue-army-blue-white-hat.png",
      name: "Hats",
    },
    {
      id: "3",
      image:
        "https://img2.pngdownload.id/20180629/zf/kisspng-jeans-t-shirt-slim-fit-pants-pocket-skinny-5b36305d088056.9928884815302779810348.jpg",
      name: "Pants",
    },
    {
      id: "4",
      image:
        "https://e7.pngegg.com/pngimages/22/777/png-clipart-t-shirt-tracksuit-clothing-jacket-t-shirt-white-black-white.png",
      name: "Jackets",
    },
    {
      id: "5",
      image:
        "https://png.pngtree.com/png-vector/20201224/ourmid/pngtree-black-and-white-trend-sneakers-product-display-png-image_2603850.jpg",
      name: "Shoes",
    },
  ];
  const images = [
    "https://img.freepik.com/premium-vector/big-seasonal-final-sale-text-special-offer-celebrate-background-with-gold-pink-air-balloons-realistic-vector-stock-design-shop-sale-banners-grand-opening-party-flyer_505557-4790.jpg",
    "https://img.freepik.com/free-photo/discount-purse-podium_23-2150165496.jpg",
  ];
  // must edited
  const deals = [
    {
      id: "20",
      title: "AIRism Katun T-Shirt Oversize Garis (Lengan Half)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/468563/item/goods_76_468563.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/460325/item/idgoods_02_460325.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462060/item/idgoods_08_462060.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463905/item/goods_61_463905.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  // must edited
  const offers = [
    {
      id: "0",
      title:
        "AIRism Katun T-Shirt Lengan Pendek",
      offer: "20%",
      oldPrice: 19000,
      price: 15000,
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457939/item/idgoods_71_457939.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457939/sub/idgoods_457939_sub7.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457939/sub/goods_457939_sub14.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457939/sub/goods_457939_sub17.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457939/sub/goods_457939_sub18.jpg?width=750",
      ],
      color: "Purple",
      size: "XL",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455533/item/goods_32_455533.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460727/item/goods_12_460727.jpg?width=750",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439062/sub/goods_439062_sub14.jpg?width=750",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  console.log("products", products);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image style={{ width: 110, height: 75 }} source={logo} />
      </View>
      <ScrollView>
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#FAEDEB",
          }}
        >
          <Entypo name="location-pin" size={24} color="#A36361" />

          <Pressable>
            <Text style={{ fontSize: 13, color: "#A36361" }}>
              Only Deliver to Bandung - Jawa Barat
            </Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 70, height: 70, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: "100%" }}
        />

        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Most Popular Products
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {deals.map((item, index) => (
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 180,
                  height: 180,
                  resizeMode: "contain",
                  marginLeft: 10,
                }}
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Info", {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                  alignItems: "center",
                  margin: 2,
                }}
                source={{ uri: item?.image }}
              />

              <View
                style={{
                  backgroundColor: "#E31837",
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                  borderRadius: 4,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {products
            ?.filter((item) => item.category === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
