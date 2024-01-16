import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'

interface PriceProps {
  price: string
  currency: string
}

interface PaymentFooterProps {
  price: PriceProps
  handlePay: any
  buttonTitle: string
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  handlePay,
  buttonTitle
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Precio</Text>
        <Text style={styles.PriceText}>
          $<Text style={styles.Price}>{price?.price} </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.PayButton} onPress={() => handlePay()}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20
  },
  PriceContainer: {
    alignItems: 'center',
    width: 100
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
    textTransform: 'uppercase'
  },
  Price: {
    color: COLORS.primaryWhiteHex
  },
  PayButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex
  }
})

export default PaymentFooter
