const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const axios = require("axios");
const key = require('../config/key');
//=================================
//             User
//=================================

router.get("/auth", auth, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인

    console.log("before", keyword);
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        company: req.user.company,
        school: req.user.school,
        phone: req.user.phone,
        birth: req.user.birth,
        intro: req.user.intro,
        sex: req.user.sex,
        tag: response.data.token_strings
    });
});


//회원가입
router.post("/register", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    let keyword = req.body.school + " " + req.body.name + " " + req.body.company + " " + req.body.sex + " " + req.body.birth;

    try {
        await axios.get(`https://open-korean-text-api.herokuapp.com/tokenize?text=` + encodeURI(keyword))
            .then(response => {
                if (response.data) {
                    req.body.tag = response.data.token_strings;
                    console.log(req.body);
                    const user = new User(req.body);
                    try {
                        user.save()
                        return res.status(200).json({
                            success: true
                        });
                    } catch (err) {
                        return (err)
                    }
                } else {
                    console.log("error:", response.data.token_strings);
                    return false;
                }
            })
    } catch (error) {
        console.log(error)
        return false;
    }



});

//로그인
router.post("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, account not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({
                    loginSuccess: true,
                    userId: user._id,
                    tokenExp: user.tokenExp,
                    token: user.token
                });
            });
        });
    });
});

//로그아웃
router.get("/logout", auth, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" })
        return res.status(200).send({
            success: true
        });
    } catch (error) {
        (error)
    }
});


//알수도 있는 사람 기능 구현
router.get("/getUser", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    User.find()
        .exec((err, user) => {
            if (err) return res.status(400).send(err);


            res.status(200).json({ success: true, user })
        })

});




//검색 기능 구현
router.post("/searchUser", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log(req.body.keyword);
    var keyword = req.body.keyword;
    keyword.replace(" ", "");

    var resultNLP;

    try {
        await axios.get(`https://open-korean-text-api.herokuapp.com/tokenize?text=` + encodeURI(keyword))
            .then(response => {
                if (response.data) {
                    resultNLP = response.data.token_strings;               //검색 결과 배열에 저장
                    console.log(resultNLP[0]);
                    User.find({'tag' : `${resultNLP[0]}`})
                        .exec((err, user) => {
                            console.log(err);
                            if (err) return res.status(400).send(err);
                            console.log("user", user)
                            res.status(200).json({ success: true, user })
                        })
                } else {
                    console.log("error:", response.data.token_strings);
                }
            })
    } catch (error) {
        console.log(error)
    }







});


module.exports = router;
