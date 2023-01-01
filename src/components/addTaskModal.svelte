<script lang="ts">
	import { format, isToday } from 'date-fns';
	import { tasks } from '../stores';
	import { XIcon } from 'svelte-feather-icons';

	export let open: boolean, closeModal: () => void;

	let title: string,
		description: string = '',
		taskDate = format(new Date(), 'Y-MM-dd');

	const onSubmitHandler = () => {
		tasks.addTask({
			id: crypto.randomUUID(),
			title,
			description,
			task_date: taskDate,
			status: isToday(new Date(taskDate)) ? 'ongoing' : 'upcoming',
			has_passed: false
		});

		title = '';
		description = '';
		taskDate = format(new Date(), 'Y-MM-dd');

		closeModal();
	};
</script>

{#if open}
	<div class="absolute h-screen w-screen bg-[#0007] top-0 left-0" />
{/if}

<dialog {open} class="bg-base-100 rounded-lg w-[496px] p-0 z-50 top-32">
	<form
		on:submit|preventDefault={onSubmitHandler}
		class="divide-y divide-neutral"
	>
		<header class="px-5 py-4">
			<h3 class="text-xl font-semibold text-base-content">Add new task</h3>

			<button
				class="btn btn-sm btn-square absolute top-4 right-4"
				on:click={closeModal}
				on:keypress={closeModal}
			>
				<XIcon size="16" />
			</button>
		</header>

		<div class=" p-5 pb-8 space-y-4">
			<div>
				<label for="title" class="text-sm font-semibold mb-1.5 block">
					Task title
				</label>

				<input
					name="title"
					class="input w-full input-bordered"
					placeholder="Enter task title"
					bind:value={title}
					required
				/>
			</div>

			<div>
				<label for="description" class="text-sm font-semibold mb-1.5 block">
					Task Description
				</label>

				<input
					name="description"
					class="input w-full input-bordered"
					placeholder="Enter task description"
					bind:value={description}
				/>
			</div>

			<div>
				<label for="task_date" class="text-sm font-semibold mb-1.5 block"
					>Task Date</label
				>
				<input
					name="task_date"
					class="input w-full input-bordered"
					type="date"
					min={format(new Date(), 'Y-MM-dd')}
					bind:value={taskDate}	
				/>
			</div>
		</div>

		<div class="p-5 flex justify-end">
			<button class="btn btn-primary" type="submit">Create Task</button>
		</div>
	</form>
</dialog>
