function setupEntry(p) {
	var name = p.parent().attr("data-fullname");
	if (name == null || name == undefined)
		return;
	name = name.match(/_([0-9a-zA-Z]*)/)[1];
	if (name in db)
		return;
	p.addClass("rctNew");
	p.click(function() {
		p.removeClass("rctNew");
		if (name in db) return; // don't spam writes to the storage
		db[name] = 1;
		var obj = {};
		obj[dbThread] = db;
		chrome.storage.local.set(obj);
	});
}

var threadId = window.location.pathname.match(/\/comments\/([0-9a-zA-Z]+)\//)[1];
var dbThread = "t_" + threadId;
var db = null;

chrome.storage.local.get([dbThread], function(items) {
	//console.log(items);

	db = items[dbThread];
	console.log(db);

	if (db == null) {
		db = {};
	}

	if (!(threadId in db)) {
		db[threadId] = 1;
		console.log("put threadId");
		console.log(db);
		var obj = {};
		obj[dbThread] = db;
		chrome.storage.local.set(obj);
	}

	$(".entry.likes").each(function(index, elem) {
		setupEntry($(this));
	});

	$(".entry.dislikes").each(function(index, elem) {
		setupEntry($(this));
	});

	$(".entry.unvoted").each(function(index, elem) {
		setupEntry($(this));
	});
});