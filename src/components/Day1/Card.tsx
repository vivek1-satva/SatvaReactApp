import React from 'react'

type Props = {
    key? : number,
    title : string,
    content : string,
    quantity : number
}

const Card = (props: Props) => {
  return (
    <div className="card" style = {props.quantity %2 == 0 ? {backgroundColor : "rgb(188 201 235)"} : {backgroundColor : "#b1d3e9"}}>
        <img src="nature.jpg" style={{width:'100%'}}></img>
        <div className="container"> 
            <h4><b>{props.title}</b></h4>
            <p>{props.content}</p>
            <p style={{float:'right'}}>{props.quantity}</p>
        </div>
    </div>
  )
}

export default Card