"use client";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { getCookie } from "../../actions/cookies.actions";

interface UserType {
	id: string;
	username?: string;
}

interface UserContextType {
	setUser: Dispatch<SetStateAction<UserType | undefined>>;
	user: UserType | undefined;
}

const userContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderType {
	children?: ReactNode;
}

export function UserProvider({ children }: UserProviderType) {
	const [user, setUser] = useState<UserType | undefined>(undefined);

	async function buildUser() {
		const someCookie = await getCookie("stream-client-id");

		if (!someCookie || !someCookie.value) throw new Error("User not found");

		const parsedUser = JSON.parse(someCookie.value);

		setUser({ id: parsedUser.id, username: `username-for-${parsedUser.id}` });
	}

	useEffect(() => {
		if(!user || !user.id) buildUser();
	}, [user]);

	return (
		<userContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</userContext.Provider>
	);
}

export function useUser() {
	const context = useContext(userContext);

	if (!context) throw new Error("Error in user context");

	const { user, setUser } = context;

	return { user, setUser };
}
