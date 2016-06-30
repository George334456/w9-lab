// fyi You'll have to start by installing several modules,
// including express, express-validator, ejs, and body-parser.
var express = require('express')
var app = express()
var expressValidator = require('express-validator')
var bodyParser = require('body-parser')


// Set views path, template engine and default layout
app.use(express.static(__dirname + '/assets'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// We have to create custom validators here:
app.use(expressValidator({
    customValidators: {
        
        // Hint: Use the JS .search() string function to check.
        // Hint: You can re-use the regular expressions you used client-side!
        // But be sure to use forward slashes for the start and end of the expression ...
        
        isStuNum: function(value) {
            // Validation here:
            return value;
        },
        isPhone: function(value) {
            // Validation here:
            return value;
        },
        isBirthday: function(value) {
            // Validation here:
            return value;
        }
    }
})); // This line must be immediately after express.bodyParser()!


// Get the index page:
app.get('/', function(req, res) {
    res.render('tapp', {  // Note that .html is assumed.
        errors: ''
    });
});


// Getting the value from a form input:
app.post('/signup', function(req, res)
{
    // Very simply checking if the fields (by name) aren't empty:
    req.assert('email', 'An email address is required').notEmpty();
    // DO THIS FOR:
    // stunum
    // phone
    // birthday
    
    // .checkBody() looks at POST data.
    // Checking if email is an email:
    req.checkBody('email', 'Enter a valid email address').isEmail();
    
    // Checking student number (use your custom validation functions):
    // Checking phone number:
    // Checking birthday:
    
    // Checking for errors and mapping them:
    var errors = req.validationErrors();
    var mappedErrors = req.validationErrors(true);
    
    if (errors) // If errors exist, send them back to the form:
    {
        var errorMsgs = { "errors": {} };
        
        if ( mappedErrors.email )
            errorMsgs.errors.error_email = mappedErrors.email.msg;
        
        if ( mappedErrors.stunum )
            errorMsgs.errors.error_stunum = mappedErrors.stunum.msg;
        
        if ( mappedErrors.phone )
            errorMsgs.errors.error_phone = mappedErrors.phone.msg;
        
        if ( mappedErrors.birthday )
            errorMsgs.errors.error_birthday = mappedErrors.birthday.msg;
        
        // Note how the placeholders in tapp.html use this JSON:
        res.render('tapp', errorMsgs);
    }
    
    else
    {
        // You'd do your processing of the submitted data here.
        // We're just showing a JSON of the fields you've validated:
        response = {
            stunum:req.body.stunum,
            givenname:req.body.givenname,
            birthday:req.body.birthday
        };
        console.log(response);
        res.end(JSON.stringify(response));
    }
});

var server = app.listen(3000, function()
{
  var port = server.address().port;
  console.log('Running on 127.0.0.1:%s', port);
});