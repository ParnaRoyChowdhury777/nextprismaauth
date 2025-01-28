"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "react-toastify";
import Link from "next/link";
import { LoaderIcon, User, Mail, Lock } from "lucide-react";

function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!name || !email || !password) {
      return toast.warning("Please fill out all fields.");
    }

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerified(true);

      await signUp.update({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));

      switch (error.errors[0]?.code) {
        case "form_identifier_exists":
          toast.error("This email is already registered. Please sign in.");
          break;
        case "form_password_owned":
          toast.error(
            "This password is too common. Please choose a strong password."
          );
          break;
        case "form_param_format_invalid":
          toast.error(
            "invalid email address. Please enter a valid email address."
          );
          break;
        case "form_password_length_too_short":
          toast.error(
            "Password is too short. Please choose a longer password."
          );
          break;
        default:
          toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!code) {
      return toast.warning("Verification code is required.");
    }

    setIsVerified(true);

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp?.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/auth-callback");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        toast.error("Invalid verification code. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error", JSON.stringify(error, null, 2));
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsVerified(false);
    }
  };

  return verified ? (
    <div className="flex flex-col items-center justify-center hc gap-y-6 max-w-sm mx-auto text-center">
      <div className="w-full">
        <h1 className="text-2xl text-center font-bold">
          Please check your email
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          We&apos;ve sent a verification code to {email}
        </p>
      </div>
      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
      >
        <div className="space-y-2">
          <Label htmlFor="code">Verification code</Label>
          <InputOTP
            id="code"
            maxLength={6}
            value={code}
            disabled={isVerified}
            onChange={(e) => setCode(e)}
            className="pt-2"
          >
            <InputOTPGroup className="justify-center w-full">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="justify-center w-full">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          size="lg"
          type="submit"
          disabled={isVerified}
          className="w-full"
        >
          {isVerified ? (
            <LoaderIcon className="animate-spin w-5 h-5" />
          ) : (
            "Verify"
          )}
        </Button>
        <p className="text-sm text-muted-foreground text-center w-full">
          Back to Sign Up
          <Button
            size="sm"
            variant="link"
            type="button"
            disabled={isVerified}
            onClick={() => setVerified(false)}
          >
            Sign Up
          </Button>
        </p>
      </form>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <h1 className="text-2xl text-center font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-800 bg-white">
            <User className="w-5 h-5 text-muted-foreground" />
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-800 bg-white">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-800 bg-white">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
            />
          </div>
        </div>
        <div id="clerk-captcha"></div>
        <Button
          size="lg"
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? (
            <LoaderIcon className="animate-spin w-5 h-5" />
          ) : (
            "Continue"
          )}
        </Button>
        <div className="flex">
          <p className="text-sm text-muted-foreground text-center w-full">
            Already a member?{" "}
            <Link href="sign-in" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
