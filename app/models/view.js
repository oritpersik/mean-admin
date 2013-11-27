/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * View Schema
 */
var ViewSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    viewId: {
        type: String,
        default: '',
        unique: true,
        trim: true
    },
    name: {
        type: String,
        default: '',
        unique: true,
        trim: true
    },
    fields: [{
        _id: false,
        fieldId: {
            type: String,
            default: '',
            trim: true
        },
        name: {
            type: String,
            default: '',
            trim: true
        },
        label: {
            type: String,
            default: '',
            trim: true
        }
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ViewSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
ViewSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('View', ViewSchema);