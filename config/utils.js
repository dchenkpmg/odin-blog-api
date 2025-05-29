const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const pathToKey = path.join(__dirname, "id_rsa_priv.pem");

const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

function issueJWT(user) {
  const id = user.id;
  const expiresIn = 60 * 60;

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000), // issued at time
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

module.exports = {
  issueJWT,
};
