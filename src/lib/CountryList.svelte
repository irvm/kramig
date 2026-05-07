<script>
	import ikeaData from '$lib/store-data.js'
	import CountryListings from '$lib/CountryListings.svelte'
	import { fly } from 'svelte/transition'
	export let toyType = 'original'

	let filteredCountries
	export let countryFilter = ''
	$: {
		// reactivity hack:
		// eslint-disable-next-line no-self-assign
		countryFilter = countryFilter
		// eslint-disable-next-line no-self-assign
		toyType = toyType
		filteredCountries = ikeaData
			.map(filterCountry)
			.sort((a, b) => b.points - a.points)
			.filter(e => e.points >= 10)
	}
	function filterCountry(countryData) {
		const available = typeof countryData.itemUrls?.[toyType] != 'undefined'
		if (countryFilter == '')
			return {
				...countryData,
				points: available ? (!countryData.cantCheckAutomatically ? 15 : 12) : 10
			}
		const countryFilterKeywords = countryFilter.toLowerCase().split(/\s/gm)
		let points = 0
		for (const keyword of countryFilterKeywords) {
			let foundKeyword = false
			if (countryData.name.toLowerCase().includes(keyword)) {
				points += 20
				foundKeyword = true
			}
			if (
				countryData.stores?.find(e => e.name.toLowerCase().includes(keyword))
			) {
				points += 10
				foundKeyword = true
			}
			if (
				countryData.stores?.find(e => e.address.toLowerCase().includes(keyword))
			) {
				points += 5
				foundKeyword = true
			}
			if (!foundKeyword) points = -99999
		}
		return {
			...countryData,
			points
		}
	}
</script>

<div class="listings">
	{#each filteredCountries as countryData (countryData.name + toyType)}
		<div transition:fly={{ x: 800, duration: 400 }}>
			<CountryListings {countryData} itemType={toyType} />
		</div>
	{/each}
</div>
