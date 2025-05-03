import CustomButton from "@/components/Button";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function Index() {

  const router = useRouter()
  useFonts({
    'Poetsen': require('../assets/fonts/PoetsenOne-Regular.ttf'),
  });

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#508D4E",
        position: "relative",
        isolation: "isolate"
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          marginBottom: 40
        }}
      >
        {/* Header */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text 
            style={{ 
              fontFamily: "Poetsen", fontWeight: 400, fontSize: 30, color: "#FFD964", textAlign: "center", 
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10 
            }}
          >
            SMART WASTE SORTING ASSISTANT
          </Text>
          {/* <Text style={{ color: "white", fontSize: 15}}> */}
          <Text style={{ color: "white", fontSize: 15, }}>
            AI Innovation for Environmental Impact
          </Text>
        </View>
        <View>
          <CustomButton extraStyle={{ display: "flex", flexDirection: "row", gap: 8 }} onPress={() => {
            router.push("/scanner-page")
          }}>
            <Text style={{ color: "#46460c", fontWeight: "bold" }}>Start</Text>
          </CustomButton>
        </View>
      </View>
      <Image
        source={require("../assets/images/home-page-bg.png")}
        style={{
          position: "absolute",
          bottom: -50,
          left: 0,
          right: 0,
          width: "100%",
          objectFit: "contain",
          zIndex: -1
        }}
      />
      <View style={{
        position: "absolute",
        width: "100%",
        backgroundColor: "#445c3b",
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -2
      }}/>
      <Image
        source={require("../assets/images/home-decor-left.png")}
        style={{
          position: "absolute",
          left: -170,
          top: 50
        }}
      />
      <Image
        source={require("../assets/images/home-decor-right.png")}
        style={{
          position: "absolute",
          right: -180,
          top: 80
        }}
      />
    </View>
  );
}
