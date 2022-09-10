const express =  require('express');
const {subscribe} = require('../controller/subscribtion')

const router = express.Router();

router.post('/subscribe' , subscribe);


module.exports = router;