import bcrypt from "bcrypt";

export function passwordEncrypt(plainPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);

    return hash;
}