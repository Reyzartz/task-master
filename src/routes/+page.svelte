<script lang="ts">
	import '../styles/app.css';
	import AddTaskModal from '../components/addTaskModal.svelte';
	import TaskItem from '../components/taskItem.svelte';
	import TasksList from '../components/tasksList.svelte';
	import WeeklyRange from '../components/weeklyRange.svelte';
	import { addDays, startOfWeek } from 'date-fns';

	const today = new Date();

	let weekOffset = 0;
	let showModal = false;

	$: weekDays = [...Array(7)].map((_, ind) =>
		addDays(startOfWeek(today), ind + weekOffset * 7)
	);
</script>

<main
	class="p-6 bg-base-100 max-h-screen  h-screen w-screen relative flex flex-col"
>
	<h1 class="text-3xl font-semibold mb-4 text-content1">Weekly Planer</h1>

	<div class="flex justify-between mb-4 items-end">
		<WeeklyRange {weekOffset} setOffset={(val) => (weekOffset = val)} />

		<button
			class="btn btn-primary btn-outline"
			on:click={() => (showModal = true)}>+ Add task</button
		>
	</div>

	<div
		class="grid border divide-x border-neutral divide-neutral rounded-lg grid-cols-7 flex-grow max-h-full overflow-scroll"
	>
		{#each weekDays as day (day)}
			<TasksList date={day}>
				<TaskItem let:task {task} slot="task-item" />
			</TasksList>
		{/each}
	</div>

	<AddTaskModal
		open={showModal}
		closeModal={() => {
			showModal = false;
		}}
	/>
</main>
