// db.ts – très simple: on garde les utilisateurs en mémoire pour la démo
export type User = {
id: string;
email: string;
name: string;
passwordHash: string;
};


// Tableau global (réinitialisé à chaque redémarrage)
export const users: User[] = [];


// Petit générateur d'id (démo)
export function makeId() {
return Math.random().toString(36).slice(2);
}