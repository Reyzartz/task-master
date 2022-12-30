<script lang="ts">
	import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';

	export let setOffset: (val: number) => void, weekOffset: number;

	$: startDate = format(
		startOfWeek(addDays(new Date(), weekOffset * 7)),
		'do MMMM'
	);
	$: endDate = format(
		endOfWeek(addDays(new Date(), weekOffset * 7)),
		'do MMMM'
	);
</script>

<div class="flex items-center gap-4 w-[324px] justify-between">
	<button class="btn btn-sm" on:click={() => setOffset(weekOffset - 1)}>
		❮
	</button>

	<span class="text-sm text-content2 font-semibold">
		{startDate} - {endDate}
	</span>

	<button class="btn btn-sm" on:click={() => setOffset(weekOffset + 1)}>
		❯
	</button>
</div>

{#if weekOffset !== 0}
	<button class="btn btn-sm mr-auto ml-3" on:click={() => setOffset(0)}>
		Today
	</button>
{/if}
