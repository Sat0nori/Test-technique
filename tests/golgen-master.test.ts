import { execSync } from "child_process"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

const legacyCode = "npm run legacy --silent"
const refactoCode = "npm run refacto --silent"
const legacyReport = join(__dirname, "../legacy/expected/report.txt")

function run(cmd: string): string {
	return execSync(cmd, { encoding: "utf-8" }).replace(/\r\n/g, "\n") // normalisation CRLF
}

describe("Golden master test", () => {
	it("should be the same", () => {
		const legacy = run(legacyCode)

		if (!existsSync(legacyReport)) {
			writeFileSync(legacyReport, legacy)
			throw new Error("report creer, relancer le test")
		}

		const legacyOutput = readFileSync(legacyReport, "utf-8")
		const refactoOutput = run(refactoCode)

		expect(refactoOutput).toBe(legacyOutput)
	})
})
