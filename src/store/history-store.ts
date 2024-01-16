import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  DocumentData
} from 'firebase/firestore'
import { type IProduct } from '../interfaces/product'
import { create } from 'zustand'
import { FIREBASE_DB } from '../../firebaseConfig'

interface IOrderHistoryItem {
  OrderDate: string
  CartList: DocumentData[]
  CartListPrice: string
}

interface HistoryState {
  orderHistory: IOrderHistoryItem[]
  historyProducts: IProduct[]
  loading: boolean
  loadHistory: (uid: string) => Promise<void>
  addToOrderHistoryListFromCart: (
    products: IProduct[],
    cartPrice: number,
    uid: string
  ) => Promise<void>
}
const useHistoryStore = create<HistoryState>((set, get) => ({
  orderHistory: [],
  historyProducts: [],
  loading: false,

  loadHistory: async (uid: string) => {
    const userRef = doc(FIREBASE_DB, 'users', uid)

    set(state => ({ ...state, loading: true }))

    try {
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const orderHistoryData = userData.orderHistory || []

        const orderHistoryPromises = orderHistoryData.map(
          async (order: DocumentData) => {
            const cartListPromises = order.CartList.map(
              (productRef: DocumentData) =>
                //@ts-ignore
                getDoc(productRef)
            )
            const cartListDocs = await Promise.all(cartListPromises)
            const cartListData = cartListDocs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))

            // Aquí podríamos actualizar el estado de historyProducts directamente, pero lo haremos después de mapear todos los pedidos para evitar múltiples actualizaciones de estado
            return {
              OrderDate: order.OrderDate,
              CartList: cartListData,
              CartListPrice: order.CartListPrice
            }
          }
        )

        const orderHistory = await Promise.all(orderHistoryPromises)

        // Ahora que tenemos todos los pedidos, extraemos todos los productos para actualizar el estado de historyProducts
        const newHistoryProducts = orderHistory.flatMap(order => order.CartList)

        // Actualiza el estado una sola vez con los nuevos datos de orderHistory y historyProducts
        set(state => ({
          ...state,
          orderHistory: orderHistory as IOrderHistoryItem[],
          historyProducts: [
            ...state.historyProducts,
            ...newHistoryProducts
          ] as IProduct[],
          loading: false
        }))
      }
    } catch (error) {
      console.error('Error al cargar el historial de pedidos', error)
      set(state => ({ ...state, loading: false }))
    }
  },

  addToOrderHistoryListFromCart: async (
    products: IProduct[],
    cartPrice: number,
    uid: string
  ) => {
    const userRef = doc(FIREBASE_DB, 'users', uid)

    try {
      // Preparar los datos del nuevo pedido
      const newOrder = {
        OrderDate: new Date().toISOString(),
        CartList: products.map(product =>
          doc(FIREBASE_DB, 'products_data', product.id)
        ),
        CartListPrice: Number(cartPrice).toFixed(2)
      }

      // Actualiza el campo orderHistory en el documento del usuario
      await updateDoc(userRef, {
        orderHistory: arrayUnion(newOrder)
      })

      // console.log('Pedido agregado al historial con éxito')
    } catch (error) {
      console.error('Error al agregar el pedido al historial', error)
    }
  }
}))

export default useHistoryStore
