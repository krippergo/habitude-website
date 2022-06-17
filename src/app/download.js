function download_file() {
	var url = "/files/apk/habitude";
	var link_url = document.createElement("a");
	link_url.download = url.substring((url.lastIndexOf("/") + 1), url.length);
	link_url.href = url;
	document.body.appendChild(link_url);
	link_url.click();
	document.body.removeChild(link_url);
	delete link_url;
}

function goToTelegram() {
	window.open("https://t.me/quality_habitude", '_blank');
}

function createMenu() {
	var imgMenu = document.getElementById("img-menu");
	imgMenu.style.transform = "rotate(1rad)";
	var menu = document.getElementById("menu");
	menu.style.transform = "translationX(0%)";
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "block";
}

function createContactsMenu() {
	var containerContacts = document.getElementById("container-contacts");
	containerContacts.style.display = "block";
}

function deleteContactsMenu() {
	var containerContacts = document.getElementById("container-contacts");
	containerContacts.style.display = "none";
}

function deleteMenu() {
	var menu = document.getElementById("menu");
	menu.style.transform = "translationX(-100%)";
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "none";
	var imgMenu = document.getElementById("img-menu");
	imgMenu.style.transform = "rotate(0rad)";
	imgMenu.style.transition = "All 0.5s ease";
}