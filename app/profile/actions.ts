"use server";
import { z } from "zod";

const emailSchema = z.string().min(5).max(10);

export async function updateProfile(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  return {
    errors: [],
  };
}
