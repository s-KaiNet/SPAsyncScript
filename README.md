# SPAsyncScript  

---

This small JavaScript file can help you implement SharePoint SOD (Script On Demand) solution for your own (or even external) scripts.  

## Examples  



Register your script:  

```
var asyncScript = new SPAsyncScript(name, src, scriptLoadedCallback);
```
  
`name` - required, unique script name  
`src` - required, script src, any valid value for javascript src is acceptable  
`scriptLoadedCallback` - optional, this function will be called when your script will be loaded  

Explicitly load your script:    
 
```
asyncScript.load(sync);
```    

`sync` - optional, if true script will be loaded synchronously  

You can also register a dependency on other scripts (including out-of-the-box):    

```
var coreScript = new SPAsyncScript("myApp.core", coreSrc);
asyncScript.registerDependency([coreScript]);  
asyncScript.registerDependencyByName(["sp.js", "sp.runtime.js"]);
```    

Your script will be loaded after the `sp.js`, `sp.runtime.js`, `coreScript`.   

Additionally you can use `ExecuteOrDelayUntilScriptLoaded` function in order to execute some code when your script will be loaded:   

```
ExecuteOrDelayUntilScriptLoaded(function () {
	alert("My app script loaded!");
}, "myApp.core");
```

