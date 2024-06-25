import { Alert, Button, Card, Col, Row, Space, Table, TableColumnsType } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductWrapper';
import { CartType } from './types';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { ProductContext } from './AddProductForm';

type Props = {}

type ProductsType = {
  id?: string;
  name: string,
  description: string,
  quantity: string,
  amount: string,
  imageLink: string
}

const Listing = (props: Props) => {
  const productContext = useContext(ProductContext);

  const HandleAddToCartBtn = (item: CartType) => {
    let newCartItem = structuredClone(item);

    const getCurrentCartItem: CartType[] | undefined = productContext?.AllCartProducts.filter((x) => x.id === newCartItem.id);

    if (getCurrentCartItem?.length == 0) {
      newCartItem.quantity = 1;
      productContext?.addToCart(newCartItem)
    }
    else {
      if (getCurrentCartItem) {
        if (getCurrentCartItem[0].quantity >= item.quantity) {
          toast.error("Maximum quantity reached");
        }
        else {
          getCurrentCartItem[0].quantity++;
        }
      }
    }
    console.log('cart', productContext?.AllCartProducts)
    console.log('all', productContext?.AllProducts)
  }

  return (
    <>
      {productContext?.AllProducts.length === 0 ?
        <div id="notFoundListingScreen" className="border border">
          <h1>Product not found</h1>
          <br />
          <Button type="primary" className='mx-5'><Link to="/day9">Go to Add Products</Link></Button>         
        </div>

        :

        <div id="listingScreen">
          <Toaster position="top-center" reverseOrder={false} />
          <div id="productCard" className='row'>
            <Row gutter={16}>
              {productContext?.AllProducts &&
                (productContext?.AllProducts).map((item) => (
                  <Col span={8}>
                    <Card title={item.name} >
                      <img src={item.imageLink} style={{ width: 300, height: 200 }}></img>
                      <p className='fw-bold'> Amount : {item.amount}</p>
                      <p className='fw-bold'> QTY : {item.quantity}</p>
                      <p className='fw-bold'> Description : {item.description}</p>
                      <Button type="primary" onClick={() => HandleAddToCartBtn(item)}>Add to cart</Button>
                    </Card>
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>

      }
    </>
  )
}

export default Listing