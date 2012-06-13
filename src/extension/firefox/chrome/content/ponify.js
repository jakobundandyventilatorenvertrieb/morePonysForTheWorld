var ponify = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

	var cd = document;
	var nodes = [];
	return {

		init : function () {
			gBrowser.addEventListener("load", function () {
				var autoRun = prefManager.getBoolPref("extensions.ponify.autorun");
				if (autoRun) {
					ponify.run();
				}
			}, false);
		},

		run : function () {
			this.collectChildNodes(content.document.getElementsByTagName("body")[0]);
			this.ponify();
		},

		ponify: function() {

			var replacements = this.loadReplacements();

			var replace = this.getReplacer();

			for(var i=0; i<=nodes.length; i++)
			{
				var node = nodes[i];

				node.innerHtml = node.innerHtml.replace(replacer, "Pony");
			}

		},

		getReplacer: function() {
			return new RegExp("[^a-zA-Z]", "g");
		},

		collectChildNodes: function( firstElement ) {
			var startNodes = firstElement.childNodes;

			for(var i=0; i<=startNodes.length; i++)
			{
				var node = startNodes[i];

				if( node === null )
				{
					continue;
				}

				if( node.innerHtml.length > 2 )
				{
					nodes.push(node);
				}

				if( node.childNodes.length > 0 )
				{
					this.collectChildNodes(node);
				}
			}
		},

		loadReplacements: function() {
			return [
				"lorem",
				"impsum",
				"sit"
			];
		}
		
	};
}();
window.addEventListener("load", ponify.init, false);