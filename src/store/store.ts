import { create } from 'zustand'
import { produce } from 'immer'
import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { type IProduct } from '../interfaces/product'

interface State {
  products: IProduct[]
  loading: boolean
  CartPrice: number
  CartList: IProduct[]
  OrderHistoryList: IProduct[]
  addToCart: (cartItem: any) => void
  addToCartGpt: (product: IProduct) => void

  getAllProducts: () => Promise<void>
  calculateCartPrice: () => void

  incrementCartItemQuantity: (id: string, size: string) => void
  decrementCartItemQuantity: (id: string, size: string) => void
  addToOrderHistoryListFromCart: () => void
}

export const useStore = create<State>(
  // persist(
  (set, get) => ({
    products: [],
    loading: false,
    CartPrice: 0,
    CartList: [],
    OrderHistoryList: [],
    addToCart: (cartItem: IProduct) =>
      set(
        produce(state => {
          let found = false
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == cartItem.id) {
              found = true
              let size = false
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (
                  state.CartList[i].prices[j].size == cartItem.prices[0].size
                ) {
                  size = true
                  state.CartList[i].prices[j].quantity++
                  break
                }
              }
              if (size == false) {
                state.CartList[i].prices.push(cartItem.prices[0])
              }
              state.CartList[i].prices.sort((a: any, b: any) => {
                if (a.size > b.size) {
                  return -1
                }
                if (a.size < b.size) {
                  return 1
                }
                return 0
              })
              break
            }
          }
          if (found == false) {
            state.CartList.push(cartItem)
          }
        })
      ),
    addToCartGpt: (cartItem: IProduct) =>
      set(
        produce(state => {
          let foundProduct = state.CartList.find(
            (item: { id: string }) => item.id === cartItem.id
          )

          if (foundProduct) {
            let foundPrice = foundProduct.prices.find(
              (p: { size: string }) => p.size === cartItem.prices[0].size
            )
            if (foundPrice) {
              foundPrice.quantity++
            } else {
              // Añade solo el primer precio con 'quantity' si no se encontró el tamaño
              foundProduct.prices.push({ ...cartItem.prices[0], quantity: 1 })
            }
          } else {
            // Agrega el producto nuevo con solo el primer precio y 'quantity' en 1
            state.CartList.push({
              ...cartItem,
              prices: [{ ...cartItem.prices[0], quantity: 1 }]
            })
          }
        })
      ),

    getAllProducts: async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'products_data'))
        const allProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        // @ts-ignore
        set({ products: allProducts })
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    },
    calculateCartPrice: () =>
      set(
        produce(state => {
          let totalPrice = 0
          for (let i = 0; i < state.CartList.length; i++) {
            let tempPrice = 0
            for (let j = 0; j < state.CartList[i].prices.length; j++) {
              tempPrice =
                tempPrice +
                parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity
            }
            state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString()
            totalPrice = totalPrice + tempPrice
          }
          state.CartPrice = totalPrice.toFixed(2).toString()
        })
      ),

    incrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce(state => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size == size) {
                  state.CartList[i].prices[j].quantity++
                  break
                }
              }
            }
          }
        })
      ),
    decrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce(state => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size == size) {
                  if (state.CartList[i].prices.length > 1) {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--
                    } else {
                      state.CartList[i].prices.splice(j, 1)
                    }
                  } else {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--
                    } else {
                      state.CartList.splice(i, 1)
                    }
                  }
                  break
                }
              }
            }
          }
        })
      ),
    addToOrderHistoryListFromCart: () =>
      set(
        produce(state => {
          let temp = state.CartList.reduce(
            (accumulator: number, currentValue: any) =>
              accumulator + parseFloat(currentValue.ItemPrice),
            0
          )
          if (state.OrderHistoryList.length > 0) {
            state.OrderHistoryList.unshift({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString()
            })
          } else {
            state.OrderHistoryList.push({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString()
            })
          }
          state.CartList = []
        })
      )
  })
  //   {
  //     name: 'coffee-app',
  //     storage: createJSONStorage(() => AsyncStorage)
  //   }
  // )
)
