"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recoverPasswordService", {
    enumerable: true,
    get: function() {
        return recoverPasswordService;
    }
});
const _elysia = require("elysia");
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
const _User = require("../../models/User");
const _hashingpassword = require("../../shared/hashing-password");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const recoverPasswordService = async (email)=>{
    const user = await _User.User.findOne({
        email
    });
    if (!user) {
        throw (0, _elysia.error)('Not Found', {
            error: 'User not found'
        });
    }
    const resetToken = Math.random().toString(36).slice(-8);
    const hashedToken = await (0, _hashingpassword.hashPassword)(resetToken);
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour
    ;
    await user.save();
    const transporter = _nodemailer.default.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Password Recovery',
        text: `Your password reset token is: ${resetToken}. This token will expire in 1 hour.`
    }).catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Failed to send recovery email'
        });
    });
    return true;
};

//# sourceMappingURL=recover-password.js.map