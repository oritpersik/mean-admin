/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');


exports.render = function(req, res) {
    if (req.user) {
        if (req.user.role == "admin") {
            res.render('admin', {
                user: req.user ? JSON.stringify(req.user) : "null"
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/signin');
    }
};
