"use strict";

const request = require("request");
const login = require("./login.js");

const options = {
	method: "GET",
	url: "https://popshops.com/dashboard/api/transactions",
	qs:
	{
		"transaction[end_on]": "2016-7-14",
		"transaction[resource_id]": "-1",
		"transaction[resource_type_lu_id]": "-1",
		"transaction[start_on]": "2016-7-7"
	},
	headers:
	{
		"cache-control": "no-cache",
		"cookie": "XSRF-TOKEN=5pf0PLpy7dihAn1W4MezMcMUHpHXtfmAPXQfr2%2B%2B1Y8%3D; _ps_session=2c0b15ad2fa50f466e7b79b46516d42c",
		"Accept": "application/json, text/plain, */*",
		"X-Requested-With": "XMLHttpRequest",
	}
};

login("admin@whatsonpic.com", "nikknikk").then((credentials) => {

	options.headers.cookie = credentials.token + " " + credentials.session;

	request(options, function (error, response, body) {
		if (error) {
			throw new Error(error);
		}

		console.log(body);
	});

});

