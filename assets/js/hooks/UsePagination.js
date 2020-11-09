import Axios from "axios";
import { useCallback, useState } from "react";

export function UsePagination(url) {
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(0);
	const [next, setNext] = useState(null);

	const load = useCallback(() => {
		setLoading(true);
		Axios.get(next || url, {
			headers: {
				Accept: "Application/ld+json",
			},
		})
			.then((response) => {
				setLoading(false);

				setItems((items) => [...response.data["hydra:member"], ...items]);

				if (
					response.data["hydra:view"] &&
					response.data["hydra:view"]["hydra:next"]
				) {
					setNext(response.data["hydra:view"]["hydra:next"]);
				} else {
					setNext(null);
				}

				setCount(response.data["hydra:totalItems"]);
				console.log(response.data["hydra:member"]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [url, next]);

	return { loading, items, load, count, hasMore: next !== null };
}
