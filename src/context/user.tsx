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

interface UserType {
	id: string;
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

	// useEffect(() => {
	// 	console.log("user", user);
	// }, []);

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
