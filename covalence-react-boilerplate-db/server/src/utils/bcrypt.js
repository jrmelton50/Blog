import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;

function createPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

function checkPassword(password, hashFromDB) {
    return bcrypt.compare(password, hashFromDB);
}

export { createPassword, checkPassword };