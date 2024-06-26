import { useUser } from "@/context/user";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { getCookie } from "../../actions/cookies.actions";

export const useGetCalls = () => {
	const [calls, setCalls] = useState<Call[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const client = useStreamVideoClient();
	const { user, setUser } = useUser();

	async function buildUser() {
		const someCookie = await getCookie("stream-client-id");

		if (!someCookie || !someCookie.value) throw new Error("User not found");

		const parsedUser = JSON.parse(someCookie.value);

		setUser({ id: parsedUser.id });
	}

	async function loadCalls() {
		if (!client || !user?.id) return;

		setIsLoading(true);

		try {
			const { calls } = await client.queryCalls({
				sort: [{ field: "starts_at", direction: -1 }],
				filter_conditions: {
					start_at: { $exists: true },
					$or: [
						{ created_by_id: user.id },
						{ members: { $in: [user.id] } },
					],
				},
			});

			setCalls(calls);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		buildUser();
	}, []);
	useEffect(() => {
		loadCalls();
	}, [client, user?.id]);

	const now = new Date();

	const endedCalls = calls?.filter(
		({ state: { startsAt, endedAt } }: Call) => {
			return (startsAt && new Date(startsAt) < now) || !!endedAt;
		}
	);

	const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
		return startsAt && new Date(startsAt) > now;
	});

	return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
