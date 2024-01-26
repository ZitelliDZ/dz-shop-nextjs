import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface GetSummaryInfoInterface {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInfo: () => GetSummaryInfoInterface;

  addProductToCart: (product: CartProduct) => void;
  removeProduct: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
        getSummaryInfo: () => {
            const { cart } = get();
            let subTotal = cart.reduce( (acc, item) => acc + item.quantity * item.price, 0);
            const tax = subTotal * 0.15;
            const total = subTotal + tax;
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
            return { subTotal, tax, total, totalItems };
        },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //1. revisar si el producto ya existe en el carrito
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        //2. si no existe, agregarlo al carrito
        if (!productInCart) {
          set((state) => ({
            cart: [...state.cart, product],
          }));
          return;
        }
        //3. si existe, actualizar la cantidad
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProduct });
      },
      removeProduct: (product: CartProduct) =>{
        const { cart } = get();
        const updatedCartProduct = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProduct });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) =>{
        const { cart } = get();
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProduct });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
      //skipHydration: true,
    }
  )
);
