import extractCsv from "./extractCsv"

const { orders, products, promotions } = extractCsv()

// Groupement par client (logique métier mélangée avec aggregation)
export default function discount() {
	const totalsByCustomer: Record<string, any> = {}
	for (const o of orders) {
		const cid = o.customer_id

		// Récupération du produit avec fallback
		const prod = products[o.product_id] || {}
		let basePrice = prod.price !== undefined ? prod.price : o.unit_price

		// Application de la promo (logique complexe et bugguée)
		const promoCode = o.promo_code
		let discountRate = 0
		let fixedDiscount = 0

		if (promoCode && promotions[promoCode]) {
			const promo = promotions[promoCode]
			if (promo.active) {
				if (promo.type === "PERCENTAGE") {
					discountRate = parseFloat(promo.value) / 100
				} else if (promo.type === "FIXED") {
					// Bug intentionnel: appliqué par ligne au lieu de global
					fixedDiscount = parseFloat(promo.value)
				}
			}
		}

		// Calcul ligne avec réduction promo
		let lineTotal = o.qty * basePrice * (1 - discountRate) - fixedDiscount * o.qty

		// Bonus matin (règle cachée basée sur l'heure)
		const hour = parseInt(o.time.split(":")[0])
		let morningBonus = 0
		if (hour < 10) {
			morningBonus = lineTotal * 0.03 // 3% de réduction supplémentaire
		}
		lineTotal = lineTotal - morningBonus

		if (!totalsByCustomer[cid]) {
			totalsByCustomer[cid] = {
				subtotal: 0.0,
				items: [],
				weight: 0.0,
				promoDiscount: 0.0,
				morningBonus: 0.0,
			}
		}

		totalsByCustomer[cid].subtotal += lineTotal
		totalsByCustomer[cid].weight += (prod.weight || 1.0) * o.qty
		totalsByCustomer[cid].items.push(o)
		totalsByCustomer[cid].morningBonus += morningBonus
	}

	return totalsByCustomer
}
