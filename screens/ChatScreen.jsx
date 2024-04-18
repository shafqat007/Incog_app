import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { collection } from "firebase/firestore";
import { query, onSnapshot, orderBy } from "firebase/firestore";

import { firestoreDB } from "../config/firebase.config";

import React, { useLayoutEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { addDoc, serverTimestamp } from "firebase/firestore";
const ChatScreen = ({ route }) => {
  const user = useSelector((state) => state.user.user);
  const profileName = user ? user.fullName : "";
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const { room } = route.params;

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      message: message,
      user: user,
      timeStamp: timeStamp,
      roomId: room._id,
    };
    setMessage("");
    await addDoc(collection(firestoreDB, "chats", room._id, "messages"), _doc)
      .then(() => {
        console.log("Message Sent");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, "chats", room?._id, "messages"),
      orderBy("timeStamp", "asc")
    );
    const unsubscribe = onSnapshot(msgQuery, (querySnapshot) => {
      const upMsg = querySnapshot.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.2]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/*go back*/}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          {/*middle8*/}

          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
              <FontAwesome name="users" size={24} color="white" />
            </View>
            <View>
              <Text className="text-black text-base font-semibold capitalize">
                {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}..`
                  : room.chatName}
              </Text>
              <Text className="text-gray-100 text-sm font-semibold capitalize">
                Online
              </Text>
            </View>
          </View>
          {/* last section */}
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity>
              <Text className="text-gray-100 text-xs font-semibold capitalize">
                Welcome:
              </Text>

              <Text className="text-gray-black text-base font-semibold capitalize">
                {profileName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <View className="w-full flexitems-center justify-center ">
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                </>
              ) : (
                <>
                  {messages?.map((msg, i) =>
                    msg.user.providerData.email === user.providerData.email ? (
                      <View className="m-1" key={i}>
                        <View
                          style={{ alignSelf: "flex-end" }}
                          className="bg-gray-200 rounded-2xl px-4 py-2 flex-row items-center justify-center"
                        >
                          <Text className="text-base text-primaryText font-semibold">
                            {msg.message}
                          </Text>
                        </View>
                        <View style={{ alignSelf: "flex-end" }}>
                          {msg?.timeStamp?.seconds && (
                            <Text className="text-[12px] text-black font-semibold">
                              {new Date(
                                msg.timeStamp.seconds * 1000
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{ alignSelf: "flex-start" }}
                        className="flex items-center justify-start space-x-2"
                        key={i}
                      >
                        <View className="space-x-2  flex-row items-center justify-center">
                          {/*name here*/}

                          {/* <Image
                            className="w-10 h-10 rounded-full"
                            resizeMode="cover"
                            source={{ uri: msg.user.photoURL }}
                          /> */}

                          {/*text here*/}
                          <View className="m-1">
                            <View className="bg-gray-200 rounded-2xl px-4 py-2 flex-row items-center justify-center">
                              <Text className="text-base text-primaryText font-semibold">
                                {msg.message}
                              </Text>
                            </View>
                            <View style={{ alignSelf: "flex-start" }}>
                              {msg?.timeStamp?.seconds && (
                                <Text className="text-[12px] text-black font-semibold">
                                  {new Date(
                                    msg.timeStamp.seconds * 1000
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  )}
                </>
              )}
            </ScrollView>

            <View className="w-full flex-row items-center justify-center px-8">
              <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                <TouchableOpacity>
                  <Entypo name="emoji-happy" size={24} color="#555" />
                </TouchableOpacity>
                <TextInput
                  className="flex-1 h-8 text-base text-primaryText font-semibold"
                  placeholder="Type a message"
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>
              <TouchableOpacity onPress={sendMessage} className="pl-4">
                <FontAwesome name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;
