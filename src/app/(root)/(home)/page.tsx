import MeetingTypeList from "@/components/MeetingTypeList";
import { PropsWithChildren, HTMLProps } from "react";

interface HomeProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function Home({ ...rest }: HomeProps) {
	// Adicionando 1 dia e 11 horas à data atual
	const cuurentDate = new Date();
	const aBitInteFuture = new Date();
	aBitInteFuture.setDate(aBitInteFuture.getDate() + 1);
	aBitInteFuture.setHours(aBitInteFuture.getHours() + 11);

	const currentFormattedHour = cuurentDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
		// meridiem: 'short'
	});

	const currentFormattedDate = cuurentDate.toLocaleDateString("pt-BR", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const aBitInteFutureFormattedHour = aBitInteFuture.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
		// meridiem: 'short'
	});

	const aBitInteFutureFormattedDate = aBitInteFuture.toLocaleDateString("pt-BR", {
		// weekday: "long",
		day: "numeric",
		// month: "long",
		month: "numeric",
		year: "numeric",
	});

	return (
		<>
			<section className="flex size-full flex-col gap-10 text-white">
				<div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
					<div className="flex h-full flex-col justify-between max-md:px-5 ,ax-md:py-8 lg:p-11">
						<h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal">
							Upcoming Meeting at: <p className="p">{aBitInteFutureFormattedDate} -  {aBitInteFutureFormattedHour}</p>
						</h2>
						<div className="flex flex-col gap-2">
							<h1 className="text-4xl font-extrabold lg:text-7xl">
							{currentFormattedHour}
							</h1>
							<p className="text-lg font-medium text-sky-1 lg:text-2xl">
								{currentFormattedDate}
							</p>
						</div>
					</div>
				</div>
				<MeetingTypeList />
			</section>
		</>
	);
}
