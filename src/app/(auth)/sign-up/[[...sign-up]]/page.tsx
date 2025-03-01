"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Mail, Lock, Loader } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl text-center font-bold">Create an account</h1>

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

          <Clerk.Field name="username" className="flex flex-col space-y-2">
            <Clerk.Label className="text-sm">Username</Clerk.Label>
            <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
              <User className="w-5 h-5 text-muted-foreground" />
              <Clerk.Input
                placeholder="Enter your name"
                className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
                required
              />
            </div>
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <Clerk.Field name="emailAddress" className="flex flex-col space-y-2">
            <Clerk.Label className="text-sm">Email Address</Clerk.Label>
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

          <SignUp.Captcha />

          <SignUp.Action submit asChild>
            <Button className="w-full">
              <Clerk.Loading>
                {(isLoading) =>
                  isLoading ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    "Sign Up"
                  )
                }
              </Clerk.Loading>
            </Button>
          </SignUp.Action>

          <p className="text-sm text-muted-foreground text-center w-full">
            Already a member?{" "}
            <Clerk.Link
              navigate="sign-in"
              className="text-blue-500 hover:underline"
            >
              Sign in
            </Clerk.Link>
          </p>
        </SignUp.Step>

        <SignUp.Step
          name="continue"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl text-center font-bold">
            Continue registration
          </h1>

          <Clerk.Field name="username" className="flex flex-col space-y-2">
            <Clerk.Label className="text-sm">Username</Clerk.Label>
            <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
              <User className="w-5 h-5 text-muted-foreground" />
              <Clerk.Input
                placeholder="Enter your name"
                className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
                required
              />
            </div>
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignUp.Action submit asChild>
            <Button className="w-full">
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
          </SignUp.Action>
        </SignUp.Step>

        <SignUp.Step
          name="verifications"
          className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
        >
          <SignUp.Strategy name="email_code">
            <h1 className="text-2xl text-center font-bold">Check your email</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              We&apos;ve sent a verification code to your email
            </p>

            <Clerk.Field name="code" className="flex flex-col space-y-4">
              <Clerk.Label className="text-center">
                Enter the email code
              </Clerk.Label>
              <Clerk.Input
                type="otp"
                className="flex justify-center has-[:disabled]:opacity-50"
                autoSubmit
                render={({ value, status }) => {
                  return (
                    <div
                      data-status={status}
                      className={cn(
                        "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                        {
                          "z-10 ring-1 ring-blue-500":
                            status === "cursor" || status === "selected",
                        }
                      )}
                    >
                      {value}
                      {status === "cursor" && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <Clerk.FieldError className="block text-red-500 text-sm text-center" />
            </Clerk.Field>

            <SignUp.Action
              asChild
              resend
              className="text-muted-foreground"
              fallback={({ resendableAfter }) => (
                <div className="text-center">
                  <Button variant="link" size="sm" disabled>
                    Didn&apos;t receive a code? Resend (
                    <span className="tabular-nums">{resendableAfter}</span>)
                  </Button>
                </div>
              )}
            >
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-blue-500"
                >
                  Didn&apos;t receive a code? Resend
                </Button>
              </div>
            </SignUp.Action>
          </SignUp.Strategy>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}
