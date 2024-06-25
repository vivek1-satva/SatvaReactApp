import React, { useEffect, useState } from 'react'
import { Select, Table, TableColumnsType, notification } from 'antd'
import { Button, Form, Input } from 'antd';
import Swal from 'sweetalert2';
// import 'antd/dist/antd.css';
import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'antd/es/form/interface';
import axios from 'axios';
import toast from 'react-hot-toast';
import './user.css';

type Props = {}

type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    role: string
}

type UsersType = [UserType]

type RoleType = {
    id: string,
    roleName: string,
    description: string
}

type Roles = [RoleType]

const { Option } = Select;

const UserAntD = (props: Props) => {
    const userObj: UserType = {
        id: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: ''
    }
    const [user, setUser] = useState(userObj);
    const [showUser, setShowUser] = useState<UserType[] | []>([]);
    const [roleData, setRoleData] = useState<Roles | []>([]);
    const [isEdit, setIsEdit] = useState(false);

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const validateName = (_: RuleObject, value: StoreValue) => {
        const textRegex = /[A-Z a-z]/; 
        if (value && (value.length < 3 || value.length > 55)) {
            return Promise.reject(new Error('Name must be between 3 and 55 characters'));
        }
        else if(value && !textRegex.test(value)){
            return Promise.reject(new Error('Number not allowed'));
        }
        return Promise.resolve();
    };

    const validatePhone = (_: RuleObject, value: StoreValue) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // US phone format: (123) 456-7890
        if (value && !phoneRegex.test(value)) {
            return Promise.reject(new Error('Phone number must be in US format (123) 456-7890'));
        }
        return Promise.resolve();
    };

    interface DataType {
        id: React.Key;
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        role: string
    }

    //get role
    const getRolesfromApi = async () => {
        try {
            let getRoles = await axios.get("http://localhost:3001/roles");
            setRoleData(getRoles.data);
            console.log(getRoles.data)
        } catch (e) {
            console.log("Something went wrong");
        }
    }

    //get user
    const getUserFromApi = async () => {
        try {
            let getUser = await axios.get("http://localhost:3001/user");
            setShowUser(getUser.data);
        } catch (e) {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        getRolesfromApi();
        getUserFromApi();
    }, [])

    //edit user fill form
    const editUserFromApi = (currentUser: string | any) => {
        setIsEdit(true);
        const currentUserObj: UserType = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            phone: currentUser.phone,
            email: currentUser.email,
            role: currentUser.role
        }
        form.setFieldsValue(currentUser);
        setUser(currentUserObj);
    }

    // handle edit submit button
    // const handleEditSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     setIsEdit(true);
    //     putUserFromApi();
    // }

    //put user
    // const putUserFromApi = () => {
    //     let postData: UserType = {
    //         id: user.id,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         phone: user.phone,
    //         email: user.email,
    //         role: user.role
    //     }
    //     try {
    //         axios.put(`http://localhost:3001/user/${postData.id}`, postData);
    //         setIsEdit(false);
    //         form.resetFields();
    //         toast.success("User updated successfully");
    //         setUser({
    //             id: '',
    //             firstName: '',
    //             lastName: '',
    //             phone: '',
    //             email: '',
    //             role: ''
    //         })
    //         const updatedUser = showUser.map((item) => item.id === postData.id ? postData : item);
    //         setShowUser(updatedUser);
    //     } catch (e) {
    //         toast.error("Something went wrong");
    //     }
    // }

    //delete user
    
    const deleteUserFromApi = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "It will permanently deleted !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: any) => {
            if (result.isConfirmed) {
                try {
                    let data = axios.delete(`http://localhost:3001/user/${id}`);
                    let afterDeleteUser: UserType[] = showUser.filter((x) => x.id != id)
                    setShowUser(afterDeleteUser);
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    );
                } catch (e) {
                    Swal.fire(
                        'Deleted!',
                        'Something went wrong.',
                        'error'
                    );
                }
            }
        })
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (item, record, index) => <button className='btn btn-warning' onClick={() => editUserFromApi(item)}><i className="fa-solid fa-pen-to-square"></i></button>,
        },
        {
            title: 'Delete',
            key: 'edit',
            width: 100,
            render: (item) => <button className='btn btn-danger' onClick={() => deleteUserFromApi(item.id)}><i className="fa-solid fa-trash"></i></button>
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            if (!isEdit) {
                console.log(values)
                await axios.post('http://localhost:3001/user', values);
                notification.success({
                    message: 'Success',
                    description: 'User data saved successfully!',
                });
                form.resetFields();
                getUserFromApi();
            }
            else {
                console.log(values)
                axios.put(`http://localhost:3001/user/${values.id}`, values);
                notification.success({
                    message: 'Success',
                    description: 'User data updated successfully!',
                });
                const updatedUser = showUser.map((item) => item.id === values.id ? values : item);
                setShowUser(updatedUser);
                setIsEdit(false);
                form.resetFields();
            }

        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'There was an error saving the user data.',
            });
        }  
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div id="userScreen">
            <div id="userScreen-card" className="form-card px-4">
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <Form.Item name="id"><Input type='hidden' /></Form.Item>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        { required: true },
                        { validator: validateName }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        { required: true },
                        { validator: validateName }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        { required: true },
                        { validator: validatePhone }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true },
                        { type: 'email' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true }]}
                >
                    <Select>
                        {user.role == "" ? (<Option value="" className="fw-bold" selected>Select Role</Option>)
                            : (<Option value={user.role} selected>{user.role}</Option>)
                        }
                        {
                            (roleData).map((item) => (
                                item.roleName == user.role ? <></>
                                    : <Option value={item.roleName}>{item.roleName}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    {/* <Button type="primary" htmlType="submit">
                        Submit
                    </Button> */}
                    <Button type="primary" htmlType="submit">{!isEdit ? 'Add User' : 'Edit User'}  </Button>
                </Form.Item>
            </Form>
            </div>
            <br />
            <div id="userTable" className='mt-5 m-4'>
                <Table rowSelection={rowSelection} dataSource={showUser} columns={columns} />
            </div>
        </div>
    )
}

export default UserAntD