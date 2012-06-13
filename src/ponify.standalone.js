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

		isUpperCase: function(char) {
			return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
		},

		isLowerCase: function(char) {
			return char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122;
		},

		startsWith: function(string, char) {
			return string.substr(0,1) === char;
		},

		endsWith: function(string, char) {
			return string.substr(string.length-1, 1) === char;
		},

		firstCharIsUpperCase: function(string) {
			return isUpperCase(string.substr(0,1));
		},

		ponify: function() {
			var replacer = this.getReplacer();

			for(var i=0; i<=nodes.length; i++)
			{
				var node = nodes[i];

				if( node === undefined ) continue;

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
			return new RegExp(/\b([A-Z][a-z]*)/g);
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

				if( node["innerHTML"] === undefined )
				{
					console.log(node);
					console.log(typeof node);
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
			var forbiddenTags = ["script", "style", "video", "audio", "#comment"];

			for(var i = 0; i <= forbiddenTags.length; i++)
			{
				if( node.nodeName === forbiddenTags[i] )
				{
					return true;
				}
			}

			return false;
		}
		
	};
}();

ponify.init();
})();