import { View, Text ,Image,Dimensions} from 'react-native'
import React from 'react'
import { BGImage } from '../assets'
import { Logo } from '../assets'

const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <View className="flex-1 items-center justify-start">
    <Image source={BGImage} resizeMode='cover' className="h-96" style={{width:screenWidth}}/>
    <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-staret py-6 px-6 space-y-6">
{/*Main Container*/}

<Image source={Logo} resizeMode='cover' className="h-96" style={{width:screenWidth}}/>


    </View>
    
    
    
    
    
    
    
    </View>
  )
}

export default LoginScreen