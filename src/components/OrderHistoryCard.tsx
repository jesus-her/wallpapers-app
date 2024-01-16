import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import OrderItemCard from './OrderItemCard'
interface OrderHistoryCardProps {
  navigationHandler: any
  CartList: any
  CartListPrice: string
  OrderDate: string
}
const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate
}) => {
  // Función para formatear la fecha
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ]
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ]

    const dayOfWeek = days[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = months[date.getMonth()]

    return `${dayOfWeek}, ${dayOfMonth} de ${month}`
  }

  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
          <Text style={styles.HeaderTitle}>Fecha De Compra</Text>
          <Text style={styles.HeaderSubtitle}>{formatDate(OrderDate)}</Text>
        </View>
        <View style={styles.PriceContainer}>
          <Text style={styles.HeaderTitle}>Total</Text>
          <Text style={styles.HeaderPrice}>${CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList?.map((product: any, index: any) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={`${index}${product.id}`}
            onPress={() => {
              navigationHandler({
                id: product?.id
              })
            }}
          >
            <OrderItemCard product={product} />
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          width: '35%',
          height: 5,
          borderRadius: 10,
          backgroundColor: COLORS.primaryOrangeHex,
          alignSelf: 'center',
          opacity: 0.35,
          marginTop: 12
        }}
      ></View>
    </View>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING.space_10
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    alignItems: 'center'
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex
  },
  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex
  },
  PriceContainer: {
    alignItems: 'flex-end'
  },
  HeaderPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex
  },
  ListContainer: {
    gap: SPACING.space_20,
    flexDirection: 'column-reverse'
  }
})

export default OrderHistoryCard
