"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hashPassword", {
    enumerable: true,
    get: function() {
        return hashPassword;
    }
});
const hashPassword = async (password)=>{
    return Bun.password.hash(password, {
        algorithm: 'argon2id',
        memoryCost: 65536,
        timeCost: 2
    });
};

//# sourceMappingURL=hashing-password.js.map