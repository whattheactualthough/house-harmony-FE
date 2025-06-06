import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Homescreen() {


 return (
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Link href="/HomePage" accessibilityLabel = "sign in as Kiran">sign in as Kiran</Link>
   </View>
 );

}
