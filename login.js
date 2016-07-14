"use strict";

var request = require("request");

var login = {
	method: "POST",
	url: "https://popshops.com/login",
	headers:
	{
		"postman-token": "ea79a54a-4a31-826d-d88e-e689916d7978",
		"cache-control": "no-cache",
		"content-type": "multipart/form-data; boundary=---011000010111000001101001"
	},
	formData:
	{
		// "user[password]": "nikknikk",
		// "user[email]": "admin@whatsonpic.com"
	}
};

var dashboard = {
	method: "GET",
	url: "https://popshops.com/dashboard",
	headers: {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding": "gzip, deflate, sdch, br",
		"Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4",
		"Cache-Control": "max-age=0",
		"Connection": "keep-alive",
		"Cookie": "_ps_session=88b59a880a85782a198f2231be09709e",
		"Host": "popshops.com",
		"If-None-Match": "\"f75144f104683a97e164806486ee11f3-gzip\"",
		"Referer": "https://popshops.com/sign_in",
		"Upgrade-Insecure-Requests": 1,
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
	}
};

module.exports = (email, password) => {
	return new Promise((resolve, reject) => {
		login.formData
		login.formData["user[password]"] = password;
		login.formData["user[email]"] = email;
		request(login, function (err, response, body) {
			if (err) {
				return reject(err);
			}
			let cookie = response.headers["set-cookie"][0];
			let found = cookie.match(/(_ps_session=[A-z,0-9]*;)/);
			let session = found[0];
			dashboard.headers.Cookie = found[0];
			request(dashboard, function (error, response, body) {
				if (err) {
					return reject(err);
				}
				let cookie = response.headers["set-cookie"][0];
				let found = cookie.match(/(XSRF-TOKEN=[A-z,0-9,"%"]*;)/);
				let token = found[0];
				resolve({ token: token, session: session });
			});
		});
	});
}