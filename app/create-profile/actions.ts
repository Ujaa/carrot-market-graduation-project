"use server";
import db from "@/lib/db";
import { usernameSchema } from "@/lib/validation";
import { BodyShape } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createProfile(prevState: any, formData: FormData) {
  const username = formData.get("username");

  const result = await usernameSchema.spa(username);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const profile = await db.profile.create({
      data: {
        username: result.data,
        bodyShape: BodyShape.DROP,
        bodyColor: "123",
        eyeColor: "123",
        userId: 123,
      },
      select: {
        id: true,
      },
    });

    redirect("/");
  }
}
