import { PropsWithChildren, HTMLProps } from "react";

interface HomeProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function Home({ ...rest }: HomeProps) {
	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<h1 className="text-3xl font-bold">Home</h1>
			</section>
		</>
	);
}
