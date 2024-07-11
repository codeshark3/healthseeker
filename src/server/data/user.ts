import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";

export const getUserById = async (id: string ) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: (model, { eq }) => eq(model.email, email),
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: (model, { eq }) => eq(model.email, email),
    });

    // if (user && user.password === password) {
    //   return user;
    // }
    return user;
  } catch {
    return null;
  }
};
