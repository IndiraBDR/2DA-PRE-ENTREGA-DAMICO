

export const authMiddleware = (roles) => {

    return (req, res, next) => {

        const user = req.user;

        if (!user) {

            return res.status(401).json({ message: "Unauthorized" })

        }

        if (roles && !roles.includes(user.roles)) {

            return res.status(403).json({ message: "Forbidden" })

        }

        next();
    }


}