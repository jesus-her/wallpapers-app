import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo'
import { LinearGradient } from 'expo-linear-gradient'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import { type IProduct } from '../interfaces/product'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

interface FavoritesItemCardProps {
  likedProducts: IProduct
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  likedProducts
}) => {
  const tabBarHeight = useBottomTabBarHeight()
  return (
    <View style={[styles.CardContainer, { marginBottom: tabBarHeight }]}>
      <ImageBackgroundInfo
        isPressable={false}
        EnableBackHandler={false}
        product={likedProducts}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}
      >
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{likedProducts.description}</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden'
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
    borderWidth: 1,
    borderColor: '#fcfcfc',
    overflow: 'hidden'
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  }
})

export default FavoritesItemCard
