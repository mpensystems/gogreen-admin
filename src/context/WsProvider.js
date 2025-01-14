// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



import { refresh_tokens } from "@service/authService";
import { SOCKET_URL } from "@service/config";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


const WSContext = createContext(undefined);

export const WSProvider = ({children})=>{

    const [socketAccessToken,setSocketAccessToken]=useState(null);
    const [changedToken,setChangedToken] = useState(false);
    const socket = useRef();

    // useEffect(()=>{
    //     const token = token_storage.getString("socket_access_token");
    //     setSocketAccessToken(token);
    // },[changedToken])


    useEffect(()=>{
        socket.current = io(SOCKET_URL,{
            transports:["websocket"],
            withCredentials:true,
            extraHeaders:{
                access_token:socketAccessToken || ""
            },
        });

        // if(socketAccessToken){
        //     socket.current.on("connect_error",(error)=>{
        //         if(error.message === "Authentication error"){
        //             console.log("Auth connection error:",error.message);
        //             refresh_tokens("socket",true,updateAccessToken)
        //         }
        //     })
        // }

        return ()=>{
            socket.current?.disconnect();
        };


    },[socketAccessToken]);


    const emit = (event,data={})=>{
        socket.current?.emit(event,data);
    }

    const on = (event)=>{
        socket.current?.off(event);
    }

    const off =(event)=>{
        socket.current?.off(event);
    }

    const removeListener = (listenerName)=>{
        socket?.current?.removeListener(listenerName);
    }

    const updateAccessToken = () =>{
        setChangedToken(!changedToken);
    }

    const socketService={
        initializeSocket:()=>{},
        emit,
        on,
        off,
        removeListener,
        updateAccessToken,

    };

    return(
        <WSContext.Provider value={socketService}>{children}</WSContext.Provider>
    )

}

export const useWs=()=>{
    const socketService = useContext(WSContext);
    if(!socketService){
        throw new Error("useWS must be used within a WSProvider");
    }
    return socketService;
}