import { PropsWithChildren, HTMLProps } from "react";

interface PersonalRoomProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function PersonalRoom({ ...rest }: PersonalRoomProps) {
	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<h1 className="text-3xl font-bold">Personal Room</h1>
			</section>
		</>
	);
}
