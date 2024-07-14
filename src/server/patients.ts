"use server";
import type * as z from "zod";
import { redirect } from "next/navigation";

import {
  LoginSchema,
  PatientFormValidation,
  RegisterSchema,
  UserFormSchema,
} from "~/schemas/index";
import { getUserByEmailAndPassword, getUserByEmail } from "~/server/data/user";
import { db } from "~/server/db";
import { generateId } from "lucia";
import { patients, userTable } from "~/server/db/schema";
import { Patient } from "~/types/appwrite.types";

export const createUser = async (values: z.infer<typeof UserFormSchema>) => {
  const validatedFields = UserFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { email, phone, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  try {
    const password = "";
    const userId = generateId(15);
    await db.insert(userTable).values({
      id: userId,
      email,
      password,
      phone,
      name,
    });
    return { success: "User added", id: userId };
  } catch (error: any) {
    if (error && error?.code === "409") {
    }
  }
};

export const registerPatient = async (
  values: z.infer<typeof PatientFormValidation>,
) => {
  const validatedFields = PatientFormValidation.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
};
