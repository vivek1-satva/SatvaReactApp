import React from 'react'
import Header from '../Day1/Header'
import Sidebar from '../Day1/Sidebar'
import { Outlet } from 'react-router-dom'
import ProductWrapper from '../Day9/ProductWrapper'



type Props = {
    task : number
}

const CommonLayout = (props: Props) => {
    return (
        <ProductWrapper>
            <div className="App">
                <div className="top">
                    <Header openTab={props.task} />
                </div>
                <div className="left">
                    <Sidebar />
                </div>
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </ProductWrapper>
    )
}

export default CommonLayout