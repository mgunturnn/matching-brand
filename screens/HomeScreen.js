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
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

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
      oldPrice: 249000,
      price: 249000,
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
      oldPrice: 299000,
      price: 299000,
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
      oldPrice: 299000,
      price: 299000,
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
      oldPrice: 299000,
      price: 299000,
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
      oldPrice: 170000,
      price: 126000,
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
      oldPrice: 300000,
      price: 180000,
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
      oldPrice: 150000,
      price: 120000,
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
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
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
      oldPrice: 99990,
      price: 89990,
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
      oldPrice: 899990,
      price: 799990,
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
  const [category, setCategory] = useState("men's clothing");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
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

  // edited at critoe
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);

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
              <Text style={{ fontSize: 13, color: "#A36361" }}>
                Deliver to Bandung - Jawa Barat
              </Text>
            </Pressable>
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

          <ScrollView>
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

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Entypo name="location-pin" size={24} color="black" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Masukan Alamat Manual
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialIcons name="location-searching" size={24} color="black" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Gunakan Alamat Sekarang
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
