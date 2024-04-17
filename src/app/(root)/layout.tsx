import { PropsWithChildren, HTMLProps } from "react";
import { StreamVideoProvider } from "../../../providers/StreamClientProvider";

interface RootLayoutProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function RootLayout({
	children,
	...rest
}: RootLayoutProps) {
	return (
		<>
			<StreamVideoProvider>
				<main>{children}</main>
			</StreamVideoProvider>
		</>
	);
}
