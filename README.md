# SPAsyncScript  

---  

This small JavaScript file can help you implement SOD (Script On Demand) solution for your own (or even external) scripts.  

## Examples  

---  

Register your script:    

```javascript
var coreScript = new AsyncScript("faq.core", coreScriptSrc, function () { $("#head").replaceWith(FAQRS.PageTitle); });
```
  
---  
### TypeScript version coming soon....