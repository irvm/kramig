import fs from 'fs'
import fetch from 'node-fetch'

import { ikeaData } from './basic-store-data.js'

for (const [i, country] of Object.entries(ikeaData)) {
	const percentage = (((parseInt(i) + 1) / ikeaData.length) * 100).toFixed(2)

	if ((country.apiType ?? 0) != 0 || country.cantCheckUrls) {
		console.log(
			`${percentage}% complete  \tskipping all checks for ${
				country.abbrv ?? country.name
			} (can't check urls)`
		)
		continue
	}

	ikeaData[i].itemUrls = {}

	if (country.itemIds.original) {
		const itemPageHtml = await (
			await fetch(
				`https://www.ikea.com/${country.urlCode}/p/djungelskog-${country.itemIds.original}/`
			)
		).text()
		const match = itemPageHtml.match(
			/<meta (?:[^<>]*?)?property="og:url" content="(.*?)"\/?>/
		)
		ikeaData[i].itemUrls.original = match?.[1]
	}
	if (country.itemIds.baby) {
		const itemPageHtml = await (
			await fetch(
				`https://www.ikea.com/${country.urlCode}/p/kramig-${country.itemIds.baby}/`
			)
		).text()
		const match = itemPageHtml.match(
			/<meta (?:[^<>]*?)?property="og:url" content="(.*?)"\/?>/
		)
		ikeaData[i].itemUrls.baby = match?.[1]
	}

	if (country.cantCheckAutomatically) {
		console.log(
			`${percentage}% complete  \tskipping stores for ${
				country.abbrv ?? country.name
			} (can't check automatically)`
		)
		continue
	}

	const storesResp = await fetch(
		`https://www.ikea.com/${country.urlCode}/meta-data/informera/stores-detailed.json`
	)

	let stores
	if (!storesResp.ok) {
		const text = await storesResp.text()
		console.error('response:', text)
		throw new Error(`Failed to request stores for ${country.urlCode}`)
	}
	try {
		stores = await storesResp.json()
	} catch (error) {
		console.error(`Failed to request stores for ${country.urlCode}`)
		throw error
	}

	ikeaData[i].stores = stores.map(e => {
		return {
			value: e.id,
			name: e.displayName,
			address: e.address.street,
			displayAddress: e.address.displayAddress
		}
	})

	console.log(
		`${percentage}% complete  \tfinished retrieving stores for ${
			country.abbrv ?? country.name
		}`
	)
}

console.log('Sorting entries')

ikeaData.sort((a, b) => a.name.localeCompare(b.name))

console.log('Complete, saving to file')

fs.promises.writeFile(
	'src/lib/store-data.js',
	'export default ' + JSON.stringify(ikeaData)
)

console.log('Success')
