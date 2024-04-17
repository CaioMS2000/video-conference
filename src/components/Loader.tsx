"use client";
import Image from "next/image";
import { PropsWithChildren, HTMLProps } from "react";

interface LoaderProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default function Loader({ ...rest }: LoaderProps) {
	return (
		<>
			<div className="flex-center h-screen w-full">
				<Image src={'/icons/loading-circle.svg'} alt="Loading" width={50} height={50}/>
			</div>
		</>
	);
}
