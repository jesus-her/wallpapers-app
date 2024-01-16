import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING
} from '../theme/theme'
import { FlatList } from 'react-native'
import ProductCard from '../components/product-card'
import { Dimensions } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import useAuthStore from '../store/auth-store'
import { useCategoriesStore } from '../store/categories-store'
import { type Category } from '../interfaces/product'
import useFavouritesStore from '../store/favourites-store'
import ProductCardFull from '../components/product-card-full'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuthStore()
  const { getAllProducts, products } = useStore()
  const { loadFavourites } = useFavouritesStore()

  const {
    currentCategory,
    categories,
    getCategoriesList,
    setCurrentCategory,
    getInitialCategory
  } = useCategoriesStore()

  useEffect(() => {
    getAllProducts()
    getCategoriesList()
    if (user) {
      loadFavourites(user.uid)
    }
  }, [])
  const initialCategory = getInitialCategory()

  const filteredProducts = useMemo(() => {
    return currentCategory.id === null
      ? products
      : products?.filter(product => product.category.id === currentCategory.id)
  }, [products, currentCategory.id])

  const [searchText, setSearchText] = useState('')

  const ListRef: any = useRef<FlatList>()
  const tabBarHeight = useBottomTabBarHeight()

  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category)
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar style='dark' />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}images for you
        </Text>

        {/* Search Input */}
        {/* 
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              // searchCoffee(searchText)
            }}
          >
            <Feather
              style={styles.InputIcon}
              name='search'
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Image...'
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              // searchCoffee(text)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                // resetSearchInput()
              }}
            >
              <AntDesign
                style={styles.InputIcon}
                name='closecircle'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View> */}

        {/* Category Scroller */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {[initialCategory, ...categories].map((category, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}
            >
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  handleCategoryClick(category)
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0
                  })
                }}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    category.id == currentCategory.id
                      ? { color: COLORS.primaryOrangeHex }
                      : {}
                  ]}
                >
                  {category.name}
                </Text>
                {category.id == currentCategory.id ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Horizontal FlatList */}

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Images Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={filteredProducts}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={product => product.id}
          renderItem={({ item: product }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    id: product.id
                  })
                }}
              >
                <ProductCard product={product} />
              </TouchableOpacity>
            )
          }}
        />

        <Text style={styles.CoffeeBeansTitle}>
          Descubre las mejores imágenes
        </Text>

        {/* Vertical Products List */}

        {products.length === 0 && (
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Images Available</Text>
          </View>
        )}

        <View style={{ marginBottom: tabBarHeight }}>
          {products.map(product => {
            return (
              <TouchableOpacity
                style={[styles.FlatListContainer]}
                key={product.id}
                onPress={() => {
                  navigation.push('Details', {
                    id: product.id
                  })
                }}
              >
                <ProductCardFull product={product} />
              </TouchableOpacity>
            )
          })}
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
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    marginTop: 16
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center'
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginVertical: SPACING.space_20
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  CategoryScrollViewItem: {
    alignItems: 'center'
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex
  }
})

export default HomeScreen
