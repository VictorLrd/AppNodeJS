var config = require('config.json')('configs.json');

exports.signup = function (req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var gamertag = post.gamertag;

        var sql = "INSERT INTO `users`(`gamertag`,`user_name`, `password`) VALUES ('" + gamertag + "','" + name + "','" + pass + "')";
        var query = db.query(sql, function (err, result) {

            message = "Félicitation ! Vous avez votre compte !";
            res.render('signup.ejs', {
                message: message
            });
        });

    } else {
        res.render('signup');
    }
};

exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, gamertag, user_name FROM `users` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
        db.query(sql, function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                res.redirect('/home/dashboard');
            } else {
                message = 'Erreur de login';
                res.render('index.ejs', {
                    message: message
                });
            }

        });
    } else {
        res.render('index.ejs', {
            message: message
        });
    }

};


exports.dashboard = function (req, res, next) {

    var config = require('config.json')('./configs.json');
    var user = req.session.user,
        userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('dashboard.ejs', {
            user: user
        });
    });
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};


exports.profile = function (req, res) {

    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }
    const gamertag = req.session.user.gamertag;

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/pc/' + gamertag + '',
        headers: {
            'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
            'Cache-Control': 'no-cache',
            'TRN-Api-Key': config.apiKey
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const dataGamer = JSON.parse(body);
        var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
        db.query(sql, function (err, result) {
            res.render('profile.ejs', {
                data: result,
                dataGamer
            });
        });
    });

};


exports.editprofile = function (req, res) {
    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, results) {
        res.render('edit_profile.ejs', {
            data: results
        });
    });
};

exports.comparaison = function (req, res) {
    res.render('comparaison.ejs');
};

exports.statCompare = function (req, res) {
    const gamertag = req.session.user.gamertag;
    var userId = req.session.userId;
    var post = req.body;
    var name = post.gamertag;
    var request = require("request");


    var options = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/pc/' + gamertag + '',
        headers: {
            'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
            'Cache-Control': 'no-cache',
            'TRN-Api-Key': config.apiKey
        }
    };

    var optionsFriend = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/pc/' + name + '',
        headers: {
            'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
            'Cache-Control': 'no-cache',
            'TRN-Api-Key': config.apiKey
        }
    };



    request(options, function (error, response, body) {
        var dataGamerFriend;
        request(optionsFriend, function (error, response, body1) {
            if (error) throw new Error(error);
            dataGamerFriend = JSON.parse(body1);
            if (error) throw new Error(error);
            const dataGamer = JSON.parse(body);
            res.render('statCompare.ejs', {
                dataGamer,
                dataGamerFriend,
                name,
                gamertag
            });
        });
    });



};