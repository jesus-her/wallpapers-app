import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import { useStore } from '../store/store'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import PaymentFooter from '../components/PaymentFooter'

const DetailsScreen = ({ navigation, route }: any) => {
  const { addToCartGpt, calculateCartPrice } = useStore()
  const productId = route.params.id
  const products = useStore((state: any) => state.products)
  const product = products.find((p: any) => p.id === productId)

  const [price, setPrice] = useState(product?.prices[0])
  const [fullDesc, setFullDesc] = useState(false)

  const BackHandler = () => {
    navigation.pop()
  }

  const addToCartHandler = (product: any) => {
    if (!product || !product.prices || product.prices.length === 0) {
      console.error('Producto inválido o sin precios')
      return
    }

    const modifiedProduct = {
      ...product,
      prices: [{ ...price, quantity: 1 }] // Usa el precio seleccionado
    }

    addToCartGpt(modifiedProduct)
    calculateCartPrice()
    navigation.navigate('Cart')
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          product={product}
          BackHandler={BackHandler}
        />

        <View style={styles.FooterInfoArea}>
          {/* <Text style={styles.ItemTitleText}>{product?.name}</Text> */}

          <Text style={styles.InfoTitle}>Descripción</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev)
              }}
            >
              <Text style={styles.DescriptionText}>{product?.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev)
              }}
            >
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {product?.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Dimensiones</Text>
          <View style={styles.SizeOuterContainer}>
            {product?.prices?.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data)
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price?.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex
                  }
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: FONTSIZE.size_16,
                      color:
                        data.size == price?.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex
                    }
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle='Comprar Ahora'
          handlePay={() => {
            addToCartHandler(product)
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between'
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
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryWhiteHex,
    textTransform: 'capitalize'
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
    opacity: 0.5
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: SPACING.space_20
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    // height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium
  }
})

export default DetailsScreen
