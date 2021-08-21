const {	clientId, clientSecret, port,} = require('./config.json');
const {	MessageEmbed, WebhookClient,} = require('discord.js');

// https://discord.com/api/webhooks/873026066627846154/1fx1xjj5-wBzN_enjv_Gs-IDt6WZ2PcjbCvXVhP64UYykr-bmktc3vDpWTX5cs1ZhYdj
const webhookClient = new WebhookClient({
	id: "876671705223946280",
	token: "kNjv5fzb6HLjD5Yfkso7HbtujfSHtOdPAzapmyAq9sMU4sdfTLwRRab1v1NTRYBA8HPH",
});

/*
const embed = new MessageEmbed()
	.setTitle('Some Title')
	.setColor('#0099ff');
*/
const embed = {
	"title": "New Thread in Forum Announcements on RPC",
	"description": "[[14 July 2021] Site Adjustments](https://ffxiv-roleplayers.com/topic/24279-14-july-2021-site-adjustments/)",
	"url": "",
	"color": 6439009,
	"timestamp": "2021-08-11T05:06:07.829Z",
	"footer": {
	  "text": "footer text",
	},
	"thumbnail": {
	  "url": "https://static.ffxiv-roleplayers.com/monthly_2018_10/gomtang_franz.png.c897493547340abf62b2e0a9d7999ca0.png"
	},
};
webhookClient.send({
	username: 'Hydaelyn Roleplayers Relay',
	avatarURL: 'https://i.imgur.com/AfFp7pu.png',
	embeds: [embed],
})
.catch(error => {
	if (error.code === 10015)
	{
		console.error("This webhook does not exist.");
	}
});
