import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { COLORS, SPACING } from '../theme/theme'
import useAuthStore from '../store/auth-store'

const ProfilePic = () => {
  const { signOut } = useAuthStore()
  return (
    <TouchableOpacity onPress={signOut} style={styles.ImageContainer}>
      <Image
        source={require('../../assets/app_images/avatar.png')}
        style={styles.Image}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36
  }
})

export default ProfilePic
