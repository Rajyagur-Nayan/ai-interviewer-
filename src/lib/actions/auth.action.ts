"use server";

import { cookies } from "next/headers";
import { db, auth } from "../../../firebase/admin";
import { NextResponse } from "next/server";

interface signUp {
  uid: string;
  userName: string;
  email: string;
  password: string;
}

interface signIn {
  email: string;
  idToken: string;
}
interface User {
  id: string;
  email: string;
  userName?: string;
}

export async function signup(params: signUp) {
  const { uid, email, userName } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "user already exist go to login ",
      };
    }

    await db.collection("users").doc(uid).set({
      userName,
      email,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.log("error creating at user ", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        massage: "thi sis email is exist ",
      };
    }
    return {
      success: false,
      massage: "failed to create a user ",
    };
  }
}
export async function sessionCookie(idToken: string) {
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });

  const response = NextResponse.redirect("/dashboard"); // or your desired redirect
  response.cookies.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export async function signIn(params: signIn) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User Does Not exist create an account  ",
      };
    }

    await sessionCookie(idToken);
    if (!sessionCookie) {
      console.log("No session cookie found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to Login ",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
