import React, { useState } from 'react'
import './day4.css';
import { Link } from 'react-router-dom';
import { invalidEmail, invalidText } from '../utils/utils';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import GoToHome from './CommonComponent/GoToHome';
import { jwtDecode } from 'jwt-decode';

type Props = {}

const baseUrl = process.env.REACT_APP_BASE_URL;

type loggedUserType = {
    email: string,
    password: string
}

type LoginFormError = {
    email: boolean,
    password: boolean
}

const Login = (props: Props) => {
    const loginUserObj: loggedUserType = {
        email: '',
        password: ''
    }
    const [loginUser, setLoginUser] = useState(loginUserObj);
    const [error, setError] = useState<LoginFormError>({
        email: true,
        password: true
    });
    const [hasError, setHasError] = useState(false);

    const handleLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (Object.values(error).includes(true)) {
            setHasError(true);
            console.log("has error:", hasError);
        }
        else{
            postSignUpFromApi()
        }
    }

    //post sign up
    const postSignUpFromApi = () => {
        const signUpUserObj: loggedUserType = {
            email: loginUser.email,
            password: loginUser.password,
        }

        console.log(signUpUserObj)
        try {
            axios.post(`${baseUrl}/Authentication/login`, signUpUserObj).then(function (response) {
                console.log(response);

                if (response.data.responseStatus == 1) {
                    toast.success(response.data.message)
                    localStorage.setItem("accessToken",response.data.result.accessToken);
                    interface DecodedToken {
                        name: string;
                        role: string;
                        // Include any other properties your token might have
                        [key: string]: any;
                      }
                    
                    const a = jwtDecode<DecodedToken>(response.data.result.accessToken);
                    console.log(a.role)
                    setLoginUser({
                        email: '',
                        password: ''    
                    });
                } else {
                    toast.error(response.data.message)
                }
            }).catch(function (error) {
                 toast.error(error.message); 
                });
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            if(invalidText(e.target.value) || invalidEmail(e.target.value)){
                setError((prev) => {
                    return { ...prev, email: true }
                });
            }
            else{
                setError((prev) => {
                    return { ...prev, email: false }
                });
            }
        }
        if (e.target.name === "password") {
            if(invalidText(e.target.value)){
                setError((prev) => {
                    return { ...prev, password: true }
                });
            }
            else{
                setError((prev) => {
                    return { ...prev, password: false }
                });
            }
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const resetLoginUser = () => {
        setLoginUser({
            email: '',
            password: ''
        });
        setHasError(true);
        setError({
            email : true,
            password : true
        });
        console.log("Reset login user",loginUser);
    }
    return (
        <div id="loginScreen">
            <GoToHome/>
             <Toaster position="top-center" reverseOrder={false} />
            <form>
                <div id="login-form-card" className="form-card row">
                    <div className="col-12">
                        <h1 className='text-dark' id="loginHeading">Login</h1>
                    </div>
                    <div className="col-12">
                        <label className="fw-bold">Enter email</label>
                        <input type='email' onChange={handleChange} onBlur={handleBlurChange} value={loginUser.email} className='form-control mt-1' placeholder='eg : abc@gmail.com' name="email" id="email" />
                        {hasError && error.email ? (<p className="errorMsg">Invalid email field</p>) : <p></p>}
                    </div>
                    <div className="col-12">
                        <label className=' fw-bold'>Enter password</label>
                        <input type='password' onChange={handleChange} onBlur={handleBlurChange} value={loginUser.password} name="password" className='form-control mt-1' placeholder='password' id="password" />
                        {hasError && error.password ? (<p className="errorMsg">Invalid password field</p>) : <p></p>}
                    </div>
                    <div className="col-6">
                        <button type="submit" onClick={handleLoginSubmit} className="btn btn-primary mt-2 w-100"> Login </button>
                    </div>
                    <div className="col-6">
                        <button type="button" onClick={resetLoginUser} className="btn btn-danger mt-2 w-100"> Reset </button>
                    </div>
                    <div className="col-12 mt-3">
                        {/* <span className="text-primary">New user?</span> */}
                        <Link to="/day4_7_8/signUp" className='text-primary' style={{float:'right'}}>New User? Sign Up</Link>
                    </div>
                </div> 
            </form>
        </div>
    )
}

export default Login