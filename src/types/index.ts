export interface SocketUser {
    userId:string,
    userData:any,
    socketId:string,
}

export type OngoingCall={
    participants:Participants,
    isRinging:boolean
}

export type Participants ={
     caller:SocketUser,
     receiver:SocketUser
}