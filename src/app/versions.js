var userRegistered = false;

var userVerification = new XMLHttpRequest();
userVerification.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var json = JSON.parse(this.responseText);
		if (json.verification == "true") {
			userRegistered = true;
		} else {
			userRegistered = false;
		}
	}
};
userVerification.open("GET", "/verification", true);
userVerification.send();

function createMenu() {
	var imgMenu = document.getElementById("img-menu");
	imgMenu.style.transform = "rotate(2rad)";
	imgMenu.style.transition = "All 0.5s ease";
	if (userRegistered) {
		var menu = document.getElementById("menuForRegisteredUser");
		menu.style.left = "0px";
		menu.style.transition = "All 0.5s ease";
		menu.style.boxShadow = "6px 0px 2px rgba(0, 0, 0, 0.25)";
	} else {
		var menu = document.getElementById("menuForUnregisteredUser");
		menu.style.left = "0px";
		menu.style.transition = "All 0.5s ease";
		menu.style.boxShadow = "6px 0px 2px rgba(0, 0, 0, 0.25)";
	}
}

function goToHome() {
	document.location.href = "/";
}

function goToTelegram() {
	window.open("https://t.me/quality_habitude", '_blank');
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
	title.innerHTML = "Habitude: регистрация";
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
	title.innerHTML = "Habitude: авторизация";
}

function exit() {
	var bgMenu = document.getElementById("bg-menu");
	bgMenu.style.display = "none";
	var log = document.getElementById("log-in");
	log.style.display = "none";
	var regist = document.getElementById("registration");
	regist.style.display = "none";
	var title = document.getElementById("title");
	title.innerHTML = "Habitude: версии приложения";
}

function createAccountMenu() {
	var containerAccount = document.getElementById("container-account");
	containerAccount.style.display = "block";
}

function deleteAccountMenu() {
	var containerAccount = document.getElementById("container-account");
	containerAccount.style.display = "none";
}

function createContactsMenu() {
	if (userRegistered) {
		var containerContactsReg = document.getElementById("container-contacts-reg");
		containerContactsReg.style.display = "block";
	} else {
		var containerContacts = document.getElementById("container-contacts");
		containerContacts.style.display = "block";
	}
}

function deleteContactsMenu() {
	var containerContacts = document.getElementById("container-contacts");
	var containerContactsReg = document.getElementById("container-contacts-reg");
	containerContacts.style.display = "none";
	containerContactsReg.style.display = "none";
}

function goToVersions() {
	document.location.href = "/versions";
}

function goToHabit() {
	document.location.href = "/habit";
}

function exitAccount() {
	var exitAccount = new XMLHttpRequest();
	exitAccount.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.location.href = "/";
		}
	};
	exitAccount.open("GET", "/exit-account", true);
	exitAccount.send();
}

function deleteMenu() {
	if (userRegistered) {
		var menu = document.getElementById("menuForRegisteredUser");
		menu.style.left = "-360px";
		menu.style.transition = "All 0.5s ease";
		menu.style.boxShadow = "none";
	} else {
		var menu = document.getElementById("menuForUnregisteredUser");
		menu.style.left = "-360px";
		menu.style.transition = "All 0.5s ease";
		menu.style.boxShadow = "none";
	}
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
							document.location.href = "/habit";
						} else {
							logSelector.style.borderColor = "#45A29E";
							textErrorSelector.innerHTML = "логин который вы ввели занят";
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
				document.location.href = "/habit";
			} else {
				textErrorSelector.innerHTML = "логин или пароль неверный";
			}
		}
	};
}