"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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
import { Eye, EyeOff, LoaderIcon, ReceiptRussianRuble } from "lucide-react";

function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    } catch (error: ) {
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
    } catch (error: any) {
      console.error("Error", JSON.stringify(error, null, 2));
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsVerified(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center hc gap-y-6">
      <h1 className="text-2xl text-center font-bold">Sign Up</h1>
      <form className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button size="lg" type="submit" className="w-full">
          Continue
        </Button>
        <div className="flex">
          <p className="text-sm text-muted-foreground text-center w-full">
            Already a member?{" "}
            <Link href="sign-in" className="text-foreground">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
