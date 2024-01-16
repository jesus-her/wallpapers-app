import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import FavoritesItemCard from '../components/FavoritesItemCard'
import useAuthStore from '../store/auth-store'
import useFavouritesStore from '../store/favourites-store'

const FavoritesScreen = ({ navigation }: any) => {
  const tabBarHeight = useBottomTabBarHeight()
  const { likedProducts } = useFavouritesStore()

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[
            styles.ScrollViewInnerView,
            { marginBottom: tabBarHeight, marginTop: 16 }
          ]}
        >
          <View style={styles.ItemContainer}>
            {likedProducts.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {likedProducts.map((product: any, index: number) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.push('Details', {
                        id: product.id
                      })
                    }}
                    key={`${product.id}${index}`}
                  >
                    <FavoritesItemCard likedProducts={product} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
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
    flexGrow: 1
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  ItemContainer: {
    flex: 1
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20
  }
})

export default FavoritesScreen
