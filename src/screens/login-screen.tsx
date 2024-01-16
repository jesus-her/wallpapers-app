import React, { useState } from 'react'
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import useAuthStore from '../store/auth-store'

const LoginScreen = ({ navigation, route }: any) => {
  const { signIn, createUser } = useAuthStore()

  const [formData, setFormData] = useState({
    email: 'jesus0.hn@gmail.com',
    password: 'password1234'
  })

  const handleInputChange = (fieldName: string, text: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: text
    }))
  }

  const handleLogin = () => {
    signIn(formData.email, formData.password)
  }

  const handleRegister = () => {
    createUser(formData.email, formData.password)
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}
        >
          <Text>Login Screen</Text>
          <TextInput
            placeholder='Email address'
            value={formData.email}
            onChangeText={(text: string) => handleInputChange('email', text)}
          />
          <TextInput
            placeholder='Password'
            value={formData.password}
            onChangeText={(text: string) => handleInputChange('password', text)}
          />

          <Button title='Login' onPress={handleLogin} />
          <Button title='Create account' onPress={handleRegister} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ScrollViewFlex: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  FooterInfoArea: {
    padding: SPACING.space_20
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium
  }
})

export default LoginScreen
