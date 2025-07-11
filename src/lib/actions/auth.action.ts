"use server";

import { cookies } from "next/headers";
import { auth, db } from "../../../firebase/admin";

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

export async function signup(params: signUp) {
  const { uid, email, userName } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (!userRecord.exists) {
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
    console.log(error);

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

export async function signIn(params: signIn) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "failed To login ",
      };
    }
    await sessionCookie(idToken);
  } catch (error) {
    console.log(error);
  }
}

export async function sessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCooke = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });

  cookieStore.set("session", sessionCooke, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
