module SPAsyncScripting {

	import sod = SP.SOD;

	export interface IAsyncScript{
		load(sync: boolean) : void;
		registerDependency(asyncScripts: SPAsyncScript[]) : void;
		registerDependencyByName(kies: string[]) : void
	}

	export class SPAsyncScript implements IAsyncScript{
		constructor(private key: string, private src: string, private onLoad?: () => any){
			sod.registerSod(this.key, this.src);
		}
		
		private onLoadFunction = () => {
			if (typeof sod.notifyScriptLoadedAndExecuteWaitingJobs === "function") {
				sod.notifyScriptLoadedAndExecuteWaitingJobs(this.key);
			}
			
			if (this.onLoad && typeof this.onLoad === "function") {
				this.onLoad();
			}			
		}
		
		load = (sync: boolean) => {
			sod.loadMultiple([this.key], this.onLoadFunction, sync);
		}
		
		registerDependency = (asyncScripts: SPAsyncScript[]) => {
			asyncScripts.forEach((asyncScript) => {
				sod.registerSodDep(this.key, asyncScript.key);
			});
		}
		
		registerDependencyByName = (kies: string[]) => {
			kies.forEach((key) => {
				sod.registerSodDep(this.key, key);
			});
		}
	}
}