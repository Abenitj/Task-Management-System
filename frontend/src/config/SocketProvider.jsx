import React, { useEffect } from 'react'
import socket from './socket'
import {useSelector} from 'react-redux'

const SocketProvider =()=>{
    const user=useSelector((state)=>state.user.user)
    useEffect(()=>{
        if(user?.id)
        {
        socket.connect()
        socket.emit("register", user.id)
        }
        return ()=>{
            socket.disconnect();
        };

    },[user])

    return null;
}

export default SocketProvider;