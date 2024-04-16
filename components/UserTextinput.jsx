import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Entypo, MaterialIcons } from '@expo/vector-icons'

const UserTextinput = ({ placeholder, isPass, setStatValue }) => {
  const [value,setValue] = useState('')
  const [showPass,setShowPass] = useState(true)
  const [icon,setIcon] = useState(null)
  const handleTextChanged = (text) => {
    setValue(text)
    setStatValue(text)
  }

  useLayoutEffect(() => {
switch(placeholder) {
  case 'Full Name':
    return setIcon('person')
  case 'Email':
    return setIcon('email')
  case 'Password':
    return setIcon('lock')

}
  }, [])
  
  return (
    <View className={'border rounded-2xl px-4 py-6 flex-row items-center justify-between space-x-4 my-2 border-gray-200'}>
      <MaterialIcons name={icon} size={24} color="black" />
      <TextInput className='flex-1 text-base text-primaryText font-semibold -mt-1'
        placeholder={placeholder} 
        value={value}
        onChangeText={handleTextChanged}
        secureTextEntry={isPass && showPass}
        autoCapitalize='none'
        />
        {isPass && (
          <TouchableOpacity onPress={() =>setShowPass(!showPass)}>
<Entypo name={`${showPass?"eye":"eye-with-line"}`} size={24} color="black" />
</TouchableOpacity>
        )}
    </View>
  )
}

export default UserTextinput
