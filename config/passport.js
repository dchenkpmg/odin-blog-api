const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { bcrypt } = require("bcryptjs");
const passport = require("passport");

const pathToKey = path.join(__dirname, "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, async (username, password, done) => {
    const prisma = new PrismaClient();
    try {
      console.log("Authenticating user with payload:", payload);
      const user = await prisma.users.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, {
          message: "Username or Password is incorrect",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, {
          message: "Username or Password is incorrect",
        });
      }
      return done(null, user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      return done(error, false);
    }
  }),
);
