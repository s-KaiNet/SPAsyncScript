window.SPAsyncScript = (function(){
	"use strict";

	function SPAsyncScript(key, src, onLoadFunction) {
		var e = Function.validateParameters(arguments, [
			{ name: "key", type: String },
			{ name: "src", type: String },
			{ name: "onLoadFunction", type: Function, optional: true }
		], false);

		if (e) throw e;

		this.key = key;
		this.src = src;
		var self = this;
		this.onLoadFunction = function() {
			if (typeof SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs === "function") {
				SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs(self.key);
			}

			if (onLoadFunction && typeof onLoadFunction === "function") {
				onLoadFunction();
			}
		};

		SP.SOD.registerSod(this.key, this.src);
	}

	SPAsyncScript.prototype = {
		constructor: SPAsyncScript,
		registerDependency: function (asyncScripts) {
			var e = Function.validateParameters(arguments, [
				{ name: "asyncScripts", type: Array, elementType: SPAsyncScript }
			]);

			if (e) throw e;

			Array.forEach(asyncScripts, function (asyncScript) {
				SP.SOD.registerSodDep(this.key, asyncScript.key);
			}, this);
		},
		registerDependencyByName: function (kies) {
			var e = Function.validateParameters(arguments, [
				{ name: "kies", type: Array, elementType: String }
			]);

			if (e) throw e;

			Array.forEach(kies, function (key) {
				SP.SOD.registerSodDep(this.key, key);
			}, this);
		},
		load: function (sync) {
			var e = Function.validateParameters(arguments, [
				{ name: "sync", type: Boolean, optional: true }
			], false);

			if (e) throw e;
			
			SP.SOD.loadMultiple([this.key], this.onLoadFunction, sync);
		}
	};
	
	return SPAsyncScript;
})();
