import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'

interface OrderItemCardProps {
  product: any
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ product }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.CardLinearGradient}
    >
      <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <View>
          <Image source={{ uri: product?.image_url }} style={styles.Image} />
          <TouchableOpacity style={styles.DownloadButton}>
            <Text style={styles.ButtonText}>Download</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.CardTitle}>{product?.name}</Text>
          <Text numberOfLines={4} style={styles.CardSubtitle}>
            {product?.description}
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 1,
    borderColor: '#fcfcfc',
    flex: 1
  },

  Image: {
    height: 100,
    maxWidth: 100,
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 1,
    borderColor: COLORS.primaryDarkGreyHex
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
    opacity: 0.7
  },
  DownloadButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    paddingHorizontal: 12,
    paddingVertical: 6,

    position: 'absolute',
    top: 6,
    right: 6
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex
  }
})

export default OrderItemCard
