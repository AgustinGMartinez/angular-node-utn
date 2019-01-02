const fs = require('fs'),
      jwt = require('jsonwebtoken');

function createToken(id) {
  var payload = { id: id};
  var privateKey  = fs.readFileSync('./auth/private.key', 'utf8');
  var i  = 'Serviweb Digital';          // Issuer
  var s  = 'info@serviwebdigital.com';        // Subject
  var a  = 'https://ags-utn.herokuapp.com/'; // Audience
  var signOptions = {
   issuer:  i,
   subject:  s,
   audience:  a,
   expiresIn:  86400, // expires in 24 hours
   algorithm:  "RS256"
  };

  return token = jwt.sign(payload, privateKey /*config.secret*/, signOptions);
}

module.exports = createToken;
