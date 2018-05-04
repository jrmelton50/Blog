import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

const router = Router();
const blogsTable = new Table("Blogs");

router.get('/', (req, res) => {
    blogsTable.getAll()
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/blogsusers', (req, res) => {
    callProcedure("spBlogsAndUsers")
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/bloguser/:id', (req, res) => {
    callProcedure("spBlogUser", req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    blogsTable.insert(req.body)
    .then( (results) => {
        // console.log();
        res.json(results);
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;