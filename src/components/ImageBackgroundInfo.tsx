import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image
} from 'react-native'
import GradientBGIcon from './GradientBGIcon'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import FavouriteButton from './favourite-button'
import { type IProduct } from '../interfaces/product'

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean
  BackHandler?: any
  product: IProduct
  isPressable?: boolean
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  BackHandler,
  product,
  isPressable = true
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={isPressable ? openModal : () => {}}
      >
        <ImageBackground
          source={{ uri: product?.image_url }}
          style={styles.ItemBackgroundImage}
        >
          {EnableBackHandler ? (
            <View style={styles.ImageHeaderBarContainerWithBack}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler()
                }}
              >
                <GradientBGIcon
                  name='left'
                  color={COLORS.primaryLightGreyHex}
                  size={FONTSIZE.size_16}
                >
                  <AntDesign
                    name='left'
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryWhiteHex}
                  />
                </GradientBGIcon>
              </TouchableOpacity>
              <FavouriteButton product={product} />
            </View>
          ) : (
            <View style={styles.ImageHeaderBarContainerWithoutBack}>
              <FavouriteButton product={product} />
            </View>
          )}

          <View style={styles.ImageInfoOuterContainer}>
            <View style={styles.ImageInfoInnerContainer}>
              <View style={styles.InfoContainerRow}>
                <View>
                  <Text style={styles.ItemTitleText}>{product?.name}</Text>
                </View>
                <View style={styles.ItemPropertiesContainer}>
                  <View style={styles.ProperFirst}>
                    <MaterialIcons
                      name='category'
                      size={FONTSIZE.size_24}
                      color={COLORS.primaryOrangeHex}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          activeOpacity={0}
          onPress={closeModal}
          style={styles.modalView}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            {/* Icon to close */}
            <AntDesign name='closecircle' size={24} color='white' />
          </TouchableOpacity>
          <Image
            source={{ uri: product?.image_url }}
            style={styles.fullImage}
          />
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between'
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  ImageInfoOuterContainer: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_16,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25
  },
  ImageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryBlackHex,
    textTransform: 'capitalize'
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_8
  },
  ProperFirst: {
    height: 45,
    width: 45,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex
  },
  PropertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex
  },
  PropertyTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2 + SPACING.space_4
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center'
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'relative'
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  closeButton: {
    // estilos para tu botón de cerrar
    position: 'absolute',
    bottom: SPACING.space_30,
    zIndex: 11
  }
})

export default ImageBackgroundInfo
