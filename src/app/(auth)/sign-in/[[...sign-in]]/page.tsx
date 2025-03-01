// "use client";

// import React, { useState } from "react";
// import { useSignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// // import { toast } from "react-toastify";
// import Link from "next/link";
// import { LoaderIcon, Mail, Lock } from "lucide-react";

// function SignIn() {
//   const { isLoaded, signIn, setActive } = useSignIn();

//   const router = useRouter();

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!isLoaded) return;

//   //   if (!email || !password) {
//   //     return toast.warning("Please fill out all fields.");
//   //   }

//   //   setIsLoading(true);

//   //   try {
//   //     const signInAttempt = await signIn.create({
//   //       identifier: email,
//   //       password,
//   //       redirectUrl: "/auth-callback",
//   //     });

//   //     if (signInAttempt.status === "complete") {
//   //       await setActive({ session: signInAttempt.createdSessionId });
//   //       router.push("/auth-callback");
//   //     } else {
//   //       console.error(JSON.stringify(signInAttempt, null, 2));
//   //       toast.error("Invalid email or password. Please try again.");
//   //     }
//   //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //   } catch (error: any) {
//   //     switch (error.errors[0]?.code) {
//   //       case "form_identifier_not_found":
//   //         toast.error("This email is not registered. Please sign up first.");
//   //         break;
//   //       case "form_password_incorrect":
//   //         toast.error("Incorrect password. Please try again.");
//   //         break;
//   //       case "too_many_attempts":
//   //         toast.error(
//   //           "Too many attempts. Please try again later or reset your password."
//   //         );
//   //         break;
//   //       default:
//   //         toast.error("An error occurred. Please try again.");
//   //     }
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   return (
//     <div className="flex flex-col items-center justify-center hc gap-y-6">
//       <h1 className="text-2xl text-center font-bold">Sign In</h1>
//       <form
//         // onSubmit={handleSubmit}
//         className="w-full max-w-sm space-y-4 border p-7 rounded-lg shadow-lg"
//       >
//         <div className="space-y-2">
//           <Label htmlFor="email">Email Address</Label>
//           <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
//             <Mail className="w-5 h-5 text-muted-foreground" />
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={email}
//               disabled={isLoading}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email address"
//               className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
//             />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="password">Password</Label>
//           <div className="flex items-center w-full px-3 py-2 border rounded-lg shadow-sm focus-within:border-blue-600 bg-white">
//             <Lock className="w-5 h-5 text-muted-foreground" />
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={password}
//               disabled={isLoading}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full ml-2 bg-transparent outline-none text-sm placeholder-gray-500 p-0.5"
//             />
//           </div>
//         </div>
//         <div id="clerk-captcha"></div>
//         <Button
//           size="lg"
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-500 hover:bg-blue-600"
//         >
//           {isLoading ? (
//             <LoaderIcon className="animate-spin w-5 h-5" />
//           ) : (
//             "Sign In"
//           )}
//         </Button>
//         <div className="flex">
//           <p className="text-sm text-muted-foreground text-center w-full">
//             Don&apos;t have an account?{" "}
//             <Link href="sign-up" className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SignIn;
