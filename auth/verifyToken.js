var jwt = require('jsonwebtoken');
var fs = require('fs');
var publicKey = fs.readFileSync('./auth/public.key', 'utf8');

var i  = 'Serviweb Digital';          // Issuer
var s  = 'info@serviwebdigital.com';        // Subject
var a  = 'https://ags-utn.herokuapp.com/'; // Audience
var verifyOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  86400, // expires in 24 hours
 algorithm:  ["RS256"]
};

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log('To verify:', token);
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, publicKey, verifyOptions, function(err, decoded) {
    if (err)
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    console.log(decoded);
    next();
  });
}

module.exports = verifyToken;
