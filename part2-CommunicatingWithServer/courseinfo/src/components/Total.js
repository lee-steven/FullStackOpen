import React from 'react'

const Total = (props) => {

    let sum = props.course.parts.reduce((acc, val) => acc + val.exercises, 0);

    return (
      <>
        <p>Number of exercises {sum}</p> 
      </>
    )
  }

export default Total