import React from 'react'
import {HomeOutlined, LoginOutlined, AuditOutlined, UserAddOutlined, SmileOutlined} from '@ant-design/icons'
import './goToHome.css'
import { useNavigate } from 'react-router-dom'

type Props = {}

const GoToHome = (props: Props) => {
    const navigate = useNavigate();
    const goToHome = (location : string) => {
        navigate(location)
    }
  return (
    <div className='d-flex flex-column float-end mx-2'>
        <HomeOutlined className="gotoIcon" onClick={() => goToHome("/table")}/>
        <LoginOutlined className="gotoIcon"  onClick={() => goToHome("/day4_7_8/")} />
        <AuditOutlined className="gotoIcon"  onClick={() => goToHome("/day4_7_8/signUp")} />
        <UserAddOutlined  className="gotoIcon" onClick={() => goToHome("/day4_7_8/user")} />
        <SmileOutlined className="gotoIcon"  onClick={() => goToHome("/day4_7_8/role")} />
    </div>
  )
}

export default GoToHome