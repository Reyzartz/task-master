<script lang="ts">
	import { tasks } from '../stores';
	import type { ITask, TTaskStatus } from '../types';
	import { CheckIcon, XIcon, TrashIcon } from 'svelte-feather-icons';

	export let task: ITask;

	const cardBgColor: Record<TTaskStatus, string> = {
		cancelled: 'bg-error text-error-content',
		completed: 'bg-success  text-success-content',
		ongoing: 'bg-info text-info-content',
		upcoming: 'bg-warning  text-warning-content',
		expired: 'bg-neutral  text-neutral-content'
	};
</script>

<li class="group relative ">
	<div
		class="hidden z-10 absolute group-hover:flex gap-2 top-0 left-0 h-full w-full items-center justify-center bg-[hsla(var(--n)/0.3)] rounded-lg"
	>
		{#if ['ongoing', 'upcoming'].includes(task.status) && !task.has_passed}
			<button
				class="btn btn-success btn-xs btn-circle hover:scale-110 "
				on:click={() => tasks.setStatus('completed', task.id)}
			>
				<CheckIcon size="12" strokeWidth={3} />
			</button>

			<button
				class="btn btn-warning btn-xs btn-circle hover:scale-110"
				on:click={() => tasks.setStatus('cancelled', task.id)}
			>
				<XIcon size="12" strokeWidth={3} />
			</button>
		{/if}

		<button
			class="btn btn-error btn-xs btn-circle hover:scale-110"
			on:click={() => tasks.deleteTask(task.id)}
		>
			<TrashIcon size="12" strokeWidth={3} />
		</button>
	</div>

	<div
		class={`px-4 py-2 rounded-lg ${cardBgColor[task.status]}`}
		class:opacity-50={task.has_passed}
	>
		<h3
			class="text-md font-semibold"
			class:line-through={task.status === 'cancelled'}
		>
			{task.title}
		</h3>

		<p class="text-sm" class:line-through={task.status === 'cancelled'}>
			{task.description}
		</p>
	</div>
</li>
