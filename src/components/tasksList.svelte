<script lang="ts">
	import { format, isSameDay, isToday as isTodayFn } from 'date-fns';
	import { tasks } from '../stores';

	export let date: Date;

	const isToday = isTodayFn(date);

	$: currentDayTasks = $tasks.filter(({ task_date }) =>
		isSameDay(date, new Date(task_date))
	);
</script>

<div
	class="flex flex-col first-of-type:rounded-l-lg last-of-type:rounded-r-lg h-full overflow-auto"
>
	<header class="px-3 py-2 border-b border-neutral" class:bg-primary={isToday}>
		<h2
			class="text-lg font-bold leading-none"
			class:text-primary-content={isToday}
		>
			{format(date, 'EEEE')}
		</h2>
		<span
			class="text-xs text-neutral-content"
			class:!text-primary-content={isToday}>{format(date, 'do LLLL')}</span
		>
	</header>

	<ul class="flex flex-col gap-2 p-2 flex-grow overflow-auto">
		{#each currentDayTasks as task (task.id)}
			<slot name="task-item" {task} />
		{/each}
	</ul>
</div>
