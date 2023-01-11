
var crypto = require('crypto');
var axios = require('axios');
const moment = require('moment');


exports.index = (req, res) =>{

    // Código que consume la API



    res.render('payments/index');
}

exports.get = (req, res) => {

    res.render('payments/status');
}

exports.create = async (req, res) => {
    console.log(req.body.login);

    let result = "";
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 13; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    console.log(result)

    const login = "6dd490faf9cb87a9862245da41170ff2";
    const seed = moment().format();
    const nonce = "OGYwYTVkMzkxOWM2MjdhMDdkYjFlOGZlMTI0OWEzMjU=";
    const secretKey = "iQhxZqnRbJe"

    const tranKey =  btoa(crypto.createHash('sha1').update(nonce + seed + secretKey).digest('hex'));
    console.log(tranKey, nonce+seed+secretKey)


    var data = JSON.stringify({
        "auth": {
            "login": login,
            "tranKey": secretKey,
            "nonce": btoa(nonce),
            "seed": seed
        },
        "internalReference": 640,
        "amount": {
            "currency": "USD",
            "total": "5"
        },
        "action": "checkout"
    });

    var config = {
        method: 'post',
        url: 'https://checkout-test.placetopay.com/api/transaction',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error.message);
        });


    res.send("Failed")

}
