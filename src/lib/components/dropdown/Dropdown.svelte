<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { clickOutside, floatingUI } from '../../actions';
	import { get_current_component, setContext } from 'svelte/internal';
	import { forwardEventsBuilder, useActions, type ActionArray } from '../../actions';
	export let use: ActionArray = [];
	import { exclude } from '../../utils/exclude';
	const forwardEvents = forwardEventsBuilder(get_current_component());

	export let visible = false;

	function handleClose() {
		visible = false;
	}

	setContext('dropdown-handleClose', handleClose);

	const defaultClass = 'relative inline-block';
	$: finalClass = twMerge(defaultClass, $$props.class);
</script>

<div
	class={finalClass}
	use:clickOutside={handleClose}
	use:useActions={use}
	use:forwardEvents
	{...exclude($$props, ['use', 'class'])}
>
	<div class="floating-ui-ref">
		<slot name="trigger" />
	</div>
	{#if visible}
		<slot name="items" />
	{/if}
</div>
