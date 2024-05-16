import { KeyboardAvoidingView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import CustomTI from '../components/CustomTI'
import { RegularFont, primaryColor, secondaryColor } from '../utils/Style'
import CustomButton from '../components/CustomButton'
import CustomTO from '../components/CustomTO'
import PasswordTI from '../components/PasswordTI'
import auth from '@react-native-firebase/auth'

const SignUp = ({navigation}) => {
  const { height, width } = useWindowDimensions()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [Name, setName] = useState('')
  const [secureEntry, setSecureEntry] = useState(true)
  const toggle = () => {
    setSecureEntry(!secureEntry)
  }
  const SignUpFun = async () => {
    try {
        // Create user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(Email, Password);
        
        // Get the newly created user
        const user = userCredential.user;
        
        // Send email verification to the user
        if (user) {
            await user.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://awesome-3db8b.firebaseapp.com/__/auth/action?mode=action&oobCode=code' // Replace with your app's verification URL
            });
            console.warn('Verification email sent.');
            
            // Clear form fields
            setConfirmPassword('');
            setPassword('');
            setEmail('');
            setName('');
            
            // Navigate the user to the login screen
            navigation.navigate('Login');
        }
    } catch (err) {
        console.warn('Error during signup or sending verification email:', err);
    }
};
  return (
    <View style={{
      height: height,
      width: width,
    }}>
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={100} enabled={true}>
      <View style={styles.subView}>
        <Text style={styles.welcomeText} > Please SignUp</Text>
      </View>
      <View style={styles.subViewTwo}>
        
          <CustomTI title={'Enter Your Name'} onChange={(val) => setName(val)} val={Name} />
          <CustomTI title={'Enter Your Email Address'} onChange={(val) => setEmail(val)} val={Email} />
          <PasswordTI title={'Enter Your Password'} password={secureEntry} action={toggle} onChange={(val) => setPassword(val)} val={Password} />
          <PasswordTI title={'Confirm Your Password'} password={secureEntry} action={toggle} onChange={(val) => setConfirmPassword(val)} val={confirmPassword} />
          <CustomButton title={'SignUp'} action={SignUpFun} />
          <CustomTO details={'Already Have an Account ? '} title={'Login'} action={() => navigation.navigate('Login')} />
      </View>
        </KeyboardAvoidingView>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  subView: {
    height: '30%',
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: RegularFont,
    color: primaryColor
  },
  subViewTwo: {
    justifyContent: 'flex-start',
    height: '55%',
  },

})