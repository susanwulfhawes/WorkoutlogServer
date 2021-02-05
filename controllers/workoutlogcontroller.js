let express = require('express');
const Log = require('../db').import('../models/log');
let router = express.Router();
let validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function(req, res){
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({error: err}))

});

router.get('/mineall', validateSession, (req, res) => {
    //res.send('Gets all logs for an individual user.');
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({error: err}))
});

router.get('/mine/:id', validateSession, function(req, res){
    let entryId = req.params.id;
    //res.send(`Gets individual logs by id for an individual user. ${entryId}`);
    Log.findOne({
        where: {id: entryId}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/update/:id', validateSession, function(req, res){
    //res.send('Allows individual logs to be updated by a user.');
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };

    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});
    

router.delete('/delete/:id', validateSession, function(req, res){
    //res.send('Allows individual logs to be deleted by a user.');

const query = {where: {id: req.params.id, owner_id: req.user.id}};

Log.destroy(query)
        .then(() => res.status(200).json({message: "Log Entry Removed"}))
        .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;