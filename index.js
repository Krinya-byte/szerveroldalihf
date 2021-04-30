let express = require('express');
let app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

require('./route/routes')(app);

app.listen(3000, function () {
});
