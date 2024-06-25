import { ProductAction, ProductState } from "./types";


export const productReducer = (state: ProductState, action: ProductAction) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.data]
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.data]
            }
        case 'UPDATE_TO_CART':
            return {
                ...state,
                cart: action.data
            }
        default:
            return state;
    }
}