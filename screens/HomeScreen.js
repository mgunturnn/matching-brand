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
import React, { useCallback, useEffect, useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import logo from "../assets/logobaru.png";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://imgdb.net/storage/uploads/bcbe58e400ed5d340e611a91d7241a889f5cb32d26772b5e5470a2e5f0e2d3b2.png",
      name: "Cloths",
    },
    {
      id: "1",
      image:
        "https://imgdb.net/storage/uploads/820f12f04cc98187e3b6fc15082c1e55e221964ee01298d4f802526c33f53339.png",
      name: "Hats",
    },
    {
      id: "3",
      image:
        "https://imgdb.net/storage/uploads/5c123424d208b8fadff74fdcbf4d3db5ab635f13c02cb1c839f7d51cb464caf9.png",
      name: "Pants",
    },
    {
      id: "4",
      image:
        "https://imgdb.net/storage/uploads/3717215b17d4536cebbd0044672ba66a662159a8a1695b9aa9b928932a9dd5a5.png",
      name: "Jackets",
    },
    {
      id: "5",
      image:
        "https://imgdb.net/storage/uploads/0d738b3fe1f043c33bfe8aeb47674a888f08e5a67b92921f9bcfbc58ff3b139f.png",
      name: "Shoes",
    },
  ];
  const images = [
    "https://img.freepik.com/premium-vector/big-seasonal-final-sale-text-special-offer-celebrate-background-with-gold-pink-air-balloons-realistic-vector-stock-design-shop-sale-banners-grand-opening-party-flyer_505557-4790.jpg",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/big-sale-banner-design-template-7a455468cdb295f8b7320d6b492c7105_screen.jpg?ts=1602781632",
  ];
  // must edited
  const deals = [
    {
      id: "20",
      title: "AIRism Katun T-Shirt Oversize Garis (Lengan Half)",
      oldPrice: 20,
      price: 20,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/468563/item/goods_35_468563.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/468563/item/goods_35_468563.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/468563/sub/goods_468563_sub17.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/468563/sub/goods_468563_sub23.jpg?width=750",
      ],
      color: "Brown",
      size: "S, M, L",
    },
    {
      id: "30",
      title: "Kemeja Brushed Lembut Kotak Lengan Panjang",
      oldPrice: 25,
      price: 25,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463483/item/goods_34_463483.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463483/item/goods_34_463483.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463483/sub/goods_463483_sub17.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463483/sub/goods_463483_sub20.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/463483/item/idgoods_05_463483.jpg?width=750",
      ],
      color: "Brown",
      size: "S, M, L",
    },
    {
      id: "40",
      title: "AIRism Atasan  Tanpa Lengan",
      oldPrice: 25,
      price: 25,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455341/sub/goods_455341_sub14.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455341/sub/goods_455341_sub14.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/455341/item/idgoods_09_455341.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455341/sub/goods_455341_sub18.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455341/sub/goods_455341_sub17.jpg?width=750",
      ],
      color: "Black",
      size: "S, M, L",
    },
    {
      id: "50",
      title: "Rok Model Celana Rapi (Kotak)",
      oldPrice: 23,
      price: 23,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464912/sub/goods_464912_sub14.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464912/sub/goods_464912_sub14.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464912/sub/goods_464912_sub17.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464912/item/idgoods_06_464912.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464912/sub/goods_464912_sub23.jpg?width=750",
      ],
      color: "GRray",
      size: "S, M, L",
    },
  ];
  // must edited
  const offers = [
    {
      id: "0",
      title: "AIRism Katun T-Shirt Lengan Pendek",
      offer: "20%",
      oldPrice: 15,
      price: 12,
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
      title: "Jeans Ultra Stretch (Skinny Fit)",
      offer: "40%",
      oldPrice: 25,
      price: 20,
      image:
        "https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/455472/item/eugoods_61_455472.jpg?width=450&impolicy=quality_70",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/eu/imagesgoods/455472/item/eugoods_61_455472.jpg?width=450&impolicy=quality_70",
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/453954/item/goods_09_453954.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "T-Shirt Dolman Lengan 3/4",
      offer: "20%",
      oldPrice: 15,
      price: 12,
      image:
        "https://iora.online/sg/wp-content/uploads/ATB-8735-LONG-SLEEVES-BLOUSE-PINK.jpg",
      carouselImages: [
        "https://iora.online/sg/wp-content/uploads/ATB-8735-LONG-SLEEVES-BLOUSE-PINK.jpg",
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/459350/sub/goods_459350_sub18.jpg?width=600",
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/424973/sub/goods_424973_sub13.jpg?width=734",
      ],
      color: "pink",
      size: "Normal",
    },
    {
      id: "3",
      title: "UT Sanrio Characters Lengan Pendek",
      offer: "10%",
      oldPrice: 10,
      price: 9,
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/465715/item/idgoods_00_465715.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/465715/item/idgoods_00_465715.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/465715/sub/idgoods_465715_sub9.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465715/sub/goods_465715_sub14.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465715/sub/goods_465715_sub18.jpg?width=750",
      ],
      color: "White",
      size: "L, S, M",
    },
    {
      id: "4",
      title: "Pakaian Dalam Boxer Katun (Pinggang Rendah)",
      offer: "10%",
      oldPrice: 10,
      price: 9,
      image:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461017/item/goods_69_461017.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461017/item/goods_69_461017.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464312/sub/idgoods_464312_sub23.jpg?width=750",
        "https://runamante.com/wp-content/uploads/2022/11/Product-introduction-diagram-8-1-665x1024.jpg",
        "https://th.bing.com/th/id/OIP.B8YjOKKljQMrKzMFBoH8MAHaHV?pid=ImgDet&w=474&h=469&rs=1",
      ],
      color: "Navy",
      size: "L, S, M",
    },
    {
      id: "5",
      title: "Jaket AirSense (Serupa Wol)",
      offer: "10%",
      oldPrice: 70,
      price: 63,
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/461912/sub/idgoods_461912_sub4.jpg?width=750",
      carouselImages: [
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/461912/sub/idgoods_461912_sub4.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461912/sub/goods_461912_sub14.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461912/sub/goods_461912_sub17.jpg?width=750",
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461912/sub/goods_461912_sub22.jpg?width=750",
      ],
      color: "Navy",
      size: "L, S, M",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");
  console.log(selectedAddress);
  const [category, setCategory] = useState("men's clothing");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  // edited at cw
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

  // edited at critoe
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.246.243:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  // refresh the addresses when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  // get userId from authToken
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("user", userId);

  // console.log(userId);
  // console.log("addresses", addresses);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image style={{ width: 175, height: 75 }} source={logo} />
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

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
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
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add a Address
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

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
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
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
                    backgroundColor: "#D4A29C",
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
                    {item?.offer} Off
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
              // value={category} //genderValue
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

      {/* edited at critoe */}
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        {/* edited at critoe */}
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fonstSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="black" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo}, {item?.landmark}
                </Text>
                {/*numberOfLines={1}*/}

                <Text style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  {item?.street}
                </Text>

                <Text style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  Bandung, Jawa Barat
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                marginRight: 15,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={24} color="black" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Set to Fake Location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons
                name="location-searching"
                size={24}
                color="black"
              />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Current Location
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
