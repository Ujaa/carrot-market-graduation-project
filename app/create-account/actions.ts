"use server";

import db from "@/lib/db";
import { createAccountFormSchema } from "@/lib/validation";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await createAccountFormSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 8);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    redirect("/log-in");
  }
}
