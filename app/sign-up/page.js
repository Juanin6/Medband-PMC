"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      
      const userCredential = await createUserWithEmailAndPassword(email, password);
      console.log(userCredential)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username
      })

      if (user) {
        // Simulate successful login
        alert("Login successful!");
        router.push("/dashboard/chat");
        // Reset form
        setEmail("");
        setPassword("");
      }
      else{
        setLoading(false)
        setError("Invalid email or password")
      }
    } catch (e) {
      setError("An error occurred during login");
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-70 to-white pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 rounded-full bg-blue-200 mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <Card className="w-full max-w-md z-10 border-2 ">
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="text-gradient">Sign up</span>
          </CardTitle>
          <CardDescription>
            <span className="text-slate-500  leading-relaxed">
              {" "}
              Create your account to get started with MedBand.
            </span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline group"
                >
                  
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
