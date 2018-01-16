
exports.signup = function (req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var mob = post.mob_no;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

        var query = db.query(sql, function (err, result) {

            message = "Félicitation ! Vous avez votre compte !";
            res.render('signup.ejs', { message: message });
        });

    } else {
        res.render('signup');
    }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
        db.query(sql, function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }
            else {
                message = 'Erreur de login';
                res.render('index.ejs', { message: message });
            }

        });
    } else {
        res.render('index.ejs', { message: message });
    }

};


exports.dashboard = function (req, res, next) {

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('dashboard.ejs', { user: user });
    });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {

    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }
    const gamertag = req.session.user.first_name;
    const platform = req.session.user.last_name;

    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/' + platform + '/' + gamertag + '',
        headers:
            {
                'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
                'Cache-Control': 'no-cache',
                'TRN-Api-Key': 'ff3f7f16-c33f-4281-8c39-6f4a0c705ac2'
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const dataGamer = JSON.parse(body);
        console.log(dataGamer.stats.p9.top1.value);
        var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
        db.query(sql, function (err, result) {
            res.render('profile.ejs', { data: result, dataGamer });
        });
    });

};
//---------------------------------edit users details after login----------------------------------
exports.editprofile = function (req, res) {
    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, results) {
        res.render('edit_profile.ejs', { data: results });
    });
};

exports.comparaison = function (req, res) {
    res.render('comparaison.ejs');
};

exports.statCompare = function (req, res) {
    var gamertagFriend = req.body.gamertag;
    console.log(gamertagFriend);
    const gamertag = req.session.user.first_name;
    const platform = req.session.user.last_name;
    var userId = req.session.userId;
    var request = require("request");
    //console.log(gamertagFriend);

    var options = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/' + platform + '/' + gamertag + '',
        headers:
            {
                'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
                'Cache-Control': 'no-cache',
                'TRN-Api-Key': 'ff3f7f16-c33f-4281-8c39-6f4a0c705ac2'
            }
    };

    var optionsFriend = {
        method: 'GET',
        url: 'https://api.fortnitetracker.com/v1/profile/' + platform + '/' + 'Paghaz' + '',
        headers:
            {
                'Postman-Token': 'e8c03bd2-9479-4bc8-1ea1-20de5981caf7',
                'Cache-Control': 'no-cache',
                'TRN-Api-Key': 'ff3f7f16-c33f-4281-8c39-6f4a0c705ac2'
            }
    };



    request(options, function (error, response, body) {
        var dataGamerFriend;
        request(optionsFriend, function (error, response, body1) {
            if (error) throw new Error(error);
            dataGamerFriend = JSON.parse(body1);
            if (error) throw new Error(error);
            const dataGamer = JSON.parse(body);
            ////console.log(body);
           // console.log(body1);
            res.render('statCompare.ejs', { dataGamer, dataGamerFriend});
        });
    });



};
