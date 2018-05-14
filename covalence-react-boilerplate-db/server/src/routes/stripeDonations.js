import { Router } from "express";
import { charge } from '../utils/stripeCharge';

let router = Router();

router.post('/', (req, res) => {
    let tokenid = req.body.token.id;
    console.log("tokenid = ", tokenid);
    let amount = req.body.token.amount;
    console.log("amount = ", amount);
    charge(tokenid, amount)
    .then( (success) => {
        res.status(200).json({ message: 'success'});
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;