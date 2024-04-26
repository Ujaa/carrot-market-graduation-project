import { z } from "zod";
import {
  ErrorMessages,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "./constants";

const emailSchema = z
  .string({
    invalid_type_error: ErrorMessages.EMAIL_UNVALID_ERROR,
    required_error: ErrorMessages.EMAIL_REQUIRED_ERROR,
  })
  .email();

const passwordSchema = z
  .string({
    required_error: ErrorMessages.PASSWORD_REQUIRED_ERROR,
  })
  .trim()
  .min(PASSWORD_MIN_LENGTH, ErrorMessages.PASSWORD_MIN_LENGTH_ERROR)
  .regex(PASSWORD_REGEX, ErrorMessages.PASSWORD_REGEX_ERROR);

export const createAccountFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: ErrorMessages.PASSWORD_CONFIRM_ERROR,
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
