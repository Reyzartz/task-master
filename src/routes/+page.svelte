<script lang="ts">
	import '../styles/app.css';
	import TaskItem from '../components/taskItem.svelte';
	import TasksList from '../components/tasksList.svelte';
	import { tasks } from '../stores';
	import AddTaskModal from '../components/addTaskModal.svelte';
	import { addDays, startOfWeek, subDays } from 'date-fns';

	const today = new Date();

	const weekDays = [...Array(7)].map((_, ind) => addDays(startOfWeek(today), ind));

	let showModal = false;
</script>

<main class="p-6 bg-backgroundPrimary h-screen w-screen relative flex flex-col">
	<h1 class="text-3xl text-center font-semibold text-gray-900 mb-6">Weekly Planer</h1>

	<button class="btn hover:bg-backgroundSecondary font-semibold" on:click={() => (showModal = true)}
		>+ Add task</button
	>

	<AddTaskModal
		open={showModal}
		closeModal={() => {
			showModal = false;
		}}
	/>

	<div class="grid border rounded-lg divide-x grid-cols-7 flex-grow">
		{#each weekDays as day, index (index)}
			<TasksList date={day}>
				{#each $tasks as task (task.id)}
					<TaskItem {task} />
				{/each}
			</TasksList>
		{/each}
	</div>
</main>
