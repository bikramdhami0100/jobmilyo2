import {io } from "../../../server.js"

const onCall = async(participants) => {
    console.log(participants?.receiver?.socketId,"this is participants during calling this whic emit incoming call")
     if(participants?.receiver?.socketId){
        io.to(participants?.receiver?.socketId).emit("incomingCall",participants);
     }
}

export default onCall;