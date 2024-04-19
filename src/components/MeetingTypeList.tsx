"use client";
import Image from "next/image";
import { PropsWithChildren, HTMLProps, useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from "react-datepicker";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

interface MeetingTypeListProps
	extends PropsWithChildren,
		HTMLProps<HTMLElement> {}

export default function MeetingTypeList({ ...rest }: MeetingTypeListProps) {
	const [meetingStatus, setMeetingStatus] = useState<
		| "isScheduleMeeting"
		| "isJoiningMeeting"
		| "isInstantMeeting"
		| undefined
	>(undefined);
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});
	const [callDetails, setCallDetails] = useState<Call>();
	const { push } = useRouter();
	const client = useStreamVideoClient();
	const { toast } = useToast();

	async function createMeeting() {
		if (!client) return;

		try {
			if (!values.dateTime) {
				toast({
					title: "Please select date and time",
				});
				return;
			}
			// const id = await generateUUID()
			const id = crypto.randomUUID();
			const call = client.call("default", id);

			if (!call) throw new Error("Failed to create a call");

			const startsAt =
				values.dateTime.toISOString() ||
				new Date(Date.now()).toISOString();
			const description = values.description || "Instant meeting";

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				push(`/meeting/${call.id}`);
			}

			toast({
				title: "Meeting created",
			});
		} catch (error) {
			console.log(error);
			toast({
				title: "Failed to create meeting",
			});
		}
	}

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

	return (
		<>
			<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
				<HomeCard
					img="/icons/add-meeting.svg"
					title="New Meeting"
					description="Start an instant meeting"
					handleClick={() => setMeetingStatus("isInstantMeeting")}
					className="bg-orange-1"
				/>
				<HomeCard
					img="/icons/join-meeting.svg"
					title="Join Meeting"
					description="via invitation link"
					className="bg-blue-1"
					handleClick={() => setMeetingStatus("isJoiningMeeting")}
				/>
				<HomeCard
					img="/icons/schedule.svg"
					title="Schedule Meeting"
					description="Plan your meeting"
					className="bg-purple-1"
					handleClick={() => setMeetingStatus("isScheduleMeeting")}
				/>
				<HomeCard
					img="/icons/recordings.svg"
					title="View Recordings"
					description="Meeting Recordings"
					className="bg-yellow-1"
					handleClick={() => push("/recordings")}
				/>

				{!callDetails ? (
					<MeetingModal
						isOpen={meetingStatus === "isScheduleMeeting"}
						onClose={() => setMeetingStatus(undefined)}
						title="Create meeting"
						handleClick={createMeeting}
					>
						<div className="flex flex-col gap-2.5">
							<label
								htmlFor=""
								className="text-base text-normal leading-[22px] text-sky-2"
							>
								Add description
							</label>
							<Textarea
								className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
								onChange={(e) => {
									setValues((prevState) => ({
										...prevState,
										description: e.target.value,
									}));
								}}
							/>
						</div>
						<div className="flex w-full flex-col gap-2">
							<label
								htmlFor=""
								className="text-base text-normal leading-[22px] text-sky-2"
							>
								Select schedule
							</label>
							<ReactDatePicker
								selected={values.dateTime}
								onChange={(date) => {
									setValues((prevState) => ({
										...prevState,
										dateTime: date!,
									}));
								}}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={15}
								timeCaption="time"
								dateFormat={"MMM d, yyy h:mm aa"}
								className="w-full rounded bg-dark-3 p-2 focus:outline-none"
							/>
						</div>
					</MeetingModal>
				) : (
					<MeetingModal
						isOpen={meetingStatus === "isScheduleMeeting"}
						onClose={() => setMeetingStatus(undefined)}
						title="Meeting created"
						className="text-center"
						buttonText="Copy meeting link"
						handleClick={() => {
							navigator.clipboard.writeText(meetingLink);
							toast({ title: "Link copied" });
						}}
						image="/icons/checked.svg"
						buttonIcon="/icons/copy.svg"
					/>
				)}
				<MeetingModal
					isOpen={meetingStatus === "isInstantMeeting"}
					onClose={() => setMeetingStatus(undefined)}
					title="Start an instant meeting"
					className="text-center"
					buttonText="Start Meeting"
					handleClick={createMeeting}
				/>
				<MeetingModal
					isOpen={meetingStatus === "isJoiningMeeting"}
					onClose={() => setMeetingStatus(undefined)}
					title="Type the link"
					className="text-center"
					buttonText="Join Meeting"
					handleClick={() => push(values.link)}
				>
					<Input  placeholder="Meeting link" type="text" className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-dark-3" onChange={e => {
						setValues(prevState => ({...prevState, link: e.target.value}))
					}}/>
				</MeetingModal>
			</section>
		</>
	);
}
