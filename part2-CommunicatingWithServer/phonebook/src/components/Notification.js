import React from 'react'

const Notification = ({ message, error }) => {
    let notificationStyle ={}
    if(error){
        notificationStyle = {
            color: 'red',
            fontStyle: 'italic',
            fontSize: 20,
            background: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }
    } else {
        notificationStyle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 20,
            background: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }
    }
   

    if (message === null) {
      return null
    }
  
    return (
      <div className="error" style={notificationStyle}>
        {message}
      </div>
    )

   
  }

export default Notification
  