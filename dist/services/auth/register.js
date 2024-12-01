"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerService", {
    enumerable: true,
    get: function() {
        return registerService;
    }
});
const _User = require("../../models/User");
const _elysia = require("elysia");
const _hashingpassword = require("../../shared/hashing-password");
const registerService = async (userData)=>{
    if (await _User.User.findOne({
        email: userData.email
    })) {
        throw (0, _elysia.error)('Conflict', {
            error: 'User with this email already exists'
        });
    }
    const hashedPassword = await (0, _hashingpassword.hashPassword)(userData.password);
    const newUser = new _User.User({
        ...userData,
        password: hashedPassword
    });
    await newUser.save().catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Failed to create user'
        });
    });
    const { password, ...user } = newUser.toObject();
    return {
        user
    };
};

//# sourceMappingURL=register.js.map