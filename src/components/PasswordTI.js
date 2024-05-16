import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { black, primaryColor, white } from '../utils/Style'

const PasswordTI = (props) => {
  return (
    <View style={styles.mainView}>
      <TextInput placeholder={props.title} style={styles.TI} placeholderTextColor={black} value={props.val}  onChangeText={props.onChange} secureTextEntry={props.password}/>
      <TouchableOpacity onPress={props.action}>
        {props.password ==false ?
      <Entypo name={'eye'} size={30} color={'black'}/>
      :
      <Entypo name={'eye-with-line'} size={30} color={'black'}/>
    }
      </TouchableOpacity>
    </View>
  )
}

export default PasswordTI

const styles = StyleSheet.create({
    mainView:{
        width:'90%',
        borderColor:primaryColor,
        borderWidth:3,
        alignSelf:'center',
        margin:10,
        borderRadius:10,
        paddingHorizontal:8,
        paddingVertical:2,
        alignItems:'center',
        backgroundColor:white,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    TI:{
        fontSize:18,
        color:black
      }
})