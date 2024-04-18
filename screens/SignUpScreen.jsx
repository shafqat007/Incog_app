import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react"; // Import useState from react
import { BGImage, Logo ,incog} from "../assets"; // Assuming BGImage and Logo are imported correctly
import { UserTextinput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore"; // Correct import statement for Firestore database module
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
// Assuming avatars is imported correctly
import { createUserWithEmailAndPassword } from "firebase/auth"; // Correct import statement for Firebase authentication module
// Import getAuth for initializing Firebase authentication

const SignUpScreen = () => {
  const [email, setEmail] = useState(""); // Move useState inside the functional component
  const [password, setPassword] = useState(""); // Add useState for password
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "")
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          const data = {  
            _id:userCred?.user.uid,
            fullName:name,
            providerData:userCred.user.providerData[0],
          }
          setDoc(doc(firestoreDB, "users", userCred?.user.uid), data).then(()=>{
            navigation.navigate("LoginScreen")
          });
        }
      );
  };
  const [name, setName] = useState(""); // Add useState for name
  // Add useState for avatar
  const screenWidth = Math.round(Dimensions.get("window").width);
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGImage}
        resizeMode="cover"
        className="h-96"
        style={{ width: screenWidth }}
      />
      <View className="w-full h-full bg-white  rounded-tl-[60px] rounded-tr-[60px] -mt-80 flex items-center justify-start py-6 px-6 space-y-3">
        {/* Main Container */}
        <Image source={incog} resizeMode="contain" className="h-24 w-24" />
        <Text className="py-0 text-primaryText text-xl font-semibold">
          Join with us!
        </Text>

        <View className="w-full flex items-center justify-center">
          {/*full name*/}

          <UserTextinput
            placeholder="Full Name"
            isPass={false}
            setStatValue={setName}
          />

          {/* email */}
          <UserTextinput
            placeholder="Email"
            isPass={false}
            setStatValue={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserTextinput
            placeholder="Password"
            isPass={true}
            setStatValue={setPassword}
          />
          {/* login button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="w-full px-4 py-2 rounded-xl bg-primary

         my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-white text-xl font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
