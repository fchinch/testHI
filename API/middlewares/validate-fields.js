const { validationResult } = require('express-validator');
let { candidates } = require('../controllers/candidates');


// const validateFields = (req, res, next) => {

//     console.log(req);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json(errors);
//     }

//     next();
// }

const validateId = async (id) => {
    let value = candidates();
    let validaId = value.filter(f => f.id === id);
    if (validaId != null) {
        if (validaId.length > 0) {
            throw new Error(`Id exists `);
        }
    }

}

const validateBody = async (req) => {
    if (req === undefined || req.constructor === Object && Object.keys(req).length === 0) {
        throw new Error("Body empty");
    }
}

const validateName = async (req) => {
    if (req != null && (req.length < 1 || req.length > 100)) {
        throw new Error("Name must be [1-100] characters");
    }

}


const validateGetSkills = async (req) => {

    // next();
}

const validateSkills = async (req) => {

    if (req.length < 1 && req.length > 10000) {
        throw new Error("Skills must be [1-10000] characters");
    }

    if (!Array.isArray(req)) {
        throw new Error("Skills must be an array");
    }

    let every = req.every(e => {
        return e.length > 1 && e.length < 100;
    });

    if (!every) {
        throw new Error("Each skill must be [1-100] characters");
    }

    let validateskills = /(^[a-zA-Z0-9-]+)$/g;
    let match = req.some(e => { return e.match(validateskills) === null; });

    if (match) {
        throw new Error("Skills contains invalid chars . Must be contain letters,numbers or hyphens");
        // return  res.status(200).set("Content-Type", "application/json").json("Error skills");
    }

    let duplicates = ( (new Set(req)).size !==req.length );
    if (duplicates) {
        throw new Error("Skills must not contain duplicate values");
    }
   

}




module.exports = {
    validateId,
    validateBody,
    validateName,
    validateSkills,
    validateGetSkills
}
