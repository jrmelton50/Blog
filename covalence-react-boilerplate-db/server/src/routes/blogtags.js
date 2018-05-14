import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

const router = Router();
const blogtagsTable = new Table("BlogTags");

router.get("/", (req, res) => {
    blogtagsTable.getAll()
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    blogtagsTable.getOne(req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    blogtagsTable.insert(req.body)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
    blogtagsTable.insert(req.params.id, req.body)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    blogtagsTable.delete(req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;