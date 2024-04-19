import CallList from "@/components/CallList";
import { PropsWithChildren, HTMLProps } from "react";

interface RecordinsgProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function Recordinsg({ ...rest }: RecordinsgProps) {
	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<h1 className="text-3xl font-bold">Recordings</h1>

				<CallList type="recordings"/>
			</section>
		</>
	);
}
