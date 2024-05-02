import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";

const FormField = ({
  title,
  value,
  placeHolder,
  handleChangeText,
  otherStyles,
  keybordType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-base text-gray-400 font-medium">{title}</Text>
      <View className="w-full flex-row h-16 px-4 border border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
