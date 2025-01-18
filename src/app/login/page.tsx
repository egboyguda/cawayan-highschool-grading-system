'use client'


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useActionState } from "react"
import { loginAction } from "@/action/login"

export default function LoginPage() {
    const [formState,action,isPending]= useActionState(loginAction.bind(null),{errors:{}})  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#092979] to-[#00d4ff] ">
      <Card className="w-full max-w-md bg-white rounded-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the High School Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Enter your username"
                name="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                    name="password"
                  required
                />
              </div>
            </div>
            {formState.errors._form && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors._form}
              </p>
            )}
            <Button type="submit" className="w-full mt-6 border-black border rounded-md">
                {isPending ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </CardContent>
       
      </Card>
    </div>
  )
}

