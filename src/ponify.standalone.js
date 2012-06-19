(function() {
var ponify = function () {
	
	var nodes = [];
	var showFinishedBannerInterval;

	return {

		init : function () {

			if( document.getElementById("ponified-banner") !== null )
			{
				return false;
			}

			this.showStartBanner();
			
			this.collectChildNodes(document.getElementsByTagName("body")[0]);
			this.run();

			this.showFinishedBanner();
		},

		run : function () {
			this.ponifyTextNodes();
			this.ponifyImages();
		},

		showStartBanner: function() {
			var div = document.createElement("div");

			div.style.position = "fixed";
			div.style.zIndex = 1337;
			div.style.top = "0px";
			div.style.height = "150px";
			div.style.width = "100%";
			div.style.background = "pink";
			div.style.color = "#FFF";
			div.style.opacity = .9;
			div.style.fontSize = "72pt";
			div.style.textAlign = "center";
			div.style.fontWeight = "bold";
			div.style.lineHeight = "118px";
			div.style.borderRadius = "5px 5px 5px 5px";

			div.id = "ponified-banner";
			div.innerHTML = "Ponifying!";

			document.getElementsByTagName("body")[0].appendChild(div);
		},

		showFinishedBanner: function() {
			var div = document.getElementById("ponified-banner");
			div.innerHTML = "Ponified!";
			
			showFinishedBannerInterval = setInterval(function() {
				var div = document.getElementById("ponified-banner");

				if(div.style.opacity < 0)
				{
					clearInterval(showFinishedBannerInterval);
				}

				var top = parseInt(div.style.top.split("px")[0]);

				top += 20;

				div.style.top = top + "px";

				div.style.opacity -= 0.05;

			}, 100);

		},

		clearFinishedBannerInterval: function() {
			clearInterval(showFinishedBannerInterval);
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

		ponifyImages: function() {

		},

		ponifyTextNodes: function() {
			var numReplacedWords = 0;

			for(var i=0; i<=nodes.length; i++)
			{
				var node = nodes[i];

				if( node === undefined || !this.isTextNode(node) ) continue;

				var rand = Math.random();
				var words = node.data.split(" ");

				if(words.length > 2)
				{
					var replacedWordBefore = false;
					for(var k=0; k<words.length; k++)
					{
						var word = words[k];

						if(word.length < 3 || !this.isUpperCase(word))
						{
							continue;
						}

						// no "Pony Pony" please..
						if( replacedWordBefore )
						{
							replacedWordBefore = false;
							continue;
						}

						/*if( Math.round(rand * 10) % 2 === 0)*/
						if( k % 2 === 0)
						{
							words[k] = this.replaceWithPunctuation(word, "Pony");

							replacedWordBefore = true;
							numReplacedWords++;
						}
					}

					node.data = words.join(" ");
				}
			}
		},

		replaceWithPunctuation: function(word, replacement) {
			var lastChar = word.substr(word.length-1, 1);

			word = word.replace(word, replacement);

			if( lastChar.search(/[.,!?:;()\[\]{}-]/) >= 0 ) {
				word += lastChar;
			}

			return word;
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

				if( this.isTextNode(node) )
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
			var forbiddenTags = ["script", "style", "video", "audio", "#comment", "img", "a", "iframe"];

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