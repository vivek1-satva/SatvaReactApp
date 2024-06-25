import React, { useState } from 'react'
import { allowOnlyAlphabet, checkPassword, formatToPhone, invalidEmail, invalidFieldLength, invalidPassword, invalidText } from '../utils/utils'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import GoToHome from './CommonComponent/GoToHome';

type Props = {}

const baseUrl = process.env.REACT_APP_BASE_URL;

type signeddUserType = {
    firstName: string,
    lastName: string,
    // companyName?: string,
    // phone?: string,
    email: string,
    password: string,
    confirmPassword: string
}

type signUpType = {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
}

type signeddUserErrorType = {
    firstName: boolean,
    lastName: boolean,
    // phone?: boolean,
    email: boolean,
    password: boolean,
    confirmPassword: boolean
}

const SignUp = (props: Props) => {
    const signUpUserObj: signeddUserType = {
        firstName: '',
        lastName: '',
        // companyName: '',
        // phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [signUpUser, setSignUpUser] = useState(signUpUserObj);
    const [passwordError,setPasswordError] = useState("Invalid password field");
    const [error, setError] = useState<signeddUserErrorType>({
        firstName: true,
        lastName: true,
        // phone: true,
        email: true,
        password: true,
        confirmPassword: true
    });
    const [hasError, setHasError] = useState(false);
    const [firstNameError, setFirstNameError] = useState("Invalid first name field");
    const [lastNameError, setLastNameError] = useState("Invalid last name field");

    // const onlyNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     const re = /^[0-9\b]+$/;
    //       if (event.currentTarget.value === '' || re.test(event.currentTarget.value)) {
    //         setSignUpUser((prev) => {return {...prev,phone: event.currentTarget.value}})
    //       }
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // if (name === 'phone') {
        // const maskedPhone =formatToPhone(value);
        //     setSignUpUser((prevState) => ({
        //         ...prevState,
        //         phone: maskedPhone,
        //     }));
        // }
        // else{
        setSignUpUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // }

        // const result = e.target.value.replace(/\D/g, '');
        // setSignUpUser((prev) => {return {...prev,phone: result}});
    };

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
        if (e.target.name === "password") {
            if (invalidText(e.target.value)) {
                setError((prev) => {
                    return { ...prev, password: true }
                });
            }
            else if(invalidPassword(e.target.value)){
                setError((prev) => {
                    return { ...prev, password: true }
                });
                setPasswordError("Password must have one capital,small,number and special character with length of 8");
            }
            else {
                setError((prev) => {
                    return { ...prev, password: false }
                });
            }
        }
        if (e.target.name === "confirmPassword") {
            if (invalidText(e.target.value) || checkPassword(e.target.value, signUpUser.password)) {
                setError((prev) => {
                    return { ...prev, confirmPassword: true }
                });
            }
            else {
                setError((prev) => {
                    return { ...prev, confirmPassword: false }
                });
            }
        }
        // if (e.target.name === "phone") {
        //     if (invalidText(e.target.value)) {
        //         setError((prev) => {
        //             return { ...prev, phone: true }
        //         });
        //     }
        //     else {
        //         setError((prev) => {
        //             return { ...prev, phone: false }
        //         });
        //     }
        // }
    }
    const displaySignedUser = () => {
        console.log(signUpUser);
    }

    const handleSignUpSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (Object.values(error).includes(true)) {
            setHasError(true);
            console.log("has error:", hasError);
        }
        else {
            postSignUpFromApi();
        }
        // displaySignedUser();
    }

    //post sign up
    const postSignUpFromApi = () => {
        const signUpUserObj: signUpType = {
            fullName: signUpUser.firstName + " " + signUpUser.lastName,
            email: signUpUser.email,
            password: signUpUser.password,
            confirmPassword: signUpUser.confirmPassword
        }

        console.log(signUpUserObj)
        try {
            axios.post(`${baseUrl}/Authentication/register`, signUpUserObj).then(function (response) {
                console.log(response);

                if (response.data.responseStatus == 1) {
                    toast.success(response.data.message)
                    setSignUpUser({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                } else {
                    toast.error(response.data.message)
                }
            }).catch(function (error) {
                 toast.error(error.message); 
                });
        }
        catch (e) {
            // toast.error(e.message);
            console.log(e)
        }
    }

    const resetSignedUser = () => {
        setSignUpUser({
            firstName: '',
            lastName: '',
            // companyName: '',
            // phone: '',   
            email: '',
            password: '',
            confirmPassword: ''
        });
        setHasError(true);
        setError({
            firstName: true,
            lastName: true,
            // phone: true,
            email: true,
            password: true,
            confirmPassword: true
        });
        console.log("Reset sign up form");
    }
    return (
        <div id="signUpScreen">
            <GoToHome/>
            <Toaster position="top-center" reverseOrder={false} />
            <form>
                <div className="form-card row" id="signUp-form-card">
                    <h1 className='text-dark heading' id="signUpHeading">Sign Up</h1>
                    <div className="col-6">
                        <label>First name</label>
                        <input type='text' className='form-control' onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.firstName} name="firstName" id="firstName" />
                        {hasError && error.firstName && (<p className="errorMsg">{firstNameError}</p>)}
                    </div>
                    <div className="col-6">
                        <label>Last name</label>
                        <input type='text' className='form-control' onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.lastName} name="lastName" id="lastName" />
                        {hasError && error.lastName && (<p className="errorMsg">{lastNameError}</p>)}
                    </div>
                    {/* <div className="col-12">
                        <label>Company name</label>
                        <input type='text' className='form-control' onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.companyName} name="companyName" id="companyName" />
                    </div> */}
                    <div className="col-12">
                        <label>Email</label>
                        <input type='email' className='form-control' onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.email} name="email" id="email" />
                        {hasError && error.email && (<p className="errorMsg">Invalid email field</p>)}
                    </div>
                    {/* <div className="col-6">
                        <label>Phone</label>
                        <input type='text' className='form-control' onKeyUp={formatToPhone} onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.phone} name="phone" id="phone" />
                        {hasError && error.phone && (<p className="errorMsg">Invalid phone field</p>)}
                    </div> */}
                    <div className="col-6">
                        <label>Password</label>
                        <input type='password' name="password" onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.password} className='form-control' id="password" />
                        {hasError && error.password && (<p className="errorMsg">{passwordError}</p>)}
                    </div>
                    <div className="col-6">
                        <label>Confirm Password</label>
                        <input type='password' name="confirmPassword" onChange={handleChange} onBlur={handleBlurChange} value={signUpUser.confirmPassword} className='form-control' id="confirmPassword" />
                        {hasError && error.confirmPassword && (<p className="errorMsg">Invalid confirm password field</p>)}
                    </div>
                    <div className="col-6">
                        <button type="submit" onClick={handleSignUpSubmit} className="btn btn-primary mt-3 w-100" id="signUpBtn"> Sign Up </button>
                    </div>
                    <div className="col-6">
                        <button type="button" onClick={resetSignedUser} className="btn btn-danger mt-3 w-100"> Reset </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp



// const isNumericInput = (event) => {
// 	const key = event.keyCode;
// 	return ((key >= 48 && key <= 57) || // Allow number line
// 		(key >= 96 && key <= 105) // Allow number pad
// 	);
// };

// const isModifierKey = (event) => {
// 	const key = event.keyCode;
// 	return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
// 		(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
// 		(key > 36 && key < 41) || // Allow left, up, right, down
// 		(
// 			// Allow Ctrl/Command + A,C,V,X,Z
// 			(event.ctrlKey === true || event.metaKey === true) &&
// 			(key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
// 		)
// };

// const enforceFormat = (event) => {
// 	// Input must be of a valid number format or a modifier key, and not longer than ten digits
// 	if(!isNumericInput(event) && !isModifierKey(event)){
// 		event.preventDefault();
// 	}
// };

// const formatToPhone = (event) => {
// 	if(isModifierKey(event)) {return;}

// 	// I am lazy and don't like to type things more than once
// 	const target = event.target;
// 	const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
// 	const zip = input.substring(0,3);
// 	const middle = input.substring(3,6);
// 	const last = input.substring(6,10);

// 	if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
// 	else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
// 	else if(input.length > 0){target.value = `(${zip}`;}
// };

// const inputElement = document.getElementById('phoneNumber');
// inputElement.addEventListener('keydown',enforceFormat);
// inputElement.addEventListener('keyup',formatToPhone);