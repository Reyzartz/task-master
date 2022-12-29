<script lang="ts">
	import { tasks } from '../stores';

	export let open: boolean, closeModal: () => void;

	let title: string,
		description: string = '';

	const onSubmitHandler = () => {
		tasks.addTask({
			id: crypto.randomUUID(),
			title,
			description
		});

		title = '';
		description = '';

		closeModal();
	};
</script>

{#if open}
	<div class="absolute h-screen w-screen bg-[#0007] top-0 left-0" />
{/if}

<dialog {open} class="bg-backgroundPrimary rounded-lg w-96 p-0 z-50">
	<form on:submit|preventDefault={onSubmitHandler} class="divide-y">
		<header class=" px-5 py-4">
			<h3 class="text-xl font-semibold text-content1">Add new task</h3>
			<span
				class="absolute top-2 right-4 cursor-pointer text-2xl"
				on:click={closeModal}
				on:keypress={closeModal}>⤫</span
			>
		</header>

		<div class=" p-5 pb-8 space-y-4">
			<div>
				<label for="title" class="text-sm font-semibold mb-1.5 block text-content2">
					Task title
				</label>

				<input
					name="title"
					class="input input-sm input-ghost-primary text-content1"
					placeholder="Enter task title"
					bind:value={title}
					required
				/>
			</div>

			<div>
				<label for="description" class="text-sm font-semibold mb-1.5 block text-content2">
					Task Description
				</label>

				<input
					name="description"
					class="input input-sm input-ghost-primary text-content1"
					placeholder="Enter task description"
					bind:value={description}
				/>
			</div>

			<input class="input" type="date" />
		</div>

		<div class="px-5 py-3 flex justify-end">
			<button class="btn btn-primary" type="submit">Add Task</button>
		</div>
	</form>
</dialog>
