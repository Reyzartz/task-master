import type { ITask, TTaskStatus } from 'src/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { differenceInDays, isToday } from 'date-fns';

const getTasks = () => {
	if (browser && localStorage.tasks !== undefined) {
		return (JSON.parse(localStorage.tasks) as ITask[]).map((task) => {
			const taskDate = new Date(task.task_date);

			const getStatus = (): TTaskStatus => {
				if (['ongoing', 'upcoming'].includes(task.status)) {
					console.log(task.status);

					if (isToday(taskDate)) {
						return 'ongoing';
					}

					if (differenceInDays(taskDate, new Date()) < 0) {
						return 'expired';
					}
				}

				return task.status;
			};

			return {
				...task,
				status: getStatus(),
				has_passed: differenceInDays(taskDate, new Date()) < 0
			};
		});
	}
	return [];
};

const setTasks = (tasks: ITask[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskStore = () => {
	const { subscribe, update } = writable<ITask[]>(getTasks());

	const addTask = (task: ITask) => {
		update((tasks) => {
			const updatedTasks = [...tasks, task];
			setTasks(updatedTasks);

			return updatedTasks;
		});
	};

	const deleteTask = (id: string) => {
		update((tasks) => {
			const updatedTasks = tasks.filter((task) => task.id !== id);

			setTasks(updatedTasks);

			return updatedTasks;
		});
	};

	const setStatus = (status: TTaskStatus, id: string) => {
		update((tasks) => {
			const updatedTasks = tasks.map((task) => {
				if (task.id === id) {
					return {
						...task,
						status
					};
				}
				return task;
			});

			setTasks(updatedTasks);
			return updatedTasks;
		});
	};

	return {
		subscribe,
		deleteTask,
		setStatus,
		addTask
	};
};

export const tasks = createTaskStore();
