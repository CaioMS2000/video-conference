"use client";
import { PropsWithChildren, HTMLProps, useEffect, useState } from "react";
import {
	getAllCookies,
	getCookie,
} from "../../../../../actions/cookies.actions";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useUser } from "@/context/user";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

interface MeetingProps extends PropsWithChildren, HTMLProps<HTMLElement> {
	params: {
		id: string;
	};
}

export default function Meeting({ params: { id }, ...rest }: MeetingProps) {
	const { user, setUser } = useUser();
	const [isSetupComplete, setIsSetupComplete] = useState(false);
	const { call, isCallLoading } = useGetCallById(id);

	async function buildUser() {
		const someCookie = await getCookie("stream-client-id");
		console.log(someCookie?.value);

		if (!someCookie || !someCookie.value) throw new Error("User not found");

		const parsedUser = JSON.parse(someCookie.value);
		console.log(parsedUser.id);

		setUser({ id: parsedUser.id });
	}

	useEffect(() => {
		buildUser();
	}, []);

	if (!user || isCallLoading) return <Loader />;

	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />}
				</StreamTheme>
			</StreamCall>
		</main>
	);
}
