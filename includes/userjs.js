/*
   Compat-Inspector (http://ie.microsoft.com/testdrive/HTML5/CompatInspector/) extension for Opera
   Copyright 2012 © by Alexandr Zhuravlev
*/

(function(){
	var LOG = 0;
	var wnd;
	
	if(window.parent == window){	
		if(LOG)opera.postError("Compat-Inspector: Loaded");
		
		wnd = window;
		
		opera.extension.onmessage = function(event){
			if(LOG)opera.postError("Compat-Inspector: OnMessage");
		  // Get content of incoming message.
			if(event.data.action == "setEnable") {
				if (event.data.enable && wnd) {
					var script = wnd.document.createElement('script')
					script.type = "text/javascript";
					script.src =  "http://ie.microsoft.com/testdrive/HTML5/CompatInspector/inspector.js";
					var head = wnd.document.getElementsByTagName("head")[0];
					var first = head.firstChild;
					head.insertBefore(script, first);
				}
			}
		};

	}
})();