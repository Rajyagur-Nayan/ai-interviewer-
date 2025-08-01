"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/client";
import { signIn } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type formType = z.infer<typeof formSchema>;

const Signin = () => {
  const {
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const router = useRouter();

  const submit = async (e: formType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        e.email,
        e.password
      );
      const idToken = await userCredential.user.getIdToken();
      if (!idToken) {
        console.log("error login failed ");
        return;
      }

      await signIn({
        email: e.email,
        idToken,
      });

      console.log("login success");
      router.push("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-xl w-full mx-auto  p-10 rounded-2xl shadow-2xl border-2 mt-10">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <form method="post" onSubmit={handleSubmit(submit)}>
          {/*  email*/}
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Email"
                    className="text-muted-foreground font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="Email"
                    className="border-2 rounded-md p-2 px-4"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/*  password */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-muted-foreground font-semibold"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Your password"
                    className="border-2 rounded-md p-2 px-4"
                    {...field}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <div className="flex md:flex-row flex-col gap-2">
            <Button className="bg-blue-700 px-6 py-2 text-white rounded-sm hover:bg-blue-600 mt-3 cursor-pointer">
              Login
            </Button>
            <Link
              href="/signup"
              className="bg-blue-700 px-6 py-2 flex items-center justify-center text-white rounded-sm hover:bg-blue-600 mt-3 cursor-pointer"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
