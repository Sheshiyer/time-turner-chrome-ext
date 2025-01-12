chrome.runtime.onInstalled.addListener(()=>{console.log("Extension installed")});chrome.runtime.onMessage.addListener((e,s,n)=>(console.log("Message received:",e),n({status:"ok"}),!0));
