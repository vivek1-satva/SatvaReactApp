import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import Card from './Card' 
import './day1.css'

type Props = {}

const data = [
    {
      title : "ABC-1",
      quantity : 1,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    },
    {
      title : "ABC-2",
      quantity : 16,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    },
    {
      title : "ABC-3",
      quantity : 10,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    },
    {
      title : "ABC-4",
      quantity : 1,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    },
    {
      title : "ABC-5",
      quantity : 3,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    },
    {
      title : "ABC-6",
      quantity : 4,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
    }
  ];

const Index = (props: Props) => {
  return (
    <>
      <div id="mainCardScreen" className="cards">
        {data.map((item,index) => {
          return <Card  key = { index } title = { item.title } content = {item.content} quantity = { item.quantity } />;
        })}
      </div>
    </>
  )
}

export default Index