import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { ChatPlus } from "../assets";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firestoreDB } from "../config/firebase.config";
import { orderBy, query, collection, onSnapshot } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestoreDB, "chats"),
      orderBy("_id", "desc")
    );
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });
    return unsubscribe; //to stop listening to the updates
  }, []);

  const profileName = user ? user.fullName : "";
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="w-full flex-row items-center justify-between px-4 py-10">
          <Image source={ChatPlus} resizeMode="contain" className="h-12 w-12" />
          <Text className="pl-12 self-center justify-center font-semibold">
            Home
          </Text>
          <TouchableOpacity className="flex items-center justify-center border-primary">
            <Text>
              Welcome: <Text className="font-extrabold">{profileName}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/*scroll*/}

        <ScrollView className="w-full px-4 pt-4">
          <View className="w-full">
            <View className="w-full flex-row items-center justify-between px-2">
              <Text className="text-primaryText text-base font-extrabold pb-2">
                Recent Chats
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddToChatScreen")}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <>
                <View className="w-full flex-row items-center justify-center py-4">
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              </>
            ) : (
              <>
                {chats && chats?.length > 0 ? (
                  <>
                    {chats?.map((room) => (
                      <MessageCard key={room._id} room={room} />
                    ))}
                  </>
                ) : (
                  <>
                    <View className="w-full flex-row items-center justify-center py-4">
                      <Text className="text-primaryText text-base font-extrabold">
                        No Chats Available
                      </Text>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const MessageCard = ({ room }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatScreen", { room: room })}
      className="w-full flex-row items-center justify-start py-2 "
    >
      {/*images*/}
      <View className="w-12 h-12 rounded-full border bg-black border-white flex items-center justify-center">
       <FontAwesome name="users" size={24} color="white" />
         </View>


      <View className="flex-1 flex items-start justify-center ml-4 ">
        <Text className="text-base text-[#333] font-semibold capitalize">
          {room.chatName}
        </Text>
        <Text className=" text-[#333] text-sm ">User Name</Text>
      </View>
      <Text className=" text-primary px-4 text-base font-semibold ">27m</Text>
    </TouchableOpacity>
  );
};
export default HomeScreen;
