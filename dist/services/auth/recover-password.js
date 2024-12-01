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
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _User = require("../../models/User");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DAY = 3_600_000;
const recoverPasswordService = async (email)=>{
    const user = await _User.User.findOne({
        email
    });
    if (!user) {
        throw (0, _elysia.error)('Not Found', {
            error: 'Usuário não encontrado'
        });
    }
    const resetToken = _crypto.default.randomBytes(32).toString('hex');
    const hashedToken = await Bun.password.hash(resetToken);
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + DAY * 0.5) // 30 minutes
    ;
    await user.save().catch((err)=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Erro ao salvar informações do token',
            details: err.message
        });
    });
    const transporter = _nodemailer.default.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: Number(process.env.MAIL_PORT) === 465,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
    await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Solicitação de redefinição de senha',
        text: `Você solicitou uma redefinição de senha. Clique no link para redefinir sua senha: ${resetLink}`,
        html: `<p>Você solicitou uma redefinição de senha.</p>
             <p>Clique no link abaixo para redefinir sua senha:</p>
             <a href="${resetLink}">Redefinir senha</a>
             <p>O link é válido por 30 minutos.</p>`
    }).catch((err)=>{
        throw (0, _elysia.error)('Internal Server Error', {
            error: 'Falha ao enviar e-mail',
            details: err.message
        });
    });
    return {
        success: true,
        message: 'E-mail enviado com sucesso'
    };
};

//# sourceMappingURL=recover-password.js.map