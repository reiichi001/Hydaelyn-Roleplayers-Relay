// Load config files we need
const {
	clientId, clientSecret, port,
} = require('./config.json');

// Load dependencies
const {
	MessageEmbed, WebhookClient,
} = require('discord.js');
const Enmap = require("enmap");
const express = require('express');
const fetch = require('node-fetch');

// initialize some things we need
const app = express();
const webhookClient = new WebhookClient({
	id: clientId,
	token: clientSecret,
});

const myEnmap = new Enmap({
	name: "settings",
	 dataDir: "./data",
	autoFetch: true,
	fetchAll: false,
});


// / Actual program logic

app.get('/webhook', (request, response) => {
	// return response.sendFile('index.html', { root: '.' });


});

app.get('/webhook/authorize', async ({
	query,
}, response) => {
	const {
		code,
	} = query;

	if (code) {
		try {
			/* eslint-disable camelcase */
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}/webhook/authorize`,
					scope: 'identify webhook.incoming',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			/* eslint-enable camelcase */

			const oauthData = await oauthResult.json();
			console.log(`oauthData:\n${JSON.stringify(oauthData)}\n`);
			/*
			const newRelayEntry = {
				"channel_id": oauthData.webhook.channel_id,
				"guild_id": oauthData.webhook.guild_id,
				"id": oauthData.webhook.id,
				"token": oauthData.webhook.token,
			};

			myEnmap.set(newRelayEntry.id, newRelayEntry);
			*/

			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		}
		catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}


	return response.sendFile('index.html', {
		root: '.',
	});
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));


