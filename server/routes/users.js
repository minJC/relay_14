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
        sex: req.user.sex
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
router.post("/login",  (req, res) => {
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
        console.log(error)
    }
});


//알수도 있는 사람 기능 구현
router.post("/getUser", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    // if(!req.body.userId.user){
    //     res.status(400).json({ success: false })
    // }else
    //console.log(req.body.userId.userData);
    try{
    User.find({ _id: req.body.userId.userData._id })
        .exec((err, user) => {
            //console.log(user[0].tag);
            //if (err) return res.status(400).send(err);
            let data = []
            let temp
            try{
                temp = user[0].tag
            }catch{
                return res.status(400).send("e");
            }
            temp.forEach((el) => {
                let tempObj= new Object;
                tempObj.tag = el;
                data[data.length] = tempObj;
            })
            console.log(user);
            res.status(200).json({ success: true, user})                //현재 자기자신 리턴
            // let str = { $or: data}                           //키워드값 or검색
            // User.find(str)
            //     .exec((err, users) => {
            //         //console.log(err, user);
            //         if (err) return res.status(400).send(err);
            //         res.status(200).json({ success: true, users })
            //     })

        })
    }catch(e){
        return res.status(400).send("e");
    }

});




//검색 기능 구현
router.post("/searchUser", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    console.log(req.body.keyword);
    var keyword = req.body.keyword;
    //keyword.replace(" ", "");

    var resultNLP;

    try {
        await axios.get(`https://open-korean-text-api.herokuapp.com/extractPhrases?text=` + encodeURI(keyword))
            .then(response => {
                if (response.data) {
                    let temp = response.data.phrases;
                    let data = [];
                    temp.forEach(element => {
                        let temp = element.split("\(");
                        if (temp[0] != '대학교' && temp[0] != '고등학교' && temp[0] != '중학교' && temp[0] != '초등학교' && temp[0] != '학교') {
                            let tempObj = new Object;
                            tempObj.tag = temp[0];
                            data[data.length] = tempObj;              //object 형태로 배열에 저장
                        }
                    });
                    resultNLP = response.data.phrases;               //검색 결과 배열에 저장

                    let str = { $or: data }                           //키워드값 or검색
                    User.find(str)
                        .exec((err, user) => {
                            console.log(err, user);
                            if (err) return res.status(400).send(err);
                            res.status(200).json({ success: true, user })
                        })
                } else {
                    console.log("error:", response.data.parases);
                }
            })
    } catch (error) {
        console.log(error)
    }







});


module.exports = router;
