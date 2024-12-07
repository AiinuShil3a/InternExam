const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { ENCRYPTION_KEY } = process.env;
const IV_LENGTH = 16;

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv)
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

exports.decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString();
}


exports.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.compareHash = (dbPassword, password) => {
  return bcrypt.compareSync(password, dbPassword);
};

exports.generateResetToken = () => {
  // สร้าง token แบบสุ่มโดยใช้ randomBytes (32 bytes)
  const resetToken = crypto.randomBytes(32).toString("hex");  // hex เป็นรูปแบบที่นิยมใช้ในการเก็บ token
  return resetToken;
};