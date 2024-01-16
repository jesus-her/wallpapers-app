import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import { AntDesign } from '@expo/vector-icons'
import { IProduct } from '@/interfaces/product'

interface CartItemProps {
  product: IProduct
  incrementCartItemQuantityHandler: any
  decrementCartItemQuantityHandler: any
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler
}) => {
  return (
    <View>
      {product.prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CartItemLinearGradient}
        >
          <View style={styles.CartItemRow}>
            <ImageBackground
              source={{ uri: product.image_url }}
              style={styles.CartItemImage}
              resizeMode='cover'
            />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={styles.CartItemTitle}>{product.name}</Text>
              </View>
              <Text numberOfLines={5} style={{ opacity: 0.5 }}>
                {product.description}
              </Text>
            </View>
          </View>
          {product.prices.map((price: any, index: any) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}
            >
              <View style={styles.CartItemSizeValueContainer}>
                <Text style={styles.SizeCurrency}>
                  $<Text style={styles.SizePrice}>{price.price} </Text>
                  <Text
                    style={{
                      fontSize: FONTSIZE.size_10,
                      textTransform: 'uppercase'
                    }}
                  >
                    {price.currency}
                  </Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(product.id, price.size)
                  }}
                >
                  <AntDesign
                    name='minus'
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {price.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(product.id, price.size)
                  }}
                >
                  <AntDesign
                    name='plus'
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CartItemSingleLinearGradient}
        >
          <View>
            {/* <Image
              source={{ uri: imageUrl_square }}
              style={styles.CartItemSingleImage}
            /> */}
            <ImageBackground
              source={{ uri: product.image_url }}
              style={styles.CartItemSingleImage}
              resizeMode='cover'
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text style={styles.CartItemTitle}>{product.name}</Text>
              {/* <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text> */}
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: FONTSIZE.size_12
                    }
                  ]}
                >
                  {product.prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                $
                <Text style={styles.SizePrice}>
                  {' '}
                  {product.prices[0].price}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: FONTSIZE.size_10,
                    textTransform: 'uppercase'
                  }}
                >
                  {product.prices[0].currency}
                </Text>
              </Text>
              {/* <Text style={styles.SizeCurrency}>
                {prices[0].currency}
                <Text style={styles.SizePrice}> {prices[0].price}</Text>
              </Text> */}
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(
                    product.id,
                    product.prices[0].size
                  )
                }}
              >
                <AntDesign
                  name='minus'
                  color={COLORS.primaryBlackHex}
                  size={FONTSIZE.size_12}
                />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {product.prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(
                    product.id,
                    product.prices[0].size
                  )
                }}
              >
                <AntDesign
                  name='plus'
                  color={COLORS.primaryBlackHex}
                  size={FONTSIZE.size_12}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden'
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between'
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    textTransform: 'capitalize'
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
    marginBottom: SPACING.space_16
  },
  CartItemtagContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex
  },
  CartItemtagText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SizeBox: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    flex: 1,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    width: '100%'
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryOrangeHex
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25
  },
  CartItemSingleImage: {
    // height: 100,
    width: 120,
    flex: 1,
    // height: 120,
    borderRadius: BORDERRADIUS.radius_15,
    overflow: 'hidden'
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})

export default CartItem
