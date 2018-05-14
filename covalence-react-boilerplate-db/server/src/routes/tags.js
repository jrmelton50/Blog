import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

const router = Router();
const tagsTable = new Table("Tags");

router.get('/', (req, res) => {
    tagsTable.getAll()
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    tagsTable.insert(req.body)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
    tagsTable.update(req.params.id, req.body)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;