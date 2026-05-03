import {getApps, initializeApp, cert} from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";


const initFireBaseAdmin = () => {
    const apps = getApps();

    if(!apps.length){
        try {
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                })
            })
        } catch (error: any) {
            console.error("Firebase admin initialization error:", error.message);
        }
    }

    try {
        return {
            auth: getAuth(),
            db: getFirestore()
        }
    } catch (error: any) {
        // Return null objects that will cause safe errors when used,
        // which are already caught by auth.actions.ts try-catch blocks.
        return {
            auth: null as unknown as ReturnType<typeof getAuth>,
            db: null as unknown as ReturnType<typeof getFirestore>
        }
    }
}

export const {auth, db} = initFireBaseAdmin();