import React from 'react'
import  Table  from 'react-bootstrap/Table'
import { Link, useNavigate, useNavigation } from 'react-router-dom'

type Props = {}
function clickHandler(row: any){
  console.log(row)
}
const Index = (props: Props) => {
  return (
    <>
    <div id="tableBody">
      <h1>React Training</h1>
      <Table hover className="mt-5">
        <thead>
          <tr>
            <th>Day</th>
            <th>Title</th>
            <th>Assign By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => clickHandler(this)}>
            <td><Link to="/day1">1</Link></td>
            <td><Link to="/day1" className='text-primary'>Basic Layout</Link></td>
            <td>Ayush Raval</td>
            <td>08/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day1">2</Link></td>
            <td><Link to="/day1" className='text-primary'>Basic Routing and Table</Link></td>
            <td>Ayush Raval</td>
            <td>09/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day3">3</Link></td>
            <td><Link to="/day3" className='text-primary'>Advanced Routing and State using Form</Link></td>
            <td>Ayush Raval</td>
            <td>10/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day4_7_8">4_7_8</Link></td>
            <td><Link to="/day4_7_8" className='text-primary'>Login,Signup,UserScreen and RoleScreen(4_7_8)</Link></td>
            <td>Ayush Raval</td>
            <td>13/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day5_6">5_6</Link></td>
            <td><Link to="/day5_6" className='text-primary'>UseEffect for cards and stop watch(5_6)</Link></td>
            <td>Ayush Raval</td>
            <td>15/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day9">9</Link></td>
            <td><Link to="/day9" className='text-primary'>Use context for product management (form,listing,cart)</Link></td>
            <td>Krunal Patel</td>
            <td>22/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day10">10</Link></td>
            <td><Link to="/day10" className='text-primary'>Redux Practice</Link></td>
            <td>Krunal Patel</td>
            <td>24/05/2024</td>
          </tr>
          <tr>
            <td><Link to="/day4_7_8">11</Link></td>
            <td><Link to="/day4_7_8" className='text-primary'>Protected Routes</Link></td>
            <td>Shivraj Singh Rathore</td>
            <td>28/05/2024</td>
          </tr>
        </tbody>
      </Table>
    </div>
    </>
  )
}

export default Index