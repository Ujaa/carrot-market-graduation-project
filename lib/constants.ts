/**
 * Collection Name
 */

export const COLLECTION_NAME_POSTS = "posts";
export const COLLECTION_NAME_PROFILE = "profiles";

/**
 * Constant Numbers
 */

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 10;
export const POST_MIN_LENGTH = 5;

/**
 * Regex
 */

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

/**
 * Error Messages
 */

export class ErrorMessages {
  static USERNAME_REQUIRED_ERROR = "Please enter a username";
  static USERNAME_MIN_LENGTH_ERROR = `Username must be at least ${USERNAME_MIN_LENGTH} characters`;
  static USERNAME_MAX_LENGTH_ERROR = `The username should be limited to ${USERNAME_MAX_LENGTH} characters`;
  static USERNAME_UNIQUE_ERROR = "Username already exists";

  static EMAIL_REQUIRED_ERROR = "Please enter an email address";
  static EMAIL_INVALID_FORMAT_ERROR = "Invalid email address format";
  static EMAIL_UNIQUE_ERROR = "Email address already in use";
  static EMAIL_NOT_EXIST_ERROR = "Email address does not exist";

  static PASSWORD_REQUIRED_ERROR = "Please enter a password";
  static PASSWORD_MIN_LENGTH_ERROR = `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
  static PASSWORD_REGEX_ERROR =
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  static PASSWORD_CONFIRM_ERROR = "Password do not match";
  static PASSWORD_WRONG_ERROR = "Wrong password";

  static POST_MIN_LENGTH_ERROR = `The content should be at least ${POST_MIN_LENGTH} characters`;
}

/**
 * Cookie names
 */

export const COOKIE_NAME_USER_LOGIN = "USER_LOGIN";
