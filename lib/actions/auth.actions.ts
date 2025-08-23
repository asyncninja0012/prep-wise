"use server"

import { success } from "zod";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 7 * 24 * 60 * 60; // 7 days in milliseconds

export async function signUp(params:SignUpParams){
    const {uid, name, email}  = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get()

        if(userRecord.exists){
            return{
                success: false,
                message: "User already exists. Please sign in.",
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
            
        });

        return{
            success: true,
            message: "User created successfully. Please sign in.",
        }

    }
    catch(e:any){
        console.log("Error creating user:", e);
        
        if(e.code==='auth/email-already-in-use'){
           return{
            success: false,
            message: "Email already exists. Please use a different email."
           }
        }

        return{
            success: false,
            message: e.message || "Failed to create user. Please try again later."
        }

    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success: false,
                message: "User not found. Please sign up first."
            }
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: "Signed in successfully"
        }
    }
    catch(e:any){
        console.error("Error signing in:", e);
        return {
            success: false,
            message: "Failed to log in to account. Please try again later."
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000
    });
    
    cookieStore.set(
        'session',sessionCookie, {
            maxAge: ONE_WEEK,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    

}

export async function getCurrentUser():Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord  = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }
        
        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }


}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

