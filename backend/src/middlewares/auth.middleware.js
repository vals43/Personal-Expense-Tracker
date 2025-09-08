import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";


export function authMiddleware(req, res, next) {
const auth = req.headers.authorization;
if (!auth || !auth.startsWith("Bearer ")) {
return res.status(401).json({ message: "Missing or invalid Authorization header" });
}
const token = auth.slice("Bearer ".length);
try {
const payload = jwt.verify(token, JWT_SECRET); // pas de types ici
req.userId = payload.sub; // on attache l'id utilisateur
next();
} catch {
return res.status(401).json({ message: "Invalid or expired token" });
}
}