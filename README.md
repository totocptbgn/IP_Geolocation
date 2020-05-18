# IP_Geolocation

This project is a Node.JS web server, that propose a website that tracks the user IP and location.

## Requirements

To run it you need [Node.js](https://nodejs.org/en/about/) and also these npm modules :
- [express ](https://www.npmjs.com/package/express) v4.17.1
- [body-parser](https://www.npmjs.com/package/body-parser) v1.19.0
- [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) v0.7.21
- [simple-node-logger](https://www.npmjs.com/package/simple-node-logger) v18.12.24

To install run :
```
$ npm install express body-parser ua-parser-js simple-node-logger
```

## Dependencies

For the server-side, i only used NodeJS and the npm packages above. For the client-side, the following services are used :

- [Bootstrap](https://getbootstrap.com/), a CSS framework.
- [Google Font](https://fonts.google.com/about), a font library.
- [JQuery](https://jquery.com/), JavaScript library for animation.
- [Poper](https://popper.js.org/) for the pop-up information.
- [Mapbox](https://www.mapbox.com/maps/) for the map.
- [Ipify](https://www.ipify.org/) to get the user IP address.
- [Ipstack](https://ipstack.com/) to get location from IP.

## How it works

The `index.js` is the main script, client-side. First, it fetch the user's IP with an AJAX call to `https://api.ipify.org?'`. Once it has the IP, it makes a second AJAX call to `http://api.ipstack.com/` with the IP as parameter, to get all the information of the location. Then it parse the result to print it in the web page. It also generate a map, that shows the IP coordinates location.

If one of the AJAX calls fails or timeout, the page shows an error. If that happens, most of the time it's because of the ads and trackers blockers that doesn't allow cross-origin requests. It can also be because of a poor connection. If the AJAX calls are without answers after 5 seconds, then the error message is shown.

A final AJAX call is done. It post all data from the user location, ip and user-agent data to the server via the route `/retrieve_data`. When the server receive it, it parse then write it into a log in a `logs/` directory.

The web page is fully responsive. The switch at the bottom of the page toggles a dark mode.

The city given as position is not very accurate. It is based on the user's IP address, not its real position.

##  Setup

Before launching the node server, you need to setup the ipstack access key and the MapBox access token. To be able to do that, you need to create accounts on those services. Don't worry it's fully free, you only need a email adress.

- Sign up on [ipstack ](https://ipstack.com/signup/free)
- Sign up on [MapBox](https://account.mapbox.com/auth/signup/)

Once this is done, copy the keys in the `index.js`. They are accessible [here](https://ipstack.com/dashboard) and [there](https://account.mapbox.com/access-tokens/).

```js
const access_key_ipstack;
const access_token_mapbox;
```

Now you can start your server :
```
$ node src/app.js
```

To access it, connect at this address :
```
http://localhost:3000/
```
And that it... Enjoy !
