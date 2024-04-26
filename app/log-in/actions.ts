"use server";

import { ErrorMessages } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { loginFormSchema } from "@/lib/validation";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginFormSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/");
  }
}
