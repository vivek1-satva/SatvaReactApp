import React from 'react'
import "./Index.css" 

type Props = {
    title : string,
    description : string,
}

const TitleDescCard = (props: Props) => {
  return (
    <div id="titleDescCard" className="col-6 m-2">
      <h4><b>{props.title}</b></h4>
      <p>{props.description}</p>
    </div>
  )
}

export default TitleDescCard