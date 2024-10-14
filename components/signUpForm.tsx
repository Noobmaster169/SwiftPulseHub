"use client";

import Link from "next/link";
import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  return (
    <div className="w-full max-w-md">
      <form>
        <Card className="bg-opacity-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl text-center font-bold">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" placeholder="username"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="password"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="py-0.5 w-32 mt-4 rounded bg-gray-800 text-sm text-white">Create account</button>
          </CardFooter>
        </Card>
        <div className="mt-4 bg-black bg-opacity-60 text-center text-sm text-white">
          Have an account?
          <Link className="underline ml-2 font-semibold" href="signIn">
          
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}