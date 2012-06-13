(function() {
var ponify = function () {
	
	var nodes = [];

	return {

		init : function () {
			this.collectChildNodes(document.getElementsByTagName("body")[0]);
			this.run();
		},

		run : function () {
			this.ponify();
		},

		ponify: function() {
			var replacements = this.loadReplacements(),
				replacer = this.getReplacer(replacements);

			for(var i=0; i<=nodes.length; i++)
			{
				var node = nodes[i];

				if( node === undefined ) continue;

				var nodeData = {data: "", innerHtml: ""};
				
				if( node.nodeName === "#text" )
				{
					node.data = node.data.replace(replacer, "Pony");
				}
				else
				{
					node.innerHTML = node.innerHTML.replace(replacer, "Pony");	
				}
			}
		},

		getReplacer: function(replacements) {
			replacements = replacements.join("|");

			return new RegExp(replacements, "g");
		},

		collectChildNodes: function( firstElement ) {
			var startNodes = firstElement.childNodes;

			for(var i = 0; i <= startNodes.length; i++)
			{
				var node = startNodes[i];

				if( node === null || node === undefined || this.isForbiddenNode(node) )
				{
					continue;
				}

				if( this.isTextNode(node) || node.innerHTML.length > 2 )
				{
					nodes.push(node);
				}

				if( node.childNodes.length > 0 )
				{
					this.collectChildNodes(node);
				}
			}
		},

		isTextNode: function(node) {
			return node.nodeName === "#text";
		},

		isForbiddenNode: function(node) {
			var forbiddenTags = ["script", "style", "video", "audio"];

			for(var i = 0; i <= forbiddenTags.length; i++)
			{
				if( node.nodeName === forbiddenTags[i] )
				{
					return true;
				}
			}

			return false;
		},

		loadReplacements: function() {
			return [
				"Lorem",
				"ipsum",
				"sit"
			];
		}
		
	};
}();

ponify.init();
})();