const { response, request } = require('express');


let candidates = [];

const matchCandidates = (skills, data) => {
    return data.filter(item => {
        let hasSkills = 0;
        item.skills.forEach(skill => {
            if (skills.includes(skill)) {
                hasSkills++;
                item.hasSkills = hasSkills;
            }
        })
        return hasSkills > 0;
    }).sort((a, b) => {
        if (a.hasSkills > b.hasSkills) {
            return -1;
        }
        if (a.hasSkills < b.hasSkills) {
            return 1;
        }
        return 0;
    })
}


const candidatosPost = async (req = request, res = response) => {
    try {

        candidates.push(req.body);
        return res.status(200).set("Content-Type", "application/json").json(req.body);

    }
    catch (e) {
        console.log(e);
        res.status(200);
        res.json({ error: "Error!" })
    }

}



const candidatesGet = async (req = request, res = response) => {
    try {

        // [check('?skills').custom(validateSkills)]
        //console.log(req.query);

        if (req.query.skills === undefined || req.query.skills === '') {
            res.status(400).json("Send the skills");

        }

        if (candidates.length > 0) {
            // let results = candidates.filter(item => item.skills.join(',').includes(req.query.skills.toString()))
            let array = req.query.skills.split(',');
            let candidato = matchCandidates(array, candidates);  // 3
            let results = candidato.filter(item => item.hasSkills === candidato[0].hasSkills)
            // let results = candidates.filter(f => array.every(e=> f.skills.some(s => s == e)));
            //console.log(`Results:${results}`)
            if (results.length > 0) { res.status(200).set("Content-Type", "application/json").json(results); }
            
        }

       return res.status(404).json("Candidates not found"); 
    }
    catch (e) {
        res.status(200);
        res.json({ error: "Error!" })
        throw e;
    }



}




module.exports = {
    matchCandidates,
    candidatosPost,
    candidatesGet,
    candidates: function () { return candidates; }
}