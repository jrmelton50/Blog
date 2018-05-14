import { Router } from 'express';
import passport from 'passport';
import { createPassword } from '../utils/bcrypt';

let router = Router();

// api/auth/login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, tok, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        else if (!tok) {
            console.log("Returning a 401...");
            return res.status(401).json(info);
        }
        else {
            return res.status(201).json(tok);
        }
    })(req, res, next);
});

// This was written to generate passwords for the current users in our database that didn't have a password yet.
// // api/auth/generate/:pw
// router.get('/generate/:pw', (req, res, next) => {
//     createPassword(req.params.pw)
//     .then( (hash) => {
//         res.send(hash);
//     })
//     .catch( (err) => {
//         next(err);
//     });
// });

export default router;