chrome.commands.onCommand.addListener(function(command) {
	var index;
	if (command == "switch-left") {
		index = -1;
	} else {
		index = 1;
	}
	switchTab(index);
});

function switchTab(index) {
	chrome.tabs.query({currentWindow: true}, getSwitchTabFunction(index));
}

function getSwitchTabFunction(index) {
	return function(tabs) {
		switchTabFromCurrent(index, tabs)
	}
}

function switchTabFromCurrent(index, tabs) {
	var newTabIndex = findActiveTab(tabs) + index;
	if (newTabIndex >= 0 && newTabIndex < tabs.length) {
		chrome.tabs.update(tabs[newTabIndex].id, {active: true});
	}
}

function findActiveTab(tabs) {
	return tabs.filter(function(tab) {return tab.active;})[0].index;
}