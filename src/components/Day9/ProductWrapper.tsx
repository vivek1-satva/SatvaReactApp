import React, { createContext, useContext, useReducer, useState } from 'react'
import {  productReducer } from './ProductReducer';
import { CartType, ProductState, ProductType } from './types';

type Props = {}

// type ProductsType = {
//   id?: string;
//   name: string,
//   description: string,
//   quantity: string,
//   amount: string,
//   imageLink: string
// }

type ProductContextType = {
  AllProducts: ProductType[];
  AllCartProducts: CartType[];
  saveProducts: (product: ProductType) => void;
  addToCart: (cart : CartType) => void;
  updateToCart: (cart : CartType[]) => void;
} | undefined;
export const initialState :ProductState = {
  products:[],
  cart:[] 
}

export const ProductContext = createContext<ProductContextType>(undefined)

const ProductWrapper = ({ children }: { children: React.ReactElement }) => {

  const [state,dispatch] = useReducer(productReducer, initialState)

  const saveProducts = (product:ProductType)=>{
    dispatch({
      type: 'ADD_PRODUCT',
      data:product
    })
   }
   const addToCart = (cart:CartType)=>{
    dispatch({
      type:'ADD_TO_CART',
      data:cart
    })
   }
   const updateToCart = (cart:CartType[])=>{
    dispatch({
      type:'UPDATE_TO_CART',
      data:cart
    })
   }
  return (
    <ProductContext.Provider value={{ 
      AllProducts: state.products, 
      AllCartProducts: state.cart,
        saveProducts,
        addToCart,
        updateToCart
        }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext(){
  return useContext(ProductContext)
}

export default ProductWrapper