export type TTaskStatus =
	| 'upcoming'
	| 'ongoing'
	| 'completed'
	| 'cancelled'
	| 'expired';

export interface ITask {
	id: string;
	title: string;
	description?: string;
	task_date: string;
	status: TTaskStatus;
	has_passed: boolean;
}
