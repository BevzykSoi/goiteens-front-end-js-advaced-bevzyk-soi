module.exports = (req, res, next) => {
    if (req.user.isVerified) {
        next();
    } else {
        res.status(401).send("Email not verified!");
    }
}