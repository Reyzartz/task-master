import type { ITask } from 'src/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const getTasks = () => {
	if (browser && localStorage.tasks !== undefined) {
		return JSON.parse(localStorage.tasks);
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

	return {
		subscribe,
		deleteTask,
		addTask
	};
};

export const tasks = createTaskStore();
