<script lang="ts">
	import { data } from '../../search-data';
	import { Modal, Portal, Icon, Button, Empty } from '../../../lib';
	import { goto } from '$app/navigation';
	import { scale } from 'svelte/transition';
	import Kbd from '../kbd/Kbd.svelte';
	import {
		format_list_numbered,
		function_variant,
		lightning_bolt_circle,
		magnify,
		toggle_switch
	} from '../../icons';
	import { close, info } from '../../../lib/icons';
	import { BROWSER } from 'esm-env';
	import HoverBackground from '$lib/components/HoverBackground.svelte';

	let input: HTMLInputElement;

	export let open = false;

	function handleClose() {
		open = false;
		value = '';
		filteredData = data;
	}

	function handleOpen() {
		open = true;
	}

	let filteredData = data;
	let selectedIndex: number | undefined = undefined;

	let value = '';

	function filterData(e: Event) {
		if (value) {
			filteredData = data.filter((opt) => opt.name.toLowerCase().includes(value.toLowerCase()));
		} else {
			filteredData = data;
		}
		selectedIndex = undefined;
	}

	function handleSelect(href: string) {
		goto(href);
		open = false;
	}

	function handleClear() {
		input.focus();
		input.value = '';
		value = '';
		filteredData = data;
	}

	let os = 'Unknown';

	function handleKeyDown(e: KeyboardEvent) {
		if (os === 'MacOS') {
			if (e.key === 'k' && e.metaKey) {
				open = true;
			}
		} else {
			if (e.key === 'k' && e.ctrlKey) {
				open = true;
			}
		}

		if (filteredData.length < 1) {
			selectedIndex = undefined;
			return;
		}

		if (e.key === 'ArrowDown') {
			if (selectedIndex != null && selectedIndex < filteredData.length - 1) {
				selectedIndex += 1;
			} else {
				selectedIndex = 0;
			}
			e.preventDefault();
			e.stopPropagation();
		} else if (e.key === 'ArrowUp') {
			if (selectedIndex) {
				selectedIndex -= 1;
			} else {
				selectedIndex = filteredData.length - 1;
			}
			e.preventDefault();
			e.stopPropagation();
		} else if (e.key === 'Enter' && selectedIndex != null && filteredData.length > 0) {
			handleSelect(filteredData[selectedIndex].href);
			e.preventDefault();
			e.stopPropagation();
		}

		const option = document.getElementById(`option-${selectedIndex}`);
		const searchModal = document.getElementById(`search-modal`);
		if (!option || !searchModal) return;

		const item = option.getBoundingClientRect();
		const container = searchModal.getBoundingClientRect();

		if (item.top < container.top || item.bottom > container.bottom) {
			option.scrollIntoView({
				behavior: 'smooth'
			});
		}
	}

	$: if (open && BROWSER && input) {
		input.focus();
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<Button
	ariaLabel="open search"
	on:click={handleOpen}
	shape="circle"
	class="flex ml-4 bg-default text-default-content"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="svg-icon inline-block outline-none stroke-current h-5 w-5 fill-current"
	>
		<title>magnify</title>
		<path
			d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
		/>
	</svg>
</Button>

{#if open}
	<Portal>
		<Modal {handleClose}>
			<Modal.Content
				id="search-modal"
				class="mx-auto max-w-xl transform divide-y divide-border overflow-hidden rounded-xl bg-surface shadow-2xl"
			>
				<div class="relative">
					<span>
						<Icon
							data={magnify}
							class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-secondary-content"
						/>
					</span>
					<input
						bind:this={input}
						type="text"
						class="h-12 w-full border-0 bg-transparent pl-11 pr-10 text-secondary-content placeholder-secondary-content placeholder-opacity-80 focus:ring-0 sm:text-sm"
						placeholder="Search..."
						role="combobox"
						aria-expanded="false"
						aria-controls="options"
						bind:value
						on:input={filterData}
					/>
					{#if value && value.length > 0}
						<button
							transition:scale|local
							class="absolute inset-y-0 right-16 items-center cursor-pointer flex active:flex"
							on:click={handleClear}
							on:keypress
						>
							<span class="text-content">
								<Icon data={close} />
							</span>
						</button>
					{/if}

					<Kbd class="absolute inset-y-0 right-4 top-2.5 flex items-center justify-center h-[26px]">
						esc
					</Kbd>
				</div>

				{#if filteredData.length > 0}
					<ul class="max-h-96 scroll-py-3 overflow-y-auto p-3" id="options" role="listbox">
						{#each filteredData as item, index}
							<li
								class="group relative flex cursor-pointer select-none rounded-xl p-3 overflow-hidden"
								class:bg-hover={index === selectedIndex}
								id={`option-${index}`}
								tabindex="-1"
							>
								<button
									type="button"
									class="h-full flex justify-start text-left"
									on:click={() => handleSelect(item.href)}
								>
									<div
										class="flex h-10 w-10 flex-none items-center justify-center rounded-lg"
										class:bg-info={item.type === 'Component'}
										class:bg-success={item.type === 'Guide'}
										class:bg-warn={item.type === 'Action'}
										class:bg-error={item.type === 'Utility'}
										class:text-info-content={item.type === 'Component'}
										class:text-success-content={item.type === 'Guide'}
										class:text-warn-content={item.type === 'Action'}
										class:text-error-content={item.type === 'Utility'}
									>
										{#if item.type === 'Component'}
											<Icon data={toggle_switch} />
										{:else if item.type === 'Guide'}
											<Icon data={format_list_numbered} />
										{:else if item.type === 'Action'}
											<Icon data={lightning_bolt_circle} />
										{:else if item.type === 'Utility'}
											<Icon data={function_variant} />
										{/if}
									</div>
									<div class="ml-4 flex-auto">
										<h4 class="font-medium text-content">
											{item.name}
										</h4>
										<p class="text-xs text-secondary-content">
											{item.type}
										</p>
									</div>
									<HoverBackground class="rounded-xl" />
								</button>
							</li>
						{/each}
					</ul>
				{:else}
					<Empty>
						<Empty.Icon slot="icon" data={info} />
						<Empty.Title slot="title">No results found</Empty.Title>
						<Empty.Description slot="description"
							>No results found for this search. Please try again.</Empty.Description
						>
					</Empty>
				{/if}
			</Modal.Content>
		</Modal>
	</Portal>
{/if}
