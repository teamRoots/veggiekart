var express = require('express');
var router = express.Router();

router.get('/:id', function(request, response){
  var id = request.params.id;
  request.session.respond = id;
  response.redirect('/');
});

module.exports = router;
