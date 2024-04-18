"use client";
import { cn } from "@/lib/utils";
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallStats,
	PaginatedGridLayout,
	SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { PropsWithChildren, HTMLProps, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
interface MeetingRoomProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default function MeetingRoom({ ...rest }: MeetingRoomProps) {
	const searchParams = useSearchParams();
	const isPersonalRoom = !!searchParams.get("personal");
	const layoutOptions = ["Grid", "Speaker-Left", "Speaker-Right"];
	const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
	const [showParticipants, setShowParticipants] = useState(false);
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()

    if(callingState !== CallingState.JOINED) return <Loader/>

	const CallLayout = () => {
		switch (layout) {
			case "grid":
				return <PaginatedGridLayout />;

			case "speaker-right":
				return <SpeakerLayout participantsBarPosition="left" />;

			default:
				return <SpeakerLayout participantsBarPosition="right" />;
		}
	};

	return (
		<section className="relative h-screen w-full overflow-hidden pt-4 text-white">
			<div className="relative flex size-full items-center justify-center">
				<div className="flex size-full max-w-[1000px] items-center">
					<CallLayout />
				</div>
				<div
					className={cn("h=[calc(100vh-86px)] hidden ml-2", {
						"show-block": showParticipants,
					})}
				>
					<CallParticipantsList
						onClose={() => setShowParticipants(false)}
					/>
				</div>
			</div>

			<div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
				<CallControls />

				<DropdownMenu>
					<div className="flex items-center">
						<DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
							<LayoutList className="text-white" size={20} />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
						{layoutOptions.map((option, i) => {
							return (
								<div key={i}>
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={() =>
											setLayout(
												option.toLowerCase() as CallLayoutType
											)
										}
									>
										{option}
									</DropdownMenuItem>
									<DropdownMenuSeparator className="border-dark-1 bg-dark-1" />
								</div>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
				{/* <CallStats/> */}
				<Button
					onClick={() =>
						setShowParticipants((prevState) => !prevState)
					}
				>
					<div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
						<User size={20} className="text-white" />
					</div>
				</Button>
                {!isPersonalRoom && <EndCallButton/>}
			</div>
		</section>
	);
}
