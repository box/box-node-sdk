import { Collaboration } from "./collaboration";

type CollaborationsOrder = {
	by: string,
	direction: 'ASC' | 'DESC'
}

export interface Collaborations {
	entries: Collaboration[]
	limit: number,
	offset: number,
	order: CollaborationsOrder,
	total_count: number
}
