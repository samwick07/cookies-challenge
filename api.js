const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.status(200).send('Cookies Challenge!'))

app.get('/login', (req, res) => {

    // define cookie attributes
    var opts = {
      maxAge: 900000,
      httpOnly: true,
      sameSite: 'strict',
    };

    const { username } = req.query;

    if (username) {

        // add our username cookie to the response
        res.cookie(`Username`, username, opts);

        // send response with cookies in the header
        res.send(`${username}'s Cookie has been set!`);
    }
});

app.get('/hello', (req, res) => {
    const username = req.cookies.username;
    console.log(username);

    if (username) {
        // add our username cookie to the response
        //res.cookie(`Username`, username, opts);
        res.status(200).send(`Welcome ${username}!`);
    }
});

app.listen(port, () => {
    console.log(`Cookie Server is running on port ${port}`);
});