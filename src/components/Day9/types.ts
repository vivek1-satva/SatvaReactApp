
export type ProductType = {
    id:string,
    name: string,
    description: string,
    quantity: number,
    amount: string,
    imageLink: string
}

export type ProductState ={
    products: ProductType[]
    cart:   CartType[]
}

export type CartType = {
    id:string,
    name: string,
    amount: string,
    quantity: number,
    imageLink: string
}

export type ProductAction = {
    type:'ADD_PRODUCT',
    data:ProductType
} | {
    type:'ADD_TO_CART',
    data:CartType
} | {
    type:'UPDATE_TO_CART',
    data:CartType[]
}