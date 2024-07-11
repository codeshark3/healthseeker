// import "server-only";
"use server";
import type * as z from "zod";
import { redirect } from "next/navigation";

import { LoginSchema, RegisterSchema,UserFormSchema } from "~/schemas/index";

import { db } from "~/server/db";

import { userTable } from "~/server/db/schema";

import { getUserByEmail, getUserByEmailAndPassword } from "~/server/data/user";
import * as argon2 from "argon2";
import { lucia } from "~/lib/auth";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { validateRequest } from "~/lib/auth";
// import bcrypt from "bcrypt";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const existingUser = await getUserByEmailAndPassword(
    validatedFields.data.email,
    validatedFields.data.password,
  );
  // const existingUser = await getUserByEmail(validatedFields.data.email);

  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  if (!existingUser.password) {
    return { error: "Invalid Password !" };
  }
  // const isValidPassword = await argon2.verify(
  //   existingUser.password,
  //   validatedFields.data.password,
  // );
  // if (!isValidPassword) {
  //   return { error: "Incorrect Email or Password! " };
  // }
  const userId = existingUser.id;
  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { success: "Login Successful" };
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }
  // if (password !== confirm_password) {
  //   return { error: "Passwords do not match" };
  // }
//   const hashedPassword = await bcrypt.hash(password, 10);
   const hashedPassword = await argon2.hash(values.password);
  const userId = generateId(15);
  try {
    await db.insert(userTable).values({
      // id: userId,
      email,
      password: hashedPassword,
      name,
    });
  } catch (error: any) {
    return { error: error?.message };
  }
  // send verification token email to user
  return { success: "Registration Successful" };
}

export async function logout() {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return { error: "Unauthorized!" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/auth/login");
  } catch (error: any) {
    return { error: error?.message };
  }

  return { success: "Logout Successful" };
}

// Check user session
export async function checkUserSession() {
  const user = await validateRequest();
  if (user) {
    console.log("user", user);
    return redirect("/");
  }
  return null;
}

// export async function logout() {
//   try {
//     console.log("logout");
//     const { session } = await validateRequest();
//     if (!session) {
//       return { error: "Unauthorized!" };
//     }

//     await lucia.invalidateSession(session.id);

//     const sessionCookie = lucia.createBlankSessionCookie();
//     cookies().set(
//       sessionCookie.name,
//       sessionCookie.value,
//       sessionCookie.attributes,
//     );
//     return redirect("/auth/login");
//   } catch (error: any) {
//     return { error: error?.message };
//   }
// }

