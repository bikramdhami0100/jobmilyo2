"use client";
import { useSocket } from '@/app/context/SocketProvider';
import React, { useEffect, useRef, useState } from 'react';

function Room() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const pcRef = useRef();
    const [offerCreated, setOfferCreated] = useState(false);
    const { socket } = useSocket();
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        const setupMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;

                const pc = new RTCPeerConnection({
                    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                });
                pcRef.current = pc;

                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('ice-candidate', {
                            candidate: event.candidate,
                            roomId
                        });
                    }
                };

                pc.ontrack = (event) => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };

                socket.on('offer', async (offer) => {
                    if (!pcRef.current) return;
                    await pcRef.current.setRemoteDescription(offer);
                    const answer = await pcRef.current.createAnswer();
                    await pcRef.current.setLocalDescription(answer);
                    socket.emit('answer', { answer, roomId });
                });

                socket.on('answer', async (answer) => {
                    if (!pcRef.current) return;
                    await pcRef.current.setRemoteDescription(answer);
                });

                socket.on('ice-candidate', async (candidate) => {
                    if (!pcRef.current) return;
                    try {
                        await pcRef.current.addIceCandidate(candidate);
                    } catch (e) {
                        console.error('Error adding ICE candidate:', e);
                    }
                });

            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        socket.on('user_join', (email) => {
            console.log(`User ${email} joined, creating offer...`);
            createOffer();
        });

        setupMedia();

        return () => {
            if (pcRef.current) {
                pcRef.current.close();
            }
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate');
            socket.off('user_join');
        };
    }, [socket, roomId]);

    const createOffer = async () => {
        if (!pcRef.current) return;
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit('offer', { offer, roomId });
        setOfferCreated(true);
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        const roomId = prompt('Enter room ID:');
        if (roomId) {
            setRoomId(roomId);
            socket.emit('join_room', { roomId, email: 'user@example.com' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {!roomId && (
                <button
                    onClick={handleJoinRoom}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Join Room
                </button>
            )}
            
            {roomId && (
                <>
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={createOffer}
                            disabled={offerCreated}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                        >
                            Start Call
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            className="w-1/2 bg-black rounded-lg"
                        />
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            className="w-1/2 bg-black rounded-lg"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Room;