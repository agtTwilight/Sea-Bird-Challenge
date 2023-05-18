import React, 
    { useState,
    useEffect } from 'react'
import './style.css'

export const ViewData = (props) => {
    const [visible, setVisible] = useState(false);
    if(props.capture) {
        console.log(props.capture);
    }
  return (
    <div>ViewData</div>
  )
}

export default ViewData;
