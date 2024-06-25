import { Button, Card, Col, List, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductWrapper';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type Props = {}

const AddToCart = (props: Props) => {
    const productContext = useContext(ProductContext);
    const [totalAmount, setTotalAmount] = useState<number>();
    const [countOfItems, setCountOfItems] = useState<number>(0);

    useEffect(() => {
        // const getTotalAmounts: any = productContext?.AllCartProducts.map((item) => (item.amount))
        let calculateTotal: number = 0;
 
        setCountOfItems(0);

        if (productContext?.AllCartProducts) {
            for (let index = 0; index < productContext?.AllCartProducts.length; index++) {
                calculateTotal += +productContext?.AllCartProducts[index].amount * productContext?.AllCartProducts[index].quantity;
                setCountOfItems(index + 1);
            }
        }
        setTotalAmount(calculateTotal);
    }, [productContext?.AllCartProducts])

    const removeItemFromCart = (id: string) => {
        const updatedCartItem: any = productContext?.AllCartProducts.filter((item) => item.id != id);
        productContext?.updateToCart(updatedCartItem)
    }

    return (
        <>
            {
                productContext?.AllCartProducts.length === 0 ?
                    <div id="notFoundListingScreen" className="border border">
                        <h1> Cart is Empty </h1>
                        <br />
                        <Button type="primary" className='mx-4'><Link to="/day9/productListing">Add products from list </Link></Button>
                    </div>
                    :
                    <div id="addToCartScreen">
                        <div className='fw-bold'>Total Amount of {JSON.stringify(countOfItems)} product is : Rs. {JSON.stringify(totalAmount)}</div>
                        <br />
                        <div id="productCard" className='row mt-5'>
                            <Row gutter={16}>
                                {productContext?.AllCartProducts &&
                                    (productContext?.AllCartProducts).map((item) => (
                                        <Col span={8}>
                                            <Card title={item.name} extra={<a onClick={() => removeItemFromCart(item.id)}><CloseOutlined /></a>}>
                                                <div id='addToCartCard'>
                                                    <div id="imageInCardCart">
                                                        <img src={item.imageLink} width={310} height={200}></img>
                                                    </div>
                                                    <div id="contentInCardCart" className='mt-2'>
                                                        <p className='fw-bold'> QTY : {item.quantity}</p>
                                                        <p className="fw-bold"> Product Price : {item.amount}</p>
                                                    </div>
                                                </div>
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

export default AddToCart