"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.actions"



const authFormSchema = (type:FormType) => {
    return z.object({
        name: type==="sign-up"?z.string().min(3):z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

function AuthForm({type}:{type: FormType}) {
    const formSchema = authFormSchema(type);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  const router = useRouter();

async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type==="sign-up"){

            const {name, email, password} = values;
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            const result = await signUp({
                uid: userCredentials.user.uid,
                name: name!,
                email,
                password
            });

            if(!result?.success){
                toast.error(result?.message);
                return;
            }
           
            toast.success("Account created successfully");
            router.push('/sign-in');
            
        }
        else{
            
            const {email, password} = values;
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            const idToken = await userCredentials.user.getIdToken();

            if(!idToken){
                toast.error("Sign-in failed. Please try again later.");
                return;
            }

            const result = await signIn({
                email,
                idToken
            });

            if (!result?.success) {
                toast.error(result?.message || "Server sign-in failed. Please check server logs.");
                return;
            }
            
            toast.success("Logged in successfully");
            router.push('/dashboard');
        }
    } catch(error: any) {
        console.error(error);
        toast.error(error.message || "An unexpected error occurred.");
    }
  }

  const isSignIn = type==="sign-in"
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="logo" width="38" height="32" />
                <h2 className="text-primary-100">PrepWise</h2>
            </div>
            <h3> Practice Job Interviews with AI</h3>
        
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                {!isSignIn && (<FormField control={form.control} name="name" label="Name" placeholder="Enter your name" type="text" />)}
                <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
                <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" autoComplete="new-password" />
                <Button type="submit">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                <p className="text-center">
                    {isSignIn? "No account yet?": "Have an account already"}
                    <Link href={!isSignIn?'/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">
                        {!isSignIn?"Sign-in":"Sign-up"}
                    </Link>
                </p>
            </form>
            </Form>
         </div>
    </div>
  )
}

export default AuthForm
