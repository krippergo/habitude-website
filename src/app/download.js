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
	menu.style.left = "0px";
}

function goToHome() {
	document.location.href = "/";
}

function goToReg() {
	deleteMenu();
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "flex";
	var regist = document.getElementById("registration");
	regist.style.display = "block";
	var log = document.getElementById("log-in");
	log.style.display = "none";
	var title = document.getElementById("title");
	title.innerHTML = "Habitude: registration";
}

function goToLogin() {
	deleteMenu();
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "flex";
	var log = document.getElementById("log-in");
	log.style.display = "block";
	var regist = document.getElementById("registration");
	regist.style.display = "none";
	var title = document.getElementById("title");
	title.innerHTML = "Habitude: authorization";
}

function exit() {
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "none";
	var log = document.getElementById("log-in");
	log.style.display = "none";
	var regist = document.getElementById("registration");
	regist.style.display = "none";
	var title = document.getElementById("title");
	title.innerHTML = "Habitude: download";
}

function createContactsMenu() {
	var containerContacts = document.getElementById("container-contacts");
	containerContacts.style.display = "block";
}

function deleteContactsMenu() {
	var containerContacts = document.getElementById("container-contacts");
	containerContacts.style.display = "none";
}

function goToVersions() {
	document.location.href = "/versions";
}

function deleteMenu() {
	var menu = document.getElementById("menu");
	menu.style.left = "-360px";
	var imgMenu = document.getElementById("img-menu");
	imgMenu.style.transform = "rotate(0rad)";
	imgMenu.style.transition = "All 0.5s ease";
}

function verification() {
	var logSelector = document.getElementById("login");
	var passSelector = document.getElementById("password");
	var cpassSelector = document.getElementById("confirm");
	var textErrorSelector = document.getElementById("text-error");
	var log = document.getElementById("login").value;
	var pass = document.getElementById("password").value;
	var cpass = document.getElementById("confirm").value;

	if (log != "") {
		if (pass != "") {
			if (pass == cpass) {
				var submitData = {
					login: log,
					password: pass
				};
				console.log(submitData);

				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "/registration", true);
				xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhttp.send(JSON.stringify(submitData));
				xhttp.onload = function () {
					if (this.readyState == 4 && this.status == 200) {
						var json = JSON.parse(this.responseText);
						if (json.verification == "true") {
							document.location.href = "/profile";
						} else {
							logSelector.style.borderColor = "#45A29E";
							textErrorSelector.innerHTML = "введите другой логин";
						}
					}
				};
			} else {
				cpassSelector.style.borderColor = "#45A29E";
				textErrorSelector.innerHTML = "вы не подтвердили пароль";
			}
		} else {
			passSelector.style.borderColor = "#45A29E";
			textErrorSelector.innerHTML = "введите пароль";
		}
	} else {
		logSelector.style.borderColor = "#45A29E";
		textErrorSelector.innerHTML = "введите логин";
	}
}

function verificationLogin() {
	var textErrorSelector = document.getElementById("text-error-sign-in");
	var log = document.getElementById("login-sign-in").value;
	var pass = document.getElementById("password-sign-in").value;
	var submitData = {
		login: log,
		password: pass
	};
	console.log(submitData);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/authorization", true);
	xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhttp.send(JSON.stringify(submitData));
	xhttp.onload = function () {
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			if (json.verification == "true") {
				document.location.href = "/profile";
			} else {
				textErrorSelector.innerHTML = "логин/пароль неверный";
			}
		}
	};
}