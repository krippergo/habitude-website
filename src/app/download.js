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
	imgMenu.style.transform = "rotate(6.29rad)";
	imgMenu.style.transition = "All 1s ease"
	
}