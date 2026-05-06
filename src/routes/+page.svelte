<script>
	import { base } from '$app/paths'
	import { fly } from 'svelte/transition'
	import CountryList from '../lib/CountryList.svelte'

	let countryFilter = ''
	let toyType = 'baby'

	function setType(newType) {
		toyType = newType
	}
</script>

<svelte:head>
	<title>KRAMIG Radar</title>
	<meta name="title" content="KRAMIG Radar" />
	<meta
		name="description"
		content="Locate IKEA locations that have KRAMIG stock"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://github.com/irvm/kramig" />
	<meta property="og:title" content="KRAMIG Radar" />
	<meta
		property="og:description"
		content="Locate IKEA locations that have KRAMIG stock"
	/>
	<meta property="og:image" content="https://www.ikea.com/sa/en/images/products/kramig-soft-toy-white-black__1208792_pe908819_s5.jpg?f=xxxl" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content="https://github.com/irvm/kramig" />
	<meta property="twitter:site" content="@irvm" />
	<meta property="twitter:creator" content="@irvm" />
	<meta property="twitter:title" content="KRAMIG Radar" />
	<meta
		property="twitter:description"
		content="Locate IKEA locations that have KRAMIG stock"
	/>
	<meta
		property="twitter:image"
		content="https://www.ikea.com/sa/en/images/products/kramig-soft-toy-white-black__1208792_pe908819_s5.jpg?f=xxxl"
	/>
</svelte:head>

<div class="layout">
	<div class="hero">
		<div class="hero-message">
			<h1>KRAMIG Radar</h1>
			<p>View KRAMIG stock in various countries</p>
		</div>
		<img class="hero-cover" src="https://www.ikea.com/sa/en/images/products/kramig-soft-toy-white-black__1208792_pe908819_s5.jpg?f=xxxl" alt="KRAMIG" />
	</div>
	<div class="main-content">
		<div class="toy-select-buttons">
			<button
				on:click={() => setType('baby')}
				selected={toyType === 'baby' || null}>KRAMIG Panda</button
			>
			<button
				on:click={() => setType('original')}
				selected={toyType === 'original' || null}>DJUNGELSKOG Mini Panda</button
			>
		</div>
		<div class="display-image-wrapper">
			{#if toyType === 'baby'}
				<div transition:fly={{ x: -800, duration: 400 }} class="display-image">
					<img src="https://www.ikea.com/us/en/images/products/kramig-soft-toy-white-black__0162448_pe317642_s5.jpg?f=xxxl" alt="KRAMIG Panda" />
				</div>
			{:else if toyType === 'original'}
				<div transition:fly={{ x: 800, duration: 400 }} class="display-image">
					<img src="https://www.ikea.com/us/en/images/products/kramig-soft-toy-mini-panda__1388552_pe964844_s5.jpg?f=xl" alt="DJUNGELSKOG Mini Panda" />
				</div>
			{/if}
		</div>
		<input
			type="text"
			class="country-filter-search"
			bind:value={countryFilter}
			placeholder="Search"
			autocomplete="off"
		/>
		<div class="listings-wrapper">
			<CountryList {toyType} {countryFilter} />
		</div>
	</div>
	<div class="links">
		<p><a href="https://github.com/irvm/kramig">view source</a></p>
	</div>
</div>
