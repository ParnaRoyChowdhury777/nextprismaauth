"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import { Mail, Loader, Lock } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl text-center font-bold">
            Sign in to your account
          </h1>

          <Clerk.Connection name="google" className="w-full">
            <Clerk.Loading scope="provider:google">
              {(isLoading) =>
                isLoading ? (
                  <div className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium duration-150">
                    <Loader className="size-4 animate-spin" />
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                    <Clerk.Icon className="size-4" />
                    Continue with Google
                  </div>
                )
              }
            </Clerk.Loading>
          </Clerk.Connection>

          <div className="flex items-center w-full gap-3">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <Clerk.Field name="identifier" className="flex flex-col space-y-2">
            <Clerk.Label className="text-sm">Email</Clerk.Label>
            <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <Clerk.Input
                type="email"
                placeholder="Enter your email address"
                className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
                required
              />
            </div>
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignIn.Action submit asChild>
            <Button className="w-full">
              <Clerk.Loading>
                {(isLoading) =>
                  isLoading ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    "Sign In"
                  )
                }
              </Clerk.Loading>
            </Button>
          </SignIn.Action>
          <p className="text-sm text-muted-foreground text-center w-full">
            Don&apos;t have an account?{" "}
            <Clerk.Link
              navigate="sign-up"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Clerk.Link>
          </p>
        </SignIn.Step>

        <SignIn.Step
          name="verifications"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <SignIn.Strategy name="password">
            <h1 className="text-2xl text-center font-bold">
              Enter your password
            </h1>

            <Clerk.Field name="password" className="flex flex-col space-y-2">
              <Clerk.Label className="text-sm">Password</Clerk.Label>
              <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <Clerk.Input
                  type="password"
                  validatePassword
                  placeholder="Enter your password"
                  className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
                  required
                />
              </div>
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignIn.Action submit asChild>
              <Button className="w-full mb-0">
                <Clerk.Loading>
                  {(isLoading) =>
                    isLoading ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      "Continue"
                    )
                  }
                </Clerk.Loading>
              </Button>
            </SignIn.Action>
            <SignIn.Action
              navigate="forgot-password"
              asChild
              className="text-sm text-muted-foreground"
            >
              <div className="text-right ">
                <Button variant="link" className="text-blue-500">
                  Forgot password?
                </Button>
              </div>
            </SignIn.Action>
          </SignIn.Strategy>
        </SignIn.Step>

        <SignIn.Step
          name="forgot-password"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl text-center font-bold">
            Forgot your password?
          </h1>

          <div className="flex justify-between items-center">
            <SignIn.SupportedStrategy name="reset_password_email_code" asChild>
              <Button type="submit">Reset password</Button>
            </SignIn.SupportedStrategy>

            <SignIn.Action navigate="previous" asChild>
              <Button>Go back</Button>
            </SignIn.Action>
          </div>
        </SignIn.Step>

        <SignIn.Step
          name="reset-password"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <h1>Reset your password</h1>

          <Clerk.Field name="password">
            <Clerk.Label>New password</Clerk.Label>
            <Clerk.Input />
            <Clerk.FieldError />
          </Clerk.Field>

          <Clerk.Field name="confirmPassword">
            <Clerk.Label>Confirm password</Clerk.Label>
            <Clerk.Input />
            <Clerk.FieldError />
          </Clerk.Field>

          <SignIn.Action submit>Reset password</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
