import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppActions, AppState, Book, BookActions, BookState } from './types'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from 'antd'
import { AppDispatch, RootState } from './Store'
import { addBook, removeBook, editBook } from './bookReducer'
import { fetchTodos } from "./todoReducer"
import "./index.css"

type Props = {}

const Index = (props: Props) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [fillForm, setFillForm] = useState<Book>();

  const books = useSelector((state: RootState) => state.books.books)
  const todo = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    form.setFieldsValue({
      id: fillForm?.id,
      name: fillForm?.name,
      description: fillForm?.description
    });
  }, [fillForm, form])

  const FillData = (id: string) => {
    console.log(id)
    setIsEdit(true)
    setFillForm(books.filter(book => book.id === id)[0])
  }

  const onFinish = (values: Book) => {
    if (!isEdit) {
      dispatch(addBook({ id: Math.random().toString(), name: values.name, description: values.description }));
      form.resetFields()
    }
    else {
      dispatch(editBook({ id: values.id, name: values.name, description: values.description }));
      setIsEdit(false)
      form.resetFields()
    }
  }
  return (
    <div id="addBookContainer">
      <div className='d-flex justify-content-between'>
        <h1>Add Book</h1>
        <Button type="primary" className='mt-3 mx-2' onClick={() => dispatch(fetchTodos())} style={{ float: 'right' }}>Click to call Api</Button>
      </div>
      <Form id="addProductForm" variant="filled" labelCol={{ span: 4 }} wrapperCol={{ span: 24 }} layout="horizontal"
        size='large' onFinish={onFinish} form={form}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter minimum 3 letter and maximum 250 letter book name!', min: 3, max: 250 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter 3 letter and maximum 250 letter product description!', min: 3, max: 250 }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          {
            <Button type='primary' htmlType='submit'>{isEdit ? 'Edit' : 'Submit'}</Button>
          }
        </Form.Item>
      </Form>
      <br /><br />
      <Row gutter={16}>
        {books.map(book => (
          <Col span={8}>
            <Card title={book.name} >
              <p className='fw-bold'> Description :{book.description}</p>
              <Space>
                <Button type="primary" onClick={() => FillData(book.id)}>Edit</Button>
                <Button type="primary" onClick={() => dispatch(removeBook(book.name))} danger>Delete</Button>
              </Space>
            </Card>
          </Col>
        ))
      }
      </Row>
    </div>
  )
}

export default Index

{/* <Button onClick={()=> dispatch(increment())}>+</Button>
  <p className='mx-2'>{counter}</p>
  <Button onClick={()=> dispatch(decrement())}>-</Button> */}