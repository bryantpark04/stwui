import type { Slot, Prop } from '../../docs';

export const props: Prop[] = [
	{
		id: '1',
		prop: 'name',
		type: 'string',
		default: ''
	},
	{
		id: '2',
		prop: 'error',
		type: 'string | undefined',
		default: ''
	},
	{
		id: '3',
		prop: 'placholder',
		type: 'string | undefined',
		default: ''
	},
	{
		id: '4',
		prop: 'value',
		type: 'string | undefined',
		default: ''
	},
	{
		id: '5',
		prop: 'autocomplete',
		type: "'on' | 'off' | undefined",
		default: ''
	},
	{
		id: '6',
		prop: 'autocapitalize',
		type: "'off' | 'none' | 'sentences' | 'words' | 'characters'",
		default: 'off'
	},
	{
		id: '7',
		prop: 'readonly',
		type: 'true | undefined',
		default: ''
	},
	{
		id: '8',
		prop: 'disabled',
		type: 'boolean',
		default: 'false'
	}
];

export const slots: Slot[] = [
	{
		id: '1',
		slot: 'label',
		component: '<TextArea.Label slot="label" />'
	}
];

export const labelSlots: Slot[] = [
	{
		id: '1',
		slot: 'default',
		component: ''
	}
];

export const example = `
<script lang="ts">
	import { TextArea } from 'stwui';

	let value: string | undefined;
	let error: string | undefined = "You're doing it wrong!";
	$: if (value && value.length > 0) {
		error = undefined;
	} else {
		error = "You're doing it wrong!";
	}
</script>

<TextArea name="text-area-1" placeholder="Basic" />

<TextArea name="text-area-2">
	<TextArea.Label slot="label">Label</TextArea.Label>
</TextArea>

<TextArea name="text-area-3" {error} bind:value>
	<TextArea.Label slot="label">Label</TextArea.Label>
</TextArea>`;

export const kitchenExample = `
<script lang="ts">
	import { TextArea, Dropdown, Button } from 'stwui';

	let value: string | undefined;
	let dropdown1 = false;
	let dropdown2 = false;

	function toggleDropdown1() {
		dropdown1 = !dropdown1;
	}

	function toggleDropdown2() {
		dropdown2 = !dropdown2;
	}
</script>

<TextArea name="input" placeholder="Description">
	<TextArea.Label slot="label">Label</TextArea.Label>
	<TextArea.Title slot="title" name="title" placeholder="Title" />
	<TextArea.Pills slot="pills">
		<Dropdown bind:visible={dropdown1}>
			<Button
				slot="trigger"
				type="default"
				shape="pill"
				size="sm"
				class="shadow-none"
				on:click={toggleDropdown1}
			>
				<Button.Leading slot="leading" data={account} />
				Assign</Button
			>
			<Dropdown.Items slot="items">
				<Dropdown.Items.Item on:click={toggleDropdown1} label="Person One">
					<Dropdown.Items.Item.Icon slot="icon" data={account} />
				</Dropdown.Items.Item>
				<Dropdown.Items.Item on:click={toggleDropdown1} label="Person Two">
					<Dropdown.Items.Item.Icon slot="icon" data={account} />
				</Dropdown.Items.Item>
				<Dropdown.Items.Item on:click={toggleDropdown1} label="Person Three">
					<Dropdown.Items.Item.Icon slot="icon" data={account} />
				</Dropdown.Items.Item>
			</Dropdown.Items>
		</Dropdown>

		<Dropdown bind:visible={dropdown2}>
			<Button
				slot="trigger"
				type="default"
				shape="pill"
				size="sm"
				class="shadow-none"
				on:click={toggleDropdown2}
			>
				<Button.Leading slot="leading" data={calendar} />
				Due Date</Button
			>
			<Dropdown.Items slot="items">
				<Dropdown.Items.Item on:click={toggleDropdown1} label="Today">
					<Dropdown.Items.Item.Icon slot="icon" data={calendar} />
				</Dropdown.Items.Item>
				<Dropdown.Items.Item on:click={toggleDropdown1} label="Tomorrow">
					<Dropdown.Items.Item.Icon slot="icon" data={calendar} />
				</Dropdown.Items.Item>
			</Dropdown.Items>
		</Dropdown>
	</TextArea.Pills>
	<TextArea.Actions slot="actions">
		<div />
		<Button type="primary">Submit</Button>
	</TextArea.Actions>
</TextArea>`;
