import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'

interface GradientBGIconProps {
  name?: string
  color?: string
  size?: number
  children?: ReactNode
  stylesContainer?: any
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({
  name,
  color,
  size,
  children,
  stylesContainer
}) => {
  return (
    <View style={[styles.Container, { ...stylesContainer }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}
      >
        {children}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    borderColor: COLORS.primaryBlackHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden'
  },
  LinearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default GradientBGIcon
