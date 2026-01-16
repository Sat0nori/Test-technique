import * as fs from "fs"
import path from "path"

export function JsonOutput(cid: string, name: string, total: number, currency: string, pts: number): void {
	const jsonData: any[] = []

	// Export JSON en parallèle (side effect)
	jsonData.push({
		customer_id: cid,
		name: name,
		total: total,
		currency: currency,
		loyalty_points: Math.floor(pts),
	})

	// Export JSON surprise
	const outputPath = path.join(process.cwd(), "src", "output.json")
	fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2))
}
