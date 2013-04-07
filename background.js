/*
   Compat-Inspector (http://ie.microsoft.com/testdrive/HTML5/CompatInspector/) extension for Opera
   Copyright 2012 © by Alexandr Zhuravlev
*/
(function(){
	var LOG = 0;
	
	function getEnable() {
		var enable = widget.preferences.getItem("enable") ;
		if (typeof enable == "undefined" || enable == null ) {
			enable = false;
		} else {
			enable = (( enable - 0 ) == 1);
		}
		return enable;
	}
	
	function setEnable( value ){
		widget.preferences.setItem("enable",value?1:0);
	}
	
	window.addEventListener("load", function(){
		if(LOG)opera.postError("Compat-Inspector: OnLoad");
		
		var theButton = opera.contexts.toolbar.createItem({
			title: "Compat-Inspector",
			icon: "icon32.png",
			badge: {
				textContent: (getEnable())? "on" :"off" ,
				backgroundColor: "#000",
				color: "#f00",
				display: "block"
			},
			onclick: function(){
        
				if(LOG)opera.postError("Compat-Inspector: OnClick");
				var enable = getEnable() ;
				enable = !enable;
				theButton.badge.textContent = (enable) ? "on" : "off";
				setEnable(enable);
			}
		});
   
		opera.contexts.toolbar.addItem( theButton ); // add button to UI
		opera.extension.tabs.addEventListener( "blur", toggleIfExists, false);
		opera.extension.tabs.addEventListener( "focus", toggleIfExists, false);
		opera.extension.addEventListener( "message", function(event){
			if(LOG)opera.postError("Compat-Inspector: OnMessage " + event.data);
			toggleIfExists();	
		}, false);
		
		function toggleIfExists(){
		  var tab = opera.extension.tabs.getFocused();
		  if( tab ){
			theButton.disabled = false;
       
			theButton.title = "Compat-Inspector";
		  } else {
			theButton.disabled = true;
       
			theButton.title = "Please reload the tab for the extension to take effect. If it still does not work, then the extension probably does not have access to this tab, probably due to security restrictions.";
		  }
		}

		opera.extension.addEventListener("connect", function(event) {
			if(LOG)opera.postError("Compat-Inspector: OnConnect. ");
			event.source.postMessage({ action: "setEnable", enable: getEnable() });
		}, false);
	}, false);
})();