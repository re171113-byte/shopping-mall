import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      preferences: {
        styles: [],
        priceRange: null,
        favoritebrands: [],
      },
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      setPreferences: (preferences) => set({ preferences }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: 'user-storage' }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, options = {}) => {
        const items = get().items
        const existingIndex = items.findIndex(
          (item) => item.productId === product.id &&
                    JSON.stringify(item.options) === JSON.stringify(options)
        )

        if (existingIndex > -1) {
          const newItems = [...items]
          newItems[existingIndex].quantity += quantity
          set({ items: newItems })
        } else {
          set({
            items: [...items, {
              productId: product.id,
              product,
              quantity,
              options,
            }]
          })
        }
      },
      removeItem: (index) => {
        set({ items: get().items.filter((_, i) => i !== index) })
      },
      updateQuantity: (index, quantity) => {
        const newItems = [...get().items]
        newItems[index].quantity = quantity
        set({ items: newItems })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.salePrice || item.product.price) * item.quantity
        }, 0)
      },
    }),
    { name: 'cart-storage' }
  )
)

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().items.find((item) => item.id === product.id)) {
          set({ items: [...get().items, product] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) })
      },
      isWishlisted: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      toggleWishlist: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
    }),
    { name: 'wishlist-storage' }
  )
)
