"use client";
import {
	DeviceSettings,
	useCall,
	VideoPreview,
} from "@stream-io/video-react-sdk";
import { PropsWithChildren, HTMLProps, useState, useEffect } from "react";
import { Button } from "./ui/button";

interface MeetingSetupProps extends PropsWithChildren, HTMLProps<HTMLElement> {
	setIsSetupComplete: Function;
}

export default function MeetingSetup({ setIsSetupComplete, ...rest }: MeetingSetupProps) {
	const [isMicAndCamOn, setIsMicAndCamOn] = useState(false);
	const call = useCall();

	if (!call)
		throw new Error("useCall must be used within StreamCall component");

	useEffect(() => {
		if (isMicAndCamOn) {
			call?.microphone.disable();
			call?.camera.disable();
		} else {
			call?.microphone.enable();
			call?.camera.enable();
		}
	}, [isMicAndCamOn, call?.camera, call?.microphone]);

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
			<h1 className="text-2xl font-bold">Setup</h1>
			<VideoPreview />
			<div className="flex h-16 items-center justify-center gap-3">
				<label
					htmlFor=""
					className="flex items-center justify-center gap-2 font-medium"
				>
					<input
						type="checkbox"
						name=""
						id=""
						checked={isMicAndCamOn}
						onChange={(e) => setIsMicAndCamOn(e.target.checked)}
					/>
					Join with mic and cam off
				</label>
				<DeviceSettings />
			</div>
			<Button
				className="rounded-md bg-green-500 px-4 py-2.5"
				onClick={() => {
					call.join();
					setIsSetupComplete(true);
				}}
			>
				Join meeting
			</Button>
		</div>
	);
}
