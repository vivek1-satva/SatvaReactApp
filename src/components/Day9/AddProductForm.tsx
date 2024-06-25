import React, { createContext, useContext, useState } from 'react'
import {
    Button,
    Form,
    Input,
    InputNumber,
    Space,
} from 'antd'
import "./day9.css"
import {  useProductContext } from './ProductWrapper';
import { ProductType } from './types';
import toast, { Toaster } from 'react-hot-toast';

type Props = {}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddProductForm = () => {
    const [form] = Form.useForm();
    
    const productContext = useProductContext();

    const onFinish = (values: ProductType) => {
        values.id = Math.random().toString();
        productContext?.saveProducts(values)
        toast.success("Product added to List")
        form.resetFields()
    }
    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
            <div id="addProductScreen">
                <h1>Add Product</h1>
                <Form id="addProductForm" variant="filled" labelCol={{ span: 4 }} wrapperCol={{ span: 24 }} layout="horizontal"
                    size='large' onFinish={onFinish} form={form}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter minimum 3 letter and maximum 250 letter product name!', min:3, max:250}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter 3 letter and maximum 250 letter product description!', min:3, max:250 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity" rules={[
                        { required: true, message: 'Please enter quantity!' },
                        { type: 'integer', message: 'Please enter integer in quantity!' },
                        // {pattern: /^[1-9]\d*$/, message: 'Please enter Valid quantity!' }
                        ]}>
                        <InputNumber min="1" max="10000"  style={{ width: 465 }}/>
                    </Form.Item>
                    <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter amount!' }]}>
                        <InputNumber min="1" max="100000000" precision={2} step={1}  style={{ width: 465 }}/>
                    </Form.Item>
                    <Form.Item label="Image Link" name="imageLink" rules={[{ required: true, message: 'Please enter image link!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type='primary' htmlType='submit'>Submit</Button>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            {/* <ProductContext.Provider value={product}>
            <Listing/>
        </ProductContext.Provider> */}
        </>
    )
}

export default AddProductForm