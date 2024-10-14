"use client";

import Link from "next/link";
import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SigninForm() {
  return (
    <div className="w-full max-w-md">
      <form>
        <Card className="bg-opacity-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl text-center font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="identifier" name="identifier" type="text" placeholder="username or email"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="password"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-20 rounded bg-gray-800 text-white">Confirm</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm text-white ">
          Don't have an account?
          <Link className="underline ml-2 font-semibold" href="signUp">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}