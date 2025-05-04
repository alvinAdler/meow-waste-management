import React from 'react';
import { Pressable, Text, View } from 'react-native';

type ButtonProps = {
  children?: React.ReactNode,
  onPress: () => void;
  extraStyle?: any
  text?: string
}

const CustomButton: React.FC<ButtonProps> = ({ children, onPress, extraStyle, text }) => {
  return (
    <Pressable onPress={() => {
      onPress()
    }}>
      <View
        style={{
          backgroundColor: "#ffd964",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 120,
          borderRadius: 5,
          ...extraStyle
        }}
      >
        {text ? <Text style={{ color: "#46460c", fontWeight: "bold", textAlign: "center" }}>{text}</Text> : <>{children}</>}
      </View>
    </Pressable>
  )
}

export default CustomButton