const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const ua_parser = require('ua-parser-js');
const fs = require('fs');

let urlencodedParser = bodyParser.urlencoded({ extended: false });
if (!fs.existsSync('logs')) fs.mkdirSync('logs');
const d = new Date();
const log = require('simple-node-logger').createSimpleLogger('logs/' + d.getDate() + '_' + d.getMonth() + '_' + d.getHours() + '_' + d.getMinutes()+ '.log');
app.use(express.static('static'));

app.listen(3000, function(){
    log.info(' ---------------------------------------- ');
    log.info(' -- Ready on http://localhost:3000/');
    log.info(' ---------------------------------------- ');
});

app.post('/retrieve_data', urlencodedParser, (req, res) => {
    if (req.body['data[ip]'] == undefined) {
        log.info('  User-Agent: ' + req.get('User-Agent'));
        log.info('  Failure... ');
    } else {
        let ua = ua_parser(req.get('User-Agent'), null, '  ');
        var ua_parsed = '  User-Agent: ';
        if (ua.browser.name != undefined) ua_parsed += ua.browser.name;
        if (ua.device.vendor != undefined) ua_parsed += ' - ' + ua.device.vendor + ' ' + ua.device.model + ' (' + ua.device.type + ')';
        if (ua.os.name != undefined) ua_parsed += ' - ' + ua.os.name + ' ' + ua.os.version;
        log.info(ua_parsed);
        log.info('  IP: ' + req.body['data[ip]']);
        log.info('  Country: ' + req.body['data[country_name]'] + ' ' + req.body['data[location][country_flag_emoji]']);
        log.info('  City: ' + req.body['data[city]']);
    }
    log.info(' ---------------------------------------- ');
    res.send('Thank you ' + req.body['data[ip]']);
});

app.get('/*', (req, res) => {
    res.sendFile('location.html', { root: path.join(__dirname, 'static')});
});


