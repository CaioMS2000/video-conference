"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { PropsWithChildren, HTMLProps } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface EndCallButtonProps
	extends PropsWithChildren,
		HTMLProps<HTMLElement> {}

export default function EndCallButton({ ...rest }: EndCallButtonProps) {
	const call = useCall();
	const { push } = useRouter();
	const { useLocalParticipant } = useCallStateHooks();
	const localParticipant = useLocalParticipant();
	const isMeetingOwner =
		localParticipant &&
		call?.state.createdBy &&
		localParticipant.userId === call.state.createdBy.id;

	if (!isMeetingOwner) return null;

	return (
		<Button
			onClick={async () => {
				await call.endCall();
				push("/");
			}}
            className="bg-red-500"
		>End call for everyone</Button>
	);
}
