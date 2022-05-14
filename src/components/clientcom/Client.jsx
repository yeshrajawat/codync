import React from 'react'
import Avatar from 'react-avatar';
import './Client.scss';
const Client = ({username}) => {
  return (
    <div className='client'>
        <Avatar className='avatar' name={username} size={50} round="14px" />
        <span>{username}</span>
    </div>
  )
}

export default Client