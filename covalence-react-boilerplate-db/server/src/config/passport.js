import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { encode, decode } from "../utils/tokens";
import { checkPassword } from "../utils/bcrypt";
import Table from "../table";

let authorsTable = new Table("Authors");
let tokensTable = new Table("Tokens");

function configurePassport(app) {
  passport.use(
    new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        sessions: false
    },
    (email, password, done) => {
        authorsTable
        .find({
            email: email
        })
        .then(results => {
            return results[0];
        })
        .then(user => {
            if (user && user.password) {
                checkPassword(password, user.password)
                .then( (matches) => {
                    if (matches) {
                        tokensTable.insert({
                            authorid: user.id
                        })
                        .then( (idObj) => {
                            return encode(idObj.id);
                        })
                        .then( (tokenValue) => {
                            return done(null, {token: tokenValue, number: user.id, name: user.name});
                        })
                        .catch( (err) => {
                            console.log(err);
                        });
                    }
                    else { // passwords don't match
                        return done(null, false, {message: "Invalid login"});
                    }
                })
                .catch( (err) => {
                    throw err;
                });
            }
            else { // couldn't find user
                return done(null, false, {message: "Invalid login"});
            }
        })
        .catch(err => {
            return done(err);
        });
      }
    )
  );

  passport.use(
    new BearerStrategy((token, done) => {
    //   console.log("got here 1");
      let tokenId = decode(token);
      if (!tokenId) {
        // console.log("GOT HERE");
        return done(null, false, { message: "Invalid token" });
      }
      tokensTable
        .getOne(tokenId)
        .then(tokenRecord => {
        //   console.log("Token Record: ", tokenRecord)
          return authorsTable.getOne(tokenRecord.authorid);
        })
        .then(user => {
        //   console.log("The user is: ", user)
          if (user) {
            delete user.password;
            // console.log("Final User: ", user);
            return done(null, user);
          } 
          else {
            //   console.log("HERE!");
            return done(null, false, { message: "Invalid token" });
          }
        })
        .catch(err => {
            // console.log("here!");
          return done(err);
        });
    })
  );

  app.use(passport.initialize());
}

export default configurePassport;