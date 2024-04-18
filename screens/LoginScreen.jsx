import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import { UserTextinput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(
    false
  );

  const screenWidth = Math.round(Dimensions.get("window").width);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log("User Id:", userCred?.user.uid);
            getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  console.log("User Data:", docSnap.data());
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log("Error:", err.message);
          if (err.message.includes("password")) {
            setAlert(true);
            setAlertMessage("Password Mismatch");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User Not Found");
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email Address");
          }
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGImage}
        resizeMode="cover"
        className="h-96"
        style={{ width: screenWidth }}
      />

      <View className="w-full h-full bg-white rounded-tl-[60px] rounded-tr-[60px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} resizeMode="contain" className="h-16 w-16" />
        <Text className="py-2 text-primaryText text-xl font-semibold">
          Welcome Back!
        </Text>

        <View className="w-full flex items-center justify-center space-y-3">
          {alert && (
            <Text className="text-red-500 text-sm">{alertMessage}</Text>
          )}

          <UserTextinput
            placeholder="Email"
            isPass={false}
            setStatValue={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          <UserTextinput
            placeholder="Password"
            isPass={true}
            setStatValue={setPassword}
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-white text-xl font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>

          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
