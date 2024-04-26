import { z } from "zod";
import {
  ErrorMessages,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "./constants";
import bcrypt from "bcrypt";
import db from "./db";

interface LoginData {
  email: string;
  password: string;
}

const checkPasswordIsRight = async ({ email, password }: LoginData) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });

  return await bcrypt.compare(password, user!.password);
};

const checkEmailExists = async (email: string, ctx: z.RefinementCtx) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    ctx.addIssue({
      code: "custom",
      message: ErrorMessages.EMAIL_NOT_EXIST_ERROR,
      path: ["email"],
      fatal: true,
    });

    return z.NEVER;
  }
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.profile.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const usernameSchema = z
  .string({
    required_error: ErrorMessages.USERNAME_REQUIRED_ERROR,
  })
  .trim()
  .min(USERNAME_MIN_LENGTH, ErrorMessages.USERNAME_MIN_LENGTH_ERROR)
  .max(USERNAME_MAX_LENGTH, ErrorMessages.USERNAME_MAX_LENGTH_ERROR)
  .toLowerCase()
  .refine(checkUniqueUsername, ErrorMessages.USERNAME_UNIQUE_ERROR);

const emailDefaultSchema = z
  .string({
    required_error: ErrorMessages.EMAIL_REQUIRED_ERROR,
  })
  .email(ErrorMessages.EMAIL_INVALID_FORMAT_ERROR);

const passwordDefaultSchema = z
  .string({
    required_error: ErrorMessages.PASSWORD_REQUIRED_ERROR,
  })
  .trim()
  .min(PASSWORD_MIN_LENGTH, ErrorMessages.PASSWORD_MIN_LENGTH_ERROR);

export const createAccountFormSchema = z
  .object({
    email: emailDefaultSchema.refine(
      checkUniqueEmail,
      ErrorMessages.EMAIL_UNIQUE_ERROR
    ),
    password: passwordDefaultSchema.regex(
      PASSWORD_REGEX,
      ErrorMessages.PASSWORD_REGEX_ERROR
    ),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: ErrorMessages.PASSWORD_CONFIRM_ERROR,
    path: ["confirmPassword"],
  });

export const loginFormSchema = z
  .object({
    email: emailDefaultSchema.superRefine(checkEmailExists),
    password: passwordDefaultSchema,
  })
  .refine(checkPasswordIsRight, {
    message: ErrorMessages.PASSWORD_WRONG_ERROR,
    path: ["password"],
  });
