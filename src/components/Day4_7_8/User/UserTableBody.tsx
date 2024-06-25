import axios from 'axios'
import React from 'react'

type UserType = {
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  role: string
}

type Props = {
  userData: UserType,
  deleteUserFromApi : any,
  editUserFromApi : any
}

const UserTableBody = (props: Props) => {
  return (
    <>
    <tr>
      <td>{props.userData.firstName}</td>
      <td>{props.userData.lastName}</td>
      <td>{props.userData.phone}</td>
      <td>{props.userData.email}</td>
      <td>{props.userData.role}</td>
      <td><button className='btn btn-warning' onClick={() => props.editUserFromApi(props.userData)} ><i className="fa-solid fa-pen-to-square"></i></button></td>
      <td><button className='btn btn-danger' onClick={() => props.deleteUserFromApi(props.userData.id)}><i className="fa-solid fa-trash"></i></button></td>
    </tr>
    </>
  )
}

export default UserTableBody