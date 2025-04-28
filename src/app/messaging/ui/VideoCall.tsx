"use client"
import { userSocket } from '@/app/context/SocketContext'
import React, { useCallback, useEffect, useState } from 'react'
import VideoContainer from './VideoContainer';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

function VideoCall() {
    const { localStream, ongoingCall, peer, handleHangup,isCallEnded } = userSocket();
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVidOn, setIsVidOn] = useState(true);

    useEffect(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            const audioTrack = localStream.getAudioTracks()[0];
            setIsVidOn(videoTrack.enabled);
            setIsMicOn(audioTrack.enabled);
        }
    }, [localStream]);

    const toggleCamera = useCallback(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setIsVidOn(videoTrack.enabled);
        }
    }, [localStream])

    const toggleMic = useCallback(() => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMicOn(audioTrack.enabled);
        }
    }, [localStream])
    const isOnCall = localStream && peer && ongoingCall ? true : false;
    if(isCallEnded){
        return <div className=' mt-5 text-rose-400 text-center'>Call Declined </div>
    }
    if(!localStream &&!peer) return;
    return (
        <div className='w-full h-full  rounded-lg p-4'>
            <div className=' mt-4 relative  h-[500px]'> {/* Added fixed height for container */}
                {localStream && <VideoContainer stream={localStream} isLocalStream={true} isOnCall={isOnCall} />}
                {peer && peer.stream && <VideoContainer stream={peer.stream} isLocalStream={false} isOnCall={isOnCall} />}
            </div>

            <div className=' mt-8 flex  justify-center items-center'>
                <Button onClick={toggleMic}>
                    {isMicOn && <MicOff size={28} />}
                    {!isMicOn && <Mic size={28} className='opacity-20' />}
                </Button>

                <Button className=' px-4 bg-rose-500  rounded mx-4 ' onClick={() => {
                    handleHangup({ ongoingCall: ongoingCall ? ongoingCall : undefined, isEmitHangup: true })
                }}>
                    End Call
                </Button>

                <Button onClick={toggleCamera}>
                    {isVidOn && <VideoOff size={28} />}
                    {!isVidOn && <Video size={28} className='opacity-20' />}
                </Button>
            </div>

        </div>
    )
}

export default VideoCall