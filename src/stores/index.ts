import type { ITask } from "src/types";
import { writable } from "svelte/store"

const createTaskStore = () => {
    const {subscribe,update} = writable<ITask[]>([])

    const addTask = (task:ITask) => {
        update((tasks)=>[
			...tasks,
			task
		])  
	};

    const deleteTask = (id: string) => {
        update((tasks)=>tasks.filter((task) => task.id !== id))
	};


    return {
        subscribe,
        deleteTask,
        addTask
    }
}

export const tasks = createTaskStore()