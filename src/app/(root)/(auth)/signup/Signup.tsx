"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "../../../../../firebase/client";
import { signup } from "@/lib/actions/auth.action";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userName: z.string().min(2, {
    message: "plz enter a valid user name ",
  }),
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
      userName: "",
    },
  });

  const router = useRouter();

  const submit = async (e: formType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        e.email,
        e.password
      );

      const result = await signup({
        uid: userCredential.user.uid,
        email: e.email,
        password: e.password,
        userName: e.userName!,
      });

      if (!result.success) {
        console.log("user is not created ");
        return;
      }
      alert("User registered successfully");
      reset();
      router.push("/signin");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-xl w-full mx-auto  p-10 rounded-2xl shadow-2xl border-2 mt-10">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">Register</h1>
        </div>
        <form method="post" onSubmit={handleSubmit(submit)}>
          {/*  UserName*/}
          <Controller
            control={control}
            name="userName"
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="userName"
                    className="text-muted-foreground font-semibold"
                  >
                    UserName
                  </label>
                  <input
                    id="userName"
                    className="border-2 rounded-md p-2 px-4"
                    placeholder="Enter your userName"
                    type="text"
                    {...field}
                  />
                  {errors.userName && (
                    <p className="text-destructive text-sm">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
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
          <Button className="bg-blue-700 px-6 py-2 text-white rounded-sm hover:bg-blue-600 mt-3 cursor-pointer">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
