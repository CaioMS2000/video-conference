"use client";
import {
	StreamCall,
	StreamVideo,
	StreamVideoClient,
	User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider, generateUUID } from "../actions/stream.actions";
import Loader from "@/components/Loader";

interface StreamVideoProviderProps {
	children?: ReactNode;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });

export const StreamVideoProvider = ({ children }: StreamVideoProviderProps) => {
    
    const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
    
    async function createVideoClient(){
            if(!apiKey) throw new Error('No API key');

            const userId = await generateUUID()
            const client = new StreamVideoClient({
                apiKey,
                user: {
                    id: userId,
                    name: `username-for-${userId}`,
                    image: "",
                },
                tokenProvider: tokenProvider
            });
    
            setStreamVideoClient(client)
        }

	useEffect(() => {
        createVideoClient()
	}, []);

    if(!streamVideoClient) return <Loader/>;

	return (
		<StreamVideo
			//   client={client}
			client={streamVideoClient}
		>
			{/* <StreamCall call={call}> */}
			{children}
			{/* </StreamCall> */}
		</StreamVideo>
	);
};