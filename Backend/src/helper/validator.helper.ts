export class UserValidator {
  public validateEmail(email: string): boolean {
    const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

    return REGEX_EMAIL.test(email)
  }

  public validatePassword(password: string): boolean {
    return password.length >= 8
  }

  public validateName(name: string): boolean {
    return name.length >= 3
  }
}