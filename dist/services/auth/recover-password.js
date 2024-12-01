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
            error: 'Usuário não encontrado'
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
        subject: 'Solicitação de redefinição de senha',
        text: `Seu token de redefinição de senha é ${resetToken}`
    }).catch(()=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao enviar e-mail'
        });
    });
    return true;
};

//# sourceMappingURL=recover-password.js.map