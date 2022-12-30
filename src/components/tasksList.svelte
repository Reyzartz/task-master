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
	class="flex flex-col !border first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
	class:border-primary={isToday}
>
	<header class="px-3 py-2 border-b-2" class:border-primary={isToday}>
		<h2
			class="text-lg font-bold text-content1 leading-none"
			class:text-primary={isToday}
		>
			{format(date, 'EEEE')}
		</h2>
		<span class="text-xs text-content2">{format(date, 'do LLLL')}</span>
	</header>

	<ul class="flex flex-col gap-2 p-2 flex-grow ">
		{#each currentDayTasks as task (task.id)}
			<slot name="task-item" {task} />
		{/each}
	</ul>
</div>
