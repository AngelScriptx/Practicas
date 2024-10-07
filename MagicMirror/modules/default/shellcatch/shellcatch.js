Module.register("shellcatch", {
	// Default module config.
	defaults: {
		text: "Shellcatch Monitoring"
	},

	getTemplate () {
		return "shellcatch.njk";
	},

	getTemplateData () {
		return this.config;
	}
});
