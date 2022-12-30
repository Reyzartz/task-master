<script lang="ts">
	import { tasks } from '../stores';
	import type { ITask } from 'src/types';

	export let task: ITask;
</script>

<li class="bg-backgroundSecondary px-4 py-3 rounded-lg border-2 relative">
	<h3 class="text-md font-semibold text-content2">
		{task.title}
	</h3>

	<p class="text-sm text-content3">{task.description}</p>

	<span
		class="absolute top-1 right-3 cursor-pointer"
		on:click={() => tasks.deleteTask(task.id)}
		on:keypress={() => tasks.deleteTask(task.id)}>⤫</span
	>
</li>
