reporters =
	process.env.CI === "true"
		? [
				[
					"jest-tap-reporter",
					{
						logLevel: "INFO",
						showInternalStackTraces: true,
						filePath: "output.tap"
					}
				]
		  ]
		: undefined;

module.exports = {
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "vue"],
	transform: {
		"^.+\\.vue$": "vue-jest",
		".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
			"jest-transform-stub",
		"^.+\\.tsx?$": "ts-jest"
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	snapshotSerializers: ["jest-serializer-vue"],
	testMatch: [
		"**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
	],
	coverageReporters: ["json", "lcov", "text", "cobertura"],
	reporters
};
