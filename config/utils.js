const jsonwebtoken = require("jsonwebtoken");

const PRIV_KEY = Buffer.from(process.env.PRIVATE_KEY, "base64").toString(
  "ascii",
);

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
