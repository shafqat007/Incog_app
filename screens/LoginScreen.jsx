import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; // Import useState from react
import { BGImage, Logo } from '../assets'; // Assuming BGImage and Logo are imported correctly
import { UserTextinput } from '../components';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // Move useState inside the functional component
  const [password, setPassword] = useState(''); // Add useState for password
  const[ getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const screenWidth = Math.round(Dimensions.get('window').width);
const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-start">
      <Image source={BGImage} resizeMode='cover' className="h-96" style={{ width: screenWidth }} />
      <View className="w-full h-full bg-white rounded-tl-[60px] rounded-tr-[60px] -mt-44 flex items-center justify-staret py-6 px-6 space-y-6">
        {/* Main Container */}
        <Image source={Logo} resizeMode='contain' className="h-16 w-16" />
        <Text className="py-2 text-primaryText text-xl font-semibold">Welcome Back!</Text>
        <View className="w-full flex items-center justify-center">
          {/* email */}
          <UserTextinput placeholder="Email" isPass={false} setStatValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus}/>
          {/* password */}
          <UserTextinput placeholder="Password" isPass={true} setStatValue={setPassword} />
          {/* login button */}
          <TouchableOpacity className="w-full px-4 py-2 rounded-xl bg-primary

           my-3 flex items-center justify-center"> 
            <Text className="py-2 text-white text-xl font-semibold">Sign In</Text>   
          </TouchableOpacity>
          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("SignUpScreen")}>
              <Text className="text-base font-semibold text-primaryBold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;