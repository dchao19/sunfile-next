reporters =
	process.env.CI === "true"
		? [
				[
					"jest-junit",
					{
						output: "./TEST-result.xml"
					}
				]
		  ]
		: ["default"];

module.exports = {
	moduleFileExtensions: ["ts", "js", "json"],
	transform: {
		"^.+\\.ts$": "ts-jest"
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	testMatch: [
		"**/__tests__/*.(js|jsx|ts|tsx)"
	],
	coverageReporters: ["json", "lcov", "text", "cobertura"],
	reporters
};
