const argon2 = require("argon2");

async function hashPassword(password) {
    return argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 5,
        parallelism: 1,
    });
}

async function verifyPassword(password, storedHash) {
    return argon2.verify(storedHash, password);
}

module.exports = { hashPassword, verifyPassword };
