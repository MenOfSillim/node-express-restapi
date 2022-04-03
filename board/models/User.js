const mongoose = require('mongoose');

// schema
const userSchema = mongoose.Schema({
    username:{type:String, require:[true, 'Username is required!'], unique:true},
    password:{type:String, require:[true, 'Password is required!'], select:false},
    name:{type:String, require:[true, 'Name is required!']},
    email:{type:String}
}, {
    toObject:{virtuals:true}
});

// virtuals
userSchema.virtual('passwordConfirmation')
    .get(() => { return this._passwordConfirmation; })
    .set((value) => { this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
    .get(() => { return this._originalPassword; })
    .set((value) => { this._originalPassword=value });

userSchema.virtual('currentPassword')
    .get(() => { return this._currentPassword; })
    .set((value) => { this._currentPassword=value; });

userSchema.virtual('newPassword')
    .get(() => { return this._newPassword; })
    .set((value) => { this._newPassword=value; })

// password validation
userSchema.path('password').validate(function(v) {
    const user = this;

    // create user
    if (user.isNew) {
        if (!user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
        }

        if (user.password !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }

    // update user
    if (!user.isNew) {
        if (!user.currentPassword) {
            user.invalidate('currentPassword', 'Current Password is required!');
        } else if (user.currentPassword !== user.originalPassword) {
            user.invalidate('currentPassword', 'Current Password is invalid!');
        }

        if (user.newPassword !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
});

// model & export
const User = mongoose.model('user', userSchema);
module.exports = User;