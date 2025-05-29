const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");

const pathToKey = path.join(__dirname, "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, async (token, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id: token.sub },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.error("Error in JWT strategy:", error);
      return done(error, false);
    }
  }),
);
