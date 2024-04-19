import CallList from "@/components/CallList";
import { PropsWithChildren, HTMLProps } from "react";

interface PreviousProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function Previous({ ...rest }: PreviousProps) {
	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<h1 className="text-3xl font-bold">Previous</h1>

				<CallList type="ended"/>
			</section>
		</>
	);
}
