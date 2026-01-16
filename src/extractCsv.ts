import * as fs from "fs"
import path from "path"
import { Customer, Order, Product, Promotion, ShippingZone } from "./type"

export default function extractCsv(): Record<any, any> {
	const base = process.cwd()
	const custPath = path.join(base, "legacy/data", "customers.csv")
	const ordPath = path.join(base, "legacy/data", "orders.csv")
	const prodPath = path.join(base, "legacy/data", "products.csv")
	const shipPath = path.join(base, "legacy/data", "shipping_zones.csv")
	const promoPath = path.join(base, "legacy/data", "promotions.csv")

	// Lecture fichier customers (parsing mélangé avec logique)
	const customers: Record<string, Customer> = {}
	const custData = fs.readFileSync(custPath, "utf-8")
	const custLines = custData.split("\n").filter((l) => l.trim())
	for (let i = 1; i < custLines.length; i++) {
		const parts = custLines[i].split(",")
		const id = parts[0]
		customers[id] = {
			id: parts[0],
			name: parts[1],
			level: parts[2] || "BASIC",
			shipping_zone: parts[3] || "ZONE1",
			currency: parts[4] || "EUR",
		}
	}

	// Lecture fichier products (duplication du parsing)
	const products: Record<string, Product> = {}
	const prodData = fs.readFileSync(prodPath, "utf-8")
	const prodLines = prodData.split("\n").filter((l) => l.trim())
	for (let i = 1; i < prodLines.length; i++) {
		const parts = prodLines[i].split(",")
		products[parts[0]] = {
			id: parts[0],
			name: parts[1],
			category: parts[2],
			price: parseFloat(parts[3]),
			weight: parseFloat(parts[4] || "1.0"),
			taxable: parts[5] === "true",
		}
	}

	// Lecture shipping zones (encore une autre variation du parsing)
	const shippingZones: Record<string, ShippingZone> = {}
	const shipData = fs.readFileSync(shipPath, "utf-8")
	const shipLines = shipData.split("\n").filter((l) => l.trim())
	for (let i = 1; i < shipLines.length; i++) {
		const p = shipLines[i].split(",")
		shippingZones[p[0]] = {
			zone: p[0],
			base: parseFloat(p[1]),
			per_kg: parseFloat(p[2] || "0.5"),
		}
	}

	// Lecture promotions (parsing légèrement différent encore)
	const promotions: Record<string, Promotion> = {}
	const promoData = fs.readFileSync(promoPath, "utf-8")
	const promoLines = promoData.split("\n").filter((l) => l.trim())
	for (let i = 1; i < promoLines.length; i++) {
		const p = promoLines[i].split(",")
		promotions[p[0]] = {
			code: p[0],
			type: p[1], // PERCENTAGE ou FIXED
			value: p[2],
			active: p[3] !== "false",
		}
	}

	// Lecture orders (parsing avec try/catch mais logique mélangée)
	const orders: Order[] = []
	const ordData = fs.readFileSync(ordPath, "utf-8")
	const ordLines = ordData.split("\n").filter((l) => l.trim())
	for (let i = 1; i < ordLines.length; i++) {
		const parts = ordLines[i].split(",")
		const qty = parseInt(parts[3])
		const price = parseFloat(parts[4])

		orders.push({
			id: parts[0],
			customer_id: parts[1],
			product_id: parts[2],
			qty: qty,
			unit_price: price,
			date: parts[5],
			promo_code: parts[6] || "",
			time: parts[7] || "12:00",
		})
	}
	return { customers, products, shippingZones, promotions, orders }
}
