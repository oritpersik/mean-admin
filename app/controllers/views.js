/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    View = mongoose.model('View'),
    _ = require('underscore');


/**
 * Find view by id
 */
exports.view = function(req, res, next, viewId) {
    console.log(viewId);
    View.findOne({viewId: viewId}, function(err, view) {
        if (err) return next(err);
        if (!view) return next(new Error('Failed to load view ' + viewId));
        req.view = view;
        next();
    });
};

/**
 * Create a view
 */
exports.create = function(req, res) {
    var view = new View(req.body);
    view.viewId = view.name.toLowerCase().replace(/ /g,'-');

    view.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                view: view
            });
        } else {
            res.jsonp(view);
        }
    });
};

/**
 * Update a view
 */
exports.update = function(req, res) {
    var view = req.view;
    view = _.extend(view, req.body);

    view.fields.forEach(function(field, index) {
        field.fieldId = field.name.toLowerCase().replace(/ /g,'-');
    });

    view.save(function(err) {
        res.jsonp(view);
    });
};

/**
 * Delete an view
 */
exports.destroy = function(req, res) {
    var view = req.view;

    view.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(view);
        }
    });
};

/**
 * Show an view
 */
exports.show = function(req, res) {
    res.jsonp(req.view);
};

/**
 * List of Views
 */
exports.all = function(req, res) {
    View.find().sort('-created').exec(function(err, views) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(views);
        }
    });
};