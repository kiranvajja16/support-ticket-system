const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "V.kiran16";
  const hash = await bcrypt.hash(password, 10);

  console.log("Password:", password);
  console.log("Hash:", hash);
}

generateHash();