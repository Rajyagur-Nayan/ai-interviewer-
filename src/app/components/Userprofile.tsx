"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Userprofile = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3">
            <Image
              src="/img1.jpg"
              alt="profileImage"
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-500"
            />
          </div>

          {/* User Info Fields */}
          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="your username"
                className="bg-gray-700 text-white border border-gray-600 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="your email"
                className="bg-gray-700 text-white border border-gray-600 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* OTP Field */}
        <div className="mt-6">
          <div className="mb-3">
            <label className="block text-sm mb-3">Password</label>
            <input
              type="password"
              placeholder="your password"
              className="bg-gray-700 text-white border border-gray-600 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="block text-sm mb-1">OTP</label>
          <input
            type="text"
            placeholder="Enter your OTP"
            className="bg-gray-700 text-white border border-gray-600 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue="Pedro Dustin"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input
                      id="username-1"
                      name="username"
                      defaultValue="@Dustin"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <Button className="bg-red-600 hover:bg-red-700">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
