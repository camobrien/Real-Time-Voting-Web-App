const mongoose = require('mongoose');


// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect('mongodb://cameron:Frog9109@ds119085.mlab.com:19085/pusherpoll')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
