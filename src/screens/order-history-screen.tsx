import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'
import useHistoryStore from '../store/history-store'
import useAuthStore from '../store/auth-store'

const OrderHistoryScreen = ({ navigation }: any) => {
  const { loadHistory, orderHistory } = useHistoryStore()
  const tabBarHeight = useBottomTabBarHeight()
  const { user } = useAuthStore()
  const [showAnimation, setShowAnimation] = useState(false)

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', {
      index,
      id,
      type
    })
  }

  const buttonPressHandler = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 3000)
  }

  useEffect(() => {
    if (user) {
      loadHistory(user.uid)
    }
  }, [loadHistory])

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation && (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download2.json')}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[
            styles.ScrollViewInnerView,
            { marginBottom: tabBarHeight * 2, marginTop: 16 }
          ]}
        >
          <View style={styles.ItemContainer}>
            {orderHistory?.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {orderHistory?.map((order: any, index: any) => (
                  <OrderHistoryCard
                    key={`${index}${order.id}`}
                    navigationHandler={navigationHandler}
                    CartList={order.CartList}
                    CartListPrice={order.CartListPrice}
                    OrderDate={order.OrderDate}
                  />
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
  LottieAnimation: {
    flex: 1,
    backgroundColor: '#eee'
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
    gap: SPACING.space_30,
    flexDirection: 'column-reverse'
  }
})

export default OrderHistoryScreen
