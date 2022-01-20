const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {validarCampos}  = require('../middlewares/validar-campos');
const { 
     validateId
    , validateGetSkills
    , validateBody
    ,validateSkills
    , validateName } = require('../middlewares/validate-fields');



const {
    candidatosPost,
    candidatesGet,
} = require('../controllers/candidates')


router.post('/candidates', [
    check('id','id is required').not().isEmpty(),
    check('name','name is required').not().isEmpty(),
    check('id').custom(validateId),
    check('name').custom(validateName),
     check('skills').custom(validateSkills),
     validarCampos
], candidatosPost);

router.get('/candidates/search', [
    check('?skills').custom(validateGetSkills)

], candidatesGet);




module.exports = router;