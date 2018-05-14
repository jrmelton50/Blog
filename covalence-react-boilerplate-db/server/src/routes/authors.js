import { Router } from 'express';
import Table from '../table';
import { isLoggedIn } from '../middleware/auth.mw';
import { isAdmin } from '../middleware/admin.mw'; 
import { tokenMiddleware } from "../middleware/auth.mw";
import { createPassword } from "../utils/bcrypt";
import { executeQuery } from '../config/db';

const router = Router();
const authorsTable = new Table("Authors");

router.get("/", tokenMiddleware, isAdmin, (req, res) => { 
    authorsTable.getAll()
    .then( (results) => {
        res.json(results);
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    authorsTable.getOne(req.params.id)
    .then( (results) => {
        res.json(results);
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/email/:email", (req, res) => {
    let query = `SELECT id FROM Authors WHERE email = "${req.params.email}";`;
    executeQuery(query)
    .then( (results) => {
        res.json(results);
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    createPassword(req.body.password)
    .then( (hash) => {
        authorsTable.insert({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        .then( (results) => {
            res.json(results).send(200);
        })
        .catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;