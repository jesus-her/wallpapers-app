import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import type { IProduct } from '../interfaces/product'
import { useStore } from '../store/store'
import FavouriteButton from './favourite-button'
import useFavouritesStore from '../store/favourites-store'

const CARD_WIDTH = Dimensions.get('window').width * 0.3

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCartGpt, calculateCartPrice } = useStore()
  const { isFavourited } = useFavouritesStore()
  const favourite = isFavourited(product?.id)

  const handleAddToCart = (product: IProduct) => {
    addToCartGpt(product)
    calculateCartPrice()
    ToastAndroid.showWithGravity(
      `${product.name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground
        source={{ uri: product.image_url }}
        style={styles.CardImageBG}
        resizeMode='cover'
      ></ImageBackground>
      <Text style={styles.CardTitle}>{product.name}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{product.prices[0].price}</Text>
        </Text>
        <TouchableOpacity onPress={() => handleAddToCart(product)}>
          <View
            style={[
              styles.IconBG,
              { backgroundColor: COLORS.primaryOrangeHex }
            ]}
          >
            <Entypo name='plus' size={22} color='white' />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8
  },
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 1,
    borderColor: '#fcfcfc',
    overflow: 'hidden'
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden'
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_4,
    paddingHorizontal: SPACING.space_8,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex
  }
})

export default ProductCard
