import Peer from  "simple-peer"

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

export type PeerData={
    peerConnection:Peer.Instance,
    participantUser:SocketUser,
    // initiator:boolean,
    stream:MediaStream|undefined,
    // trickle:boolean,
    // config:any
}