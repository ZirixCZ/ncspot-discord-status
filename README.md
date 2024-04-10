# ncspot-discord-status
> Discord presence for [ncspot](https://github.com/hrkfdn/ncspot)

Ncspot uses mpris to show rich presence in apps such as discord. Not all systems meet the requirements for this to work. This program allows you to show what you're listening to.

### How does it work
Ncspot creates a socket in `/tmp/` that we can listen on and get all nessesary information from. Everytime the socket sends new data **ncspot-discord-status** takes them and updates discord status using discord-rpc



### Getting started
The process of getting this to work isn't hard if you're a wizard in the terminal. For the rest it might be a bit of a hurdle. I'll try making it very simple though!
What will we need:
* unix system *(duh)*
* ncspot-discord-status
* discord app clientid

##### ncspot-discord-status
Let's start by installing ncspot-discord-status. You can either download a binary for your OS, or you can build it yourself with `npm i` followed by `npm run build` and then starting it with `npm run start` later on. ncspot-discord-status reads from a config file located in `~/.config/ncspot-discord-status/config.json`. Full configuration looks like this:

```json
{
  "clientId": "weneedtoreplacethis",
  "port": 8888,
  "host": "localhost",
  "loadText": "Listening to music",
  "preTrackText": "Listening to ",
  "activity": {
    "largeImageKey": "https://dashboard.snapcraft.io/site_media/appmedia/2023/12/logo.svg.png",
    "largeImageText": "Terminal music player"
  }
}
```

If you paste the config above into `~/.config/ncspot-discord-status/config.json`, it will be all we need, except for the clientId, that we'll get now! Head onto the [discord developer portal](https://discord.com/developers/applications) and create an app. After creation you should see a clientId in there. Copy it and paste it into the config replacing `clientId` like so (if we assumed the clientId is 123456:

```diff
{
-  "clientId": "weneedtoreplacethis",
+  "clientId": "123456",
```

##### ncspot socket

Now we have the ncspot-discord-status part done. The interesting part is ahead! The next step is to open ncspot and discord and get the ncspot socket. After opening ncspot you need to get the location of the socket that ncspot created. It should always be in `/tmp/` so if you do `ls /tmp/ | grep ncspot` it will give you a hint of where could it be located. For me, it was in ` /tmp/ncspot-501/ncspot.sock`. Mark this location down. Now, we'll use a tool called `socat` (but you can use a different one that does the same thing) to create a listener on the socket. This will ultimately allow us to listen for any changes that happen.

So for me, the command I have to write is as follows (make sure to replace the location with yours if it differs):
```
socat UNIX-CONNECT:/tmp/ncspot-501/ncspot.sock TCP-LISTEN:8888,fork
```

You can notice that we're also specifing the port here. In the config it's defaultly set to 8888, if you need to change it, make sure you do so in the config as well as in the command above.

##### putting it all together

Now we have our socket listener ready and we are ready to test things out! Make sure discord is open and then start ncspot-discord-status. Either by executing it in the terminal with `./whereeveryoudownloadedthebinaryto` or by executing `npm run start` if you decided to build it yourself.

