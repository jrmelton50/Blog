import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

const router = Router();
const blogsTable = new Table("Blogs");

// gets all blogs
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

router.get('/blog/:id', (req, res) => {
    blogsTable.getOne(req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// gets all blogs but includes author's name
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

// gets one blog but includes author's name 
router.get('/bloguser/:id', (req, res) => {
    // console.log("req.params.id = ", req.params.id);
    callProcedure("spBlogUser", [req.params.id])
    .then( (results) => {
        // console.log("results = ", results);
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// get one author's blogs 
router.get('/userblogs/:id', (req, res) => {
    // console.log("GOT HERE!");
    callProcedure("spUserBlogs", req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/tags/:id', (req, res) => {
    callProcedure("spBlogsByTagid", req.params.id)
    .then( (results) => {
        res.json(results);
    }) 
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// creates a blog
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

router.put("/:id", (req, res) => {
    blogsTable.update(req.params.id, req.body)
    .then( (results) => {
        // console.log();
        res.json(results);
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    blogsTable.delete(req.params.id)
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