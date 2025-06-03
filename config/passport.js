const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");

const PUB_KEY = Buffer.from(process.env.PUBLIC_KEY, "base64").toString("ascii");

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
      } else if (!user.isAdmin) {
        return done(null, false, { message: "Unauthorised access" });
      }
      return done(null, user);
    } catch (error) {
      console.error("Error in JWT strategy:", error);
      return done(error, false);
    }
  }),
);
