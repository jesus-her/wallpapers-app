import React from 'react'
import useFavouritesStore from '../store/favourites-store' // Actualiza esta ruta
import { type IProduct } from '../interfaces/product'
import { TouchableOpacity } from 'react-native'
import GradientBGIcon from './GradientBGIcon'
import { FontAwesome } from '@expo/vector-icons'
import { COLORS, FONTSIZE } from '../theme/theme'
import useAuthStore from '../store/auth-store'

const FavouriteButton = ({
  product,
  disabled
}: {
  product: IProduct
  disabled?: boolean
}) => {
  const { addProductToFavourites, removeProductFromFavourites, isFavourited } =
    useFavouritesStore()
  const favourite = isFavourited(product?.id)
  const { user } = useAuthStore()

  const toggleFavourite = () => {
    if (user) {
      if (favourite) {
        removeProductFromFavourites(product?.id, user.uid)
      } else {
        addProductToFavourites(product, user.uid)
      }
    }
  }

  return (
    <TouchableOpacity onPress={toggleFavourite}>
      <GradientBGIcon
        name='like'
        color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      >
        <FontAwesome
          name='heart'
          size={FONTSIZE.size_16}
          color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
        />
      </GradientBGIcon>
    </TouchableOpacity>
  )
}

export default FavouriteButton
