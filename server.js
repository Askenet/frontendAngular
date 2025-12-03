//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/assigment-app/browser'));

app.get('{*splat}', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/assigment-app/browser/index.html'));
});

// Start the app by listening on the default Heroku/Render port
app.listen(process.env.PORT || 8081);

console.log('Server started on port ' + (process.env.PORT || 8081));
