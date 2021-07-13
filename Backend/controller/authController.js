const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

const bcrypt = require('bcrypt');

const saltRounds = 10;

const usersSchema = require('../model/userModel')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://amita:5SxAq8ihvbuN0WIv@cluster1-dm6iy.mongodb.net/test?retryWrites=true/E-commerce');
//mongoose.connect('mongodb://localhost/E-commerce');
mongoose.connect('mongodb+srv://amita:5SxAq8ihvbuN0WIv@cluster1.dm6iy.mongodb.net/myFirstDatabase?retryWrites=true/agro', { useNewUrlParser: true });


router.post('/signup', (req, res, next) => {

    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var userJson = {
        name: req.body.name,
        username: req.body.username,
        tel: req.body.tel,
        password: hash,
        userType: req.body.userType
    };
    var users = new usersSchema(userJson);
    users.save(function(err, result) {
        console.log(result);

        if (err) {
            res.status(500).json(err);
        } else {
            const token = jwt.sign({ username: result["username"], id: result["_id"] }, 'this_must_be_a_long_string', { expiresIn: "1h" });
            res.status(200).json({
                status: "success",
                data: result,
                token: token
            })
        }
    })

});

router.post('/signin', (req, res, next) => {
    console.log("Entered Login :: ", req.body);

    usersSchema.findOne({ username: req.body.username, id: req.body._id}, function(err, result) {

        if (err) {
            res.status(500).json(err);

        } else if (result != null) {

            if ((bcrypt.compareSync(req.body.password, result["password"])) && (req.body.userType == result["userType"])) {
                // res.status(200).json({
                //     status: "success",
                //     data: result
                // })
                const token = jwt.sign({ username: result["username"], id: result["_id"] }, 'this_must_be_a_long_string', { expiresIn: "1h" });
                res.status(200).json({
                    status: "success",
                    data: result,
                    token: token,
                    expiresIn: 3600
                });
            } else {

                res.status(200).json({
                    status: "failure",
                    data: null
                })

            }

        }


    })

});

router.get('/', (req, res, next) => {
    res.status(200).json({
        name: "Agro Destination"
    })
})

module.exports = router;