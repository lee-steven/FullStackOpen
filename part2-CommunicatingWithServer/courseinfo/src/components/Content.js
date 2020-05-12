import React from 'react'
import Part from './Part'

const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(course => 
            <Part key={course.id} part={course.name} exercise={course.exercises} />
        )}
      </div>
    )
}

export default Content