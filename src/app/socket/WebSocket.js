import io from "socket.io-client";
import React from 'react';
const URL = 'https://wentterminus.its.com.pk'

const getToken = () => {
    return localStorage.getItem("user_token")
}

class WebSocket{
    static socket = null
    static initializeSocket = () =>{
        let check = false
        if(getToken()){
            if(!WebSocket.socket){
                WebSocket.socket = io(URL, {
                    query: {
                        token: getToken(),
                    },
                });
            }
            check = true
            WebSocket.socket.on("connect", () => {
                console.log("Connection To Socket Initialized")
            })
            
            WebSocket.socket.on("disconnect", () => {
                console.log("Connection To Socket Removed")
                WebSocket.socket = null
            })
        }
        
        return check
    }
    static getSocket = ()=>{
        if(!WebSocket.socket){
            if(!WebSocket.initializeSocket()){
                return null
            }
        }
        return WebSocket.socket
    }
}


export default WebSocket

