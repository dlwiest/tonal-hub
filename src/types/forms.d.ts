export interface PasswordRecoveryFormData {
    email: string;
}

export interface LoginFormData extends PasswordRecoveryFormData {
    password: string;
}

export interface RegisterFormData extends LoginFormData {
    username: string;
}

export interface PasswordUpdateFormData {
    authCode: string;
    password: string;
}