function isAdmin(req, res, next) {
    if (req.user.role === "Admin") {
        next();
    }
    else {
        res.sendStatus(403);
    }
}

export { isAdmin };