window.SPAsyncScript = (function(){
	"use strict";

	function SPAsyncScript(key, src, onLoadFunction) {
		var e = Function.validateParameters(arguments, [
			{ name: "key", type: String },
			{ name: "src", type: String }
		], false);

		if (e) throw e;

		this.key = key;
		this.src = src;
		var self = this;
		this.onLoadFunction = function() {
			if (typeof NotifyScriptLoadedAndExecuteWaitingJobs === "function") {
				NotifyScriptLoadedAndExecuteWaitingJobs(self.key);
			}

			if (onLoadFunction && typeof onLoadFunction === "function") {
				onLoadFunction();
			}
		};

		RegisterSod(this.key, this.src);
	}

	SPAsyncScript.prototype = {
		constructor: SPAsyncScript,
		registerDependency: function (asyncScripts) {
			var e = Function.validateParameters(arguments, [
				{ name: "asyncScripts", type: Array, elementType: SPAsyncScript }
			]);

			if (e) throw e;

			Array.forEach(asyncScripts, function (asyncScript) {
				RegisterSodDep(this.key, asyncScript.key);
			}, this);
		},
		registerDependencyByName: function (kies) {
			var e = Function.validateParameters(arguments, [
				{ name: "kies", type: Array, elementType: String }
			]);

			if (e) throw e;

			Array.forEach(kies, function (key) {
				RegisterSodDep(this.key, key);
			}, this);
		},
		load: function () {
			LoadSodByKey(this.key, this.onLoadFunction);
		}
	};
	
	return SPAsyncScript;
})();
