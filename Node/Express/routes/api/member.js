const express = require('express');
const members = require('../../models/members');
const router = express.Router();

// if you use middeleware here using router.use(middleware), instead of
// app.use(middleware), then it will be called
// only for these routes and not others
// this is called router level middleware

// Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member
// note url should be /api/members/123 and not /api/members:id=123
// if id not found, return with status bad request and proper message
// by default status is 200
router.get('/:id', (req, res) => {
    const found = members.some(currentItem => currentItem.id === parseInt(req.params.id));

    if(found) {
        const singleMember = members.find(currentItem => currentItem.id === parseInt(req.params.id));
        res.json(singleMember);
    } else {
        res.status(400).json({ msg: `Member ${req.params.id} not found`});
    }
});

router.post('/', (req, res) => {
    const newMember = {
        id: req.body.id,
        name: req.body.name
    };

    if(!req.body.name) {
        // if we don't to return here, then code after if would aslo be executed
        // and we will get error as headers are alrayd sent, as we are sending response twice
        // or put below remaining code in else
        return res.status(400).json({msg: 'Name is required'});
    }
    members.push(newMember);
    res.json({msg: `New member ${newMember} added`});
});

module.exports = router;