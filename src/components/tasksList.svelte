<script lang="ts">
	import { format, isSameDay } from 'date-fns';

	export let date: Date;

	const isToday = isSameDay(new Date(), date);
</script>

<div class="flex flex-col !border" class:border-primary={isToday}>
	<header class="px-3 py-2 border-b-2">
		<h2 class="text-lg font-bold text-primary leading-none" class:text-primary={isToday}>
			{format(date, 'EEEE')}
		</h2>
		<span class="text-xs text-content2">{format(date, 'do LLLL')}</span>
	</header>

	<ul class="flex flex-col gap-2 p-2  flex-grow">
		<slot>No task found</slot>
	</ul>
</div>
