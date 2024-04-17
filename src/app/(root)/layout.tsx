import { PropsWithChildren, HTMLProps } from "react";

interface RootLayoutProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default async function RootLayout({
	children,
	...rest
}: RootLayoutProps) {
	return (
		<>
			<main>{children}</main>
		</>
	);
}
