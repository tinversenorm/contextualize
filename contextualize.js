// contextualize.js
// sets up listener and handlers for searching a term in different contexts

/*
Basic feature set:
1. Search any selection on sites: youtube, amazon, reddit, google

Possible additional features:
2. Customize search options (like decide which sources you want to be able to search from)
	a. use a browser action

*/

const contextConstants = {
	SELECTION: "selection",
	YTUBE_PROMPT: "Search YouTube",
	AMAZON_PROMPT: "Search Amazon",
	REDDIT_PROMPT: "Search Reddit",
	GOOGLE_PROMPT: "Search Google",
	WIKIPEDIA_PROMPT: "Search Wikipedia",
	GITHUB_PROMPT: "Search GitHub",
	YTUBE_SEARCH_URL: "https://www.youtube.com/results?search_query=",
	AMAZON_SEARCH_URL: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=",
	REDDIT_SEARCH_URL: "https://www.reddit.com/search?q=",
	GOOGLE_SEARCH_URL: "https://www.google.com/search?q=",
	WIKIPEDIA_SEARCH_URL: "https://en.wikipedia.org/wiki/Special:Search?search=",
	GITHUB_SEARCH_URL: "https://github.com/search?q="
};

const contextIds = {
	YTUBE_ID: "youtube" + contextConstants.SELECTION,
	AMAZON_ID: "amazon" + contextConstants.SELECTION,
	REDDIT_ID: "reddit" + contextConstants.SELECTION,
	GOOGLE_ID: "google" + contextConstants.SELECTION,
	WIKIPEDIA_ID: "wikipedia" + contextConstants.SELECTION,
	GITHUB_ID: "github" + contextConstants.SELECTION
};

// The onClicked callback function.
function onClickHandler(info, tab) {
	if('selectionText' in info) {
		searchSiteSelection(info.selectionText, info.menuItemId);
	} else {
		console.log("Search failed");
	}
};

// opens a new tab with youtube search query entered
function searchSiteSelection(query, siteID) {
	var urlquery = fixedEncodeURIComponent(query);
	console.log("Site search query: " + urlquery);
	//chrome.tabs.create({ url: "about:blank" });
	var urlSearch = "";
	switch(siteID) {
		case contextIds.YTUBE_ID: urlSearch = contextConstants.YTUBE_SEARCH_URL + urlquery;
			break;
		case contextIds.AMAZON_ID: urlSearch = contextConstants.AMAZON_SEARCH_URL + urlquery;
			break;
		case contextIds.REDDIT_ID: urlSearch = contextConstants.REDDIT_SEARCH_URL + urlquery;
			break;
		case contextIds.GOOGLE_ID: urlSearch = contextConstants.GOOGLE_SEARCH_URL + urlquery;
			break;
		case contextIds.WIKIPEDIA_ID: urlSearch = contextConstants.WIKIPEDIA_SEARCH_URL + urlquery;
			break;
		case contextIds.GITHUB_ID: urlSearch = contextConstants.GITHUB_SEARCH_URL + urlquery;
			break;
	}
	if(urlSearch !== "") chrome.tabs.create({ url: urlSearch });
	else console.log("Contextualize: Invalid search!");
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

	var ytube_id = chrome.contextMenus.create({
		"title": contextConstants.YTUBE_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id": contextIds.YTUBE_ID
	});

	var amazon_id = chrome.contextMenus.create({
		"title": contextConstants.AMAZON_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id": contextIds.AMAZON_ID
	});

	var reddit_id = chrome.contextMenus.create({
		"title": contextConstants.REDDIT_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id": contextIds.REDDIT_ID
	});

	var google_id = chrome.contextMenus.create({
		"title": contextConstants.GOOGLE_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id": contextIds.GOOGLE_ID
	});

	var wikipedia_id = chrome.contextMenus.create({
		"title": contextConstants.WIKIPEDIA_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id": contextIds.WIKIPEDIA_ID
	});

	var github_id = chrome.contextMenus.create({
		"title": contextConstants.GITHUB_PROMPT,
		"contexts": [contextConstants.SELECTION],
		"id" : contextIds.GITHUB_ID
	})
});