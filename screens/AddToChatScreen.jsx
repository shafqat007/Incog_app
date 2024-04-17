import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { set } from "firebase/database";


const AddToChatScreen = () => {
  const user = useSelector((state) => state.user.user);
  const profileName = user ? user.fullName : "";
  const navigation = useNavigation();
  const [addChat, setAddChat] = useState("");
  const createNewChat = async () => {
    let id = `${Date.now()}`;
    const _doc = {
      _id: id,
      chatName: addChat,
      user:user,}
      if (addChat !== "") {
        setDoc(doc(firestoreDB, "chats", id), _doc).then(()=>{
          setAddChat("")
          navigation.replace("HomeScreen")
        }).catch((error)=>{
          alert (error.message)
        })
      }
  }
  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.25]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/*go back*/}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* last section */}
          <View>
            <TouchableOpacity>
              <Text>
                Welcome: <Text className="font-extrabold">{profileName}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-4">
          <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3">
            <Ionicons name="chatbubbles" size={24} color="black" />
            <TextInput
              placeholderTextColor="#999"
              placeholder="Create a chat"
              className=" w-full h-12 -mt-1 text-pr text-lg flex-1"
              value={addChat}
          onChangeText={(text) => setAddChat(text)}

            />

            <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;
