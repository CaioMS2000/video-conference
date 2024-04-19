import CallList from "@/components/CallList";
import { PropsWithChildren, HTMLProps } from "react";

interface UpcomingProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function Upcoming({ ...rest }: UpcomingProps) {
	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<h1 className="text-3xl font-bold">Upcoming</h1>
				<CallList type="upcoming"/>
			</section>
		</>
	);
}
