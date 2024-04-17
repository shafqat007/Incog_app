import { View, Text,Image, ActivityIndicator } from 'react-native'
import React from 'react'

import {ChatPlus} from '../assets'

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-10">
     <Image source={ChatPlus} resizeMode="contain" className="h-24 w-24" />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default SplashScreen