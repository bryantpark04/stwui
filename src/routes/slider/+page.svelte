<script lang="ts">
	import { Slider } from '../../lib';
	import { example, exampleType, exampleStep, exampleShowStep, props } from './examples';
	import { PropsTable, CodeBlock, ExampleContainer } from '../../docs';
</script>

<ExampleContainer title="Basic">
	<div slot="preview" class="w-full flex flex-col gap-2 items-center justify-center">
		<Slider value={50} />
	</div>
	<CodeBlock slot="code" language="svelte" code={example} />
</ExampleContainer>

<ExampleContainer title="Type">
	<div slot="preview" class="w-full flex flex-col gap-2 items-center justify-center">
		<Slider value={20} type="info" />

		<Slider value={40} type="warn" />

		<Slider value={60} type="error" />

		<Slider value={80} type="success" />
	</div>
	<CodeBlock slot="code" language="svelte" code={exampleType} />
</ExampleContainer>

<ExampleContainer title="Step">
	<div slot="preview" class="w-full flex flex-col gap-2 items-center justify-center">
		<Slider value={20} type="info" step={25} />
		<br />
		<Slider value={40} type="warn" step={10} />
	</div>
	<CodeBlock slot="code" language="svelte" code={exampleStep} />
</ExampleContainer>

<ExampleContainer title="Show Step">
	<div slot="preview" class="w-full flex flex-col gap-2 items-center justify-center">
		<Slider value={20} type="info" step={25} showStep />
		<br />
		<Slider value={40} type="warn" step={10} showStep />
	</div>
	<CodeBlock slot="code" language="svelte" code={exampleShowStep} />
</ExampleContainer>

<PropsTable component="Slider" {props} />
