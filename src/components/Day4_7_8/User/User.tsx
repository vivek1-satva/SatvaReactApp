import React, { useEffect, useRef, useState } from 'react'
import {  allowOnlyAlphabet, checkPhone, formatToPhone, invalidEmail, invalidFieldLength, invalidText } from '../../utils/utils';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Table, TableColumnsType } from 'antd'
import type { FormProps } from 'antd';
import Swal from 'sweetalert2';
import GoToHome from '../CommonComponent/GoToHome';

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

type UserErrorType = {
    firstName: boolean,
    lastName: boolean,
    phone: boolean,
    email: boolean,
    role: boolean
}

const UserScreen = (props: Props) => {
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

    const [error, setError] = useState<UserErrorType>({
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        role: true
    });
    const [hasError, setHasError] = useState(false);
    const [firstNameError, setFirstNameError] = useState("Invalid first name field");
    const [lastNameError, setLastNameError] = useState("Invalid last name field");
    const [roleData, setRoleData] = useState<Roles | []>([]);

    const [isEdit, setIsEdit] = useState(false);

    //get role
    const getRolesfromApi = async () => {
        try {
            let getRoles = await axios.get("http://localhost:3001/roles");
            setRoleData(getRoles.data);
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

    const displayUser = () => {
        console.log(user);
    }

    //post user
    const postUserFromApi = () => {
        let postData: UserType = {
            id: Math.random().toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role
        }
        try {
            let data = axios.post("http://localhost:3001/user", postData);
            toast.success("User added successfully");
            setUser({
                id: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                role: ''
            })
            setShowUser(prev => [...prev, postData])
        } catch (e) {
            toast.error("Something went wrong");
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        displayUser();
        if (Object.values(error).includes(true)) {
            setHasError(true);
            console.log("has error:", hasError);
        } else {
            postUserFromApi();
        }
    }

    //edit user fill form
    const editUserFromApi = (currentUser: string | any) => {
        setIsEdit(true);
        setHasError(false);
        setError({
            firstName: false,
            lastName: false,
            phone: false,
            email: false,
            role: false
        });
        console.log(currentUser)
        const currentUserObj: UserType = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            phone: currentUser.phone,
            email: currentUser.email,
            role: currentUser.role
        }
        setUser(currentUserObj);
    }

    // handle edit submit button
    const handleEditSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (Object.values(error).includes(true)) {
            setHasError(true);
            console.log("has error:", hasError);
            setIsEdit(true);
        } else {
            putUserFromApi();
        }
    }

    //put user
    const putUserFromApi = async () => {
        let postData: UserType = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role
        }
        try {
            let getId = showUser.find(item => item.id == postData.id);
            if(getId){
                await axios.put(`http://localhost:3001/user/${postData.id}`, postData);
                setIsEdit(false);
                toast.success("User updated successfully");
                setUser({
                    id: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    role: ''
                })
                const updatedUser = showUser.map((item) => item.id === postData.id ? postData : item);
                setShowUser(updatedUser);
            }
            else{
                setIsEdit(false);
                toast.error("User not found");
                setUser({
                    id: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    role: ''
                })
            }
        } catch (e) {
            setUser({
                id : '',
                firstName : '',
                lastName : '',
                email : '',
                phone : '',
                role : ''
            });
            setIsEdit(false);
            toast.error("Something went wrong");
        }
    }

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
        }).then((result:any) => {
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

    const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "firstName") {
            if (invalidText(e.target.value) || invalidFieldLength(e.target.value)) {
                setError((prev) => { return { ...prev, firstName: true } })
                setFirstNameError("First name is required and min 3 and max 55 allowed")
            }
            else if(allowOnlyAlphabet(e.target.value)){
                setError((prev) => { return { ...prev, firstName: true } })
                setFirstNameError("First name must contain only alphabet")
            }
            else {
                setError((prev) => { return { ...prev, firstName: false } })
            }
        }
        if (e.target.name === "lastName") {
            if (invalidText(e.target.value) || invalidFieldLength(e.target.value)) {
                setError((prev) => { return { ...prev, lastName: true } })
                setLastNameError("Last name is required and min 3 and max 55 allowed")
            }
            else if(allowOnlyAlphabet(e.target.value)){
                setError((prev) => { return { ...prev, lastName: true } })
                setLastNameError("Last name must contain only alphabet")
            }
            else {
                setError((prev) => { return { ...prev, lastName: false } })
            }
        }
        if (e.target.name === "email") {
            if (invalidText(e.target.value) || invalidEmail(e.target.value)) {
                setError((prev) => {
                    return { ...prev, email: true }
                });
            }
            else {
                setError((prev) => {
                    return { ...prev, email: false }
                });
            }
        }
        if (e.target.name === "phone") {
            if (invalidText(e.target.value) || checkPhone(e.target.value)) {
                setError((prev) => {
                    return { ...prev, phone: true }
                });
            }
            else {
                setError((prev) => {
                    return { ...prev, phone: false }
                });
            }
        }
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "role") {
            if (e.target.value == "") {
                setError((prev) => {
                    return { ...prev, role: true }
                });
            }
            else {
                setError((prev) => {
                    return { ...prev, role: false }
                });
                setUser((prevState) => ({
                    ...prevState,
                    role: e.target.value
                }));
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const resetUser = () => {
        setUser({
            id: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            role: ''
        })
        setHasError(true);
        setError({
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            role: true
        });

    }

    interface DataType {
        id: React.Key;
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        role: string
    }

    const columns: TableColumnsType<DataType> = [
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
    const hasSelected = selectedRowKeys.length > 0;

return (
    <div id="userScreen">
        <GoToHome/>
        <Toaster position="top-center" reverseOrder={false} />
        <form>
                <div id="userScreen-card" className="form-card px-4 row">
                    <h1 className='text-dark heading mt-0' id="userHeading">Add User</h1>
                    <div className="col-12">
                        <label className="fw-bold">First Name</label>
                        <input type='text' className='form-control' name="firstName" onBlur={handleBlurChange} onChange={handleChange} value={user.firstName} id="firstName" />
                        {hasError && error.firstName ? (<p className="errorMsg">{firstNameError}</p>) : <p></p>}
                    </div>
                    <div className="col-12">
                        <label className="fw-bold">Last Name</label>
                        <input type='text' className='form-control' name="lastName" onBlur={handleBlurChange} onChange={handleChange} value={user.lastName} id="lastName" />
                        {hasError && error.lastName ? (<p className="errorMsg">{lastNameError}</p>) : <p></p>}
                    </div>
                    <div className="col-12">
                        <label className="fw-bold">Email</label>
                        <input type='email' className='form-control' name="email" onBlur={handleBlurChange} onChange={handleChange} value={user.email} id="email" />
                        {hasError && error.email ? (<p className="errorMsg">Invalid email field</p>) : <p></p>}
                    </div>
                    <div className="col-12">
                        <label className="fw-bold">Phone</label>
                        <input type='text' className='form-control' name="phone" maxLength={16} onKeyDown={formatToPhone} onBlur={handleBlurChange} onChange={handleChange} value={user.phone} id="phone" />
                        {hasError && error.phone ? (<p className="errorMsg">Invalid phone field</p>) : <p></p>}
                    </div>
                    <div className="col-12 mt-1">
                    <label className="fw-bold">Role</label>
                        <select className="form-select" name="role" onBlur={handleSelectChange}>
                            {user.role == "" ? (<option value="" className="fw-bold" selected>Select Role</option>)
                                : (<option value={user.role} selected>{user.role}</option>)
                            }
                            {
                                (roleData).map((item) => (
                                    item.roleName == user.role ? <></>
                                        : <option value={item.roleName}>{item.roleName}</option>
                                ))
                            }
                        </select>
                        {hasError && error.role ? (<p className="errorMsg">Select role field</p>) : <p></p>}
                    </div>
                    <div className="col-12">
                        {
                            !isEdit ? <button type="submit" onClick={handleSubmit} className="btn btn-primary loginAndSignUpBtn"> Add User </button> :
                                <button type="submit" onClick={handleEditSubmit} className="btn btn-primary loginAndSignUpBtn"> Edit User </button>
                        }

                        <button type="button" onClick={resetUser} className="btn btn-danger mx-2 resetBtn"> Reset </button>
                    </div>
                </div>
            </form>
        <br />
        <div id="userTable" className='mt-5 m-4'>
            <Table rowSelection={rowSelection} dataSource={showUser} columns={columns} />
        </div>
    </div>
)
    }

export default UserScreen


{/* <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (showUser).map((item, index) => (
                                <UserTableBody userData={item} key={item.id} editUserFromApi={editUserFromApi} deleteUserFromApi={deleteUserFromApi} />
                            ))
                        }
                    </tbody>
                </table> */}