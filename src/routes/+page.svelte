<script>
	import { base } from '$app/paths'
	import { fly } from 'svelte/transition'
	import CountryList from '../lib/CountryList.svelte'

	let countryFilter = ''
	let toyType = 'kramig'

	const toyInfo = {
		kramig: {
			name: 'KRAMIG Panda',
			image: 'https://www.ikea.com/us/en/images/products/kramig-soft-toy-white-black__0162448_pe317642_s5.jpg?f=xxxl'
		},
		djungelskog: {
			name: 'DJUNGELSKOG Panda',
			image: 'https://www.ikea.com/dk/da/images/products/djungelskog-tojdyr-panda__0710188_pe727391_s5.jpg'
		},
		djungelskog_mini: {
			name: 'DJUNGELSKOG Mini Panda',
			image: 'https://www.ikea.com/us/en/images/products/kramig-soft-toy-mini-panda__1388552_pe964844_s5.jpg?f=xl'
		},
		zoo: {
			name: 'ZOO (Assorted Animals)',
			image: 'https://ikeabulgaria.akamaized.net/images/1860x1860/2/variantimages/60402810/0.jpg'
		}
	}

	function setType(newType) {
		toyType = newType
	}
</script>

<svelte:head>
	<title>Panda Radar</title>
	<meta name="title" content="Panda Radar" />
	<meta
		name="description"
		content="Locate IKEA locations that have toy stock"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://github.com/irvm/radar" />
	<meta property="og:title" content="Panda Radar" />
	<meta
		property="og:description"
		content="Locate IKEA locations that have toy stock"
	/>
	<meta property="og:image" content={toyInfo[toyType].image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content="https://github.com/irvm/radar" />
	<meta property="twitter:title" content="Panda Radar" />
	<meta
		property="twitter:description"
		content="Locate IKEA locations that have toy stock"
	/>
	<meta
		property="twitter:image"
		content={toyInfo[toyType].image}
	/>
</svelte:head>

<div class="layout">
	<div class="hero">
		<div class="hero-message">
			<h1>Panda Radar</h1>
			<p>View {toyInfo[toyType].name} stock in various countries</p>
		</div>
		<img class="hero-cover" src="https://www.ikea.com/sa/en/images/products/kramig-soft-toy-white-black__1208792_pe908819_s5.jpg?f=xxxl" alt="Background" />
	</div>
	<div class="main-content">
		<div class="toy-select-buttons">
			<button
				on:click={() => setType('kramig')}
				selected={toyType === 'kramig' || null}>KRAMIG</button
			>
			<button
				on:click={() => setType('djungelskog')}
				selected={toyType === 'djungelskog' || null}>DJUNGELSKOG</button
			>
			<button
				on:click={() => setType('djungelskog_mini')}
				selected={toyType === 'djungelskog_mini' || null}>Mini Panda</button
			>
			<button
				on:click={() => setType('zoo')}
				selected={toyType === 'zoo' || null}>ZOO</button
			>
		</div>
		<div class="display-image-wrapper">
			{#key toyType}
				<div transition:fly={{ x: 800, duration: 400 }} class="display-image">
					<img src={toyInfo[toyType].image} alt={toyInfo[toyType].name} />
				</div>
			{/key}
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
		<p><a href="https://github.com/irvm/radar">view source</a></p>
	</div>
</div>
