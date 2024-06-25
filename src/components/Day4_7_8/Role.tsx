import React, { useEffect, useState } from 'react'
import { allowOnlyAlphabet, invalidText } from '../utils/utils';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import GoToHome from './CommonComponent/GoToHome';

type Props = {}

type roleType = {
    id: string,
    roleName: string,
    description: string
}

type roleErrorType = {
    roleName: boolean,
    description: boolean
}

const RoleScreen = (props: Props) => {
    const roleObj: roleType = {
        id: '',
        roleName: '',
        description: ''
    }
    const [role, setRole] = useState(roleObj);
    const [roles,setRoles] = useState<roleType[] | []>([]);
    const [error, setError] = useState<roleErrorType>({
        roleName: true,
        description: true
    });
    const [hasError, setHasError] = useState(false);
    const [roleNameError,setRoleNameError] = useState("Invalid role name");

    const displayRoles = () => {
        console.log(role);
    }

    useEffect(() => {
        getRoles();
    }, []);

    //get roles
    const getRoles = async () => {
        try {
            let getRoleData = await axios.get(`http://localhost:3001/roles`);
            setRoles(getRoleData.data);
        }
        catch (e) {
            console.log(e)
        }
    }

    //post 
    const postRoleFromApi = () => {
        let postData: roleType = {
            id: Math.random().toString(),
            roleName: role.roleName,
            description: role.description
        }
        try {
            let roleExist = roles.find( (item) => item.roleName == postData.roleName);
            if(!roleExist){
                axios.post("http://localhost:3001/roles", postData);
                toast.success("Role added successfully");
                setRoles(prev => [...prev,postData]);
                setRole({
                    id : '',
                    roleName : '',
                    description : ''
                });
                setError({
                    roleName : false,
                    description : false
                });
                setHasError(false);
            }
            else{
                toast.error("Same role exist");
            }
        } catch (e) {
            toast.error("Something went wrong");
        }
    }

    const handleLoginSubmit = (event: React.FormEvent) => {
        displayRoles();
        event.preventDefault();

        if (Object.values(error).includes(true)) {
            setHasError(true);
            console.log("has error:", hasError);
        } else {
            let isNullValue = checkNullFieldAfterSubmit(); 
            if(isNullValue) { 
                setError({
                    roleName: true,
                    description: true
                });
                setHasError(true) 
            }
            else{ postRoleFromApi();}
        }
    }

    const checkNullFieldAfterSubmit = () => {
        if(role.roleName == '' || role.description == ''){
            return true;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRole((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "roleName") {

            if (invalidText(e.target.value)) {
                setError((prev) => { return { ...prev, roleName: true } })
                setRoleNameError("Role name is required")
            }
            else if(allowOnlyAlphabet(e.target.value)){
                setError((prev) => { return { ...prev, roleName: true } })
                setRoleNameError("Role name must contain only alphabet")
            }


            // if (invalidText(e.target.value)) {
            //     setError((prev) => {
            //         return { ...prev, roleName: true }
            //     });
            // }
            else {
                setError((prev) => {
                    return { ...prev, roleName: false }
                });
            }
        }
        if (e.target.name === "description") {
            if (invalidText(e.target.value)) {
                setError((prev) => {
                    return { ...prev, description: true }
                });
            }
            else {
                setError((prev) => {
                    return { ...prev, description: false }
                });
            }
        }

    }

    const resetRoles = () => {
        setRole({
            id: '',
            roleName: '',
            description: ''
        });
        setHasError(true);
        setError({
            roleName: true,
            description: true
        });
        console.log("Reset role form");
    }
    return (
        <div id="roleScreen">
            <GoToHome/>
            <Toaster position="top-center" reverseOrder={false} />
            <div id="roleScreen-card" className="form-card p-4 row">
                <h1 className='text-dark heading' id="roleHeading">Add Role</h1>
                <div className="col-12">
                    <label className="fw-bold mt-3">Role Name</label>
                    <input type='text' className='form-control' placeholder='Enter user role' onBlur={handleBlurChange} onChange={handleChange} value={role.roleName} name="roleName" id="roleName" />
                    {hasError && error.roleName ? (<p className="errorMsg">{roleNameError}</p>) : <p></p>}
                </div>
                <div className="col-12 mt-3">
                    <label className="fw-bold">Description</label>
                    <input type='text' className='form-control' placeholder='Enter user role description' onBlur={handleBlurChange} onChange={handleChange} value={role.description} name="description" id="description" />
                    {hasError && error.description ? (<p className="errorMsg">Invalid description field</p>) : <p></p>}
                </div>
                <div className="col-12">
                    <button type="button" onClick={handleLoginSubmit} className="btn btn-primary mt-4 loginAndSignUpBtn"> Add Role </button>
                    <button type="button" onClick={resetRoles} className="btn btn-danger mt-4 mx-2 resetBtn"> Reset </button>
                </div>
            </div>
        </div>
    )
}

export default RoleScreen