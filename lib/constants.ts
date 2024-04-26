/**
 * Constant Numbers
 */

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 10;

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
  static USERNAME_REQUIRED_ERROR = "닉네임을 입력해 주세요";
  static USERNAME_MIN_LENGTH_ERROR = `닉네임은 ${USERNAME_MIN_LENGTH}글자 이상만 가능해요.`;
  static USERNAME_MAX_LENGTH_ERROR = `닉네임은 ${USERNAME_MAX_LENGTH}글자 이하만 가능해요.`;
  static USERNAME_UNIQUE_ERROR = "이미 존재하는 이름이에요.";

  static EMAIL_REQUIRED_ERROR = "이메일을 입력해 주세요";
  static EMAIL_UNVALID_ERROR = "유효하지 않은 이메일이에요.";
  static EMAIL_UNIQUE_ERROR = "이미 존재하는 이메일이에요.";
  static EMAIL_NOT_EXIST_ERROR = "존재하지 않는 이메일이에요.";

  static PASSWORD_REQUIRED_ERROR = "이메일을 입력해 주세요";
  static PASSWORD_MIN_LENGTH_ERROR = "유효하지 않은 이메일이에요.";
  static PASSWORD_REGEX_ERROR = "이미 존재하는 이메일이에요.";
  static PASSWORD_CONFIRM_ERROR = "이미 존재하는 이메일이에요.";
}

/**
 * Cookie names
 */

export const COOKIE_NAME_USER_LOGIN = "USER_LOGIN";
