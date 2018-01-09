exports.signup = function (req, res) {
  message = '';
  if (req.method == 'POST') {
    // post data

  } else {
    res.render('signup');
  }
};

exports.login = function (req, res) {
  let message = '';
  const sess = req.session;

  if (req.method == 'POST') {
    const post = req.body;
    const name = post.user_name;
    const pass = post.password;

    console.log(name);
    console.log(pass);

    const sql = `SELECT id, first_name, last_name, user_name FROM \`users\` WHERE \`user_name\`='${name}' and \`password\` = '${pass}'`;
    console.log(sql);
    db.query(sql, (err, results) => {
      console.log(results);
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        console.log(results[0].id);
        res.redirect('/home/dashboard');
      }
      else {
        message = 'Erreur de connexion';
        res.render('index.ejs', { message });
      }

    });
  } else {
    res.render('index.ejs', { message });
  }
};

exports.signup = function (req, res) {
  message = '';
  if (req.method == 'POST') {
    const post = req.body;
    const name = post.user_name;
    const pass = post.password;
    const fname = post.first_name;
    const lname = post.last_name;
    const mob = post.mob_no;

    const sql = `INSERT INTO \`users\`(\`first_name\`,\`last_name\`,\`mob_no\`,\`user_name\`, \`password\`) VALUES ('${fname}','${lname}','${mob}','${name}','${pass}')`;

    const query = db.query(sql, (err, result) => {

      message = 'Succesfully! Your account has been created.';
      res.render('signup.ejs', { message });
    });

  } else {
    res.render('signup');
  }
};

exports.dashboard = function (req, res, next) {

  let user = req.session.user,
    userId = req.session.userId;

  if (userId == null) {
    res.redirect('/home/login');
    return;
  }

  const sql = `SELECT * FROM \`login_details\` WHERE \`id\`='${userId}'`;

	   db.query(sql, (err, results) => {

		   console.log(results);

		   res.render('profile.ejs', { user });

  });
};
