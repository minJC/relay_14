const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Follow } = require("../models/Follow");
const { auth } = require("../middleware/auth");
const key = require('../config/key');
//=================================
//             Follow
//=================================

router.post("/followFriend", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log("followFriend");
    const follow = new Follow(req.body);
    try {
        follow.save()
        return res.status(200).json({ success: true })
    } catch (err) {
        return (err)
     }
});
router.post("/unfollowFriend", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log("undfollowFriend", req.body);
    try {
        Follow.deleteMany(req.body)
                .exec((err, user) => {
                    //console.log(err, user);
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true })
                })
        
    } catch (err) {
        return (err)
     }
});


router.post("/getlist", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    Follow.find(req.body.userFrom)
        .exec((err, user) => {
            console.log(err, user);
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, user })
        })
});



module.exports = router;
