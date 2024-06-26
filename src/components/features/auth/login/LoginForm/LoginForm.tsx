'use client'

import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Button, Text } from '@mantine/core';
import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import styles from './LoginForm.module.css';
import { LoginFormData } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { LoginState, login } from './actions';
import Link from 'next/link';

const LoginFormSchema: ZodType<LoginFormData> = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
});

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button color="primary" type="submit" loading={pending} size="md" className={styles.submitButton}>Log In</Button>
    );
}

export const LoginErrorMessage = ({ state }: { state: LoginState | null }) => {
    const { pending } = useFormStatus();

    if (pending || state?.status !== 'error') {
        return null;
    }

    if (state.authError) {
        return <Text ta="center" className={styles.error}>Invalid email or password</Text>;
    } else {
        return <Text ta="center" className={styles.error}>Unable to log you in. Please try again.</Text>;
    }
}

const LoginForm = () => {
    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [state, formAction] = useFormState<LoginState, LoginFormData>(login, null);
    const action: () => void = handleSubmit(async (data) => await formAction(data));

    return (
        <form className={styles.main} autoComplete="off" action={action} noValidate role="form">
            <TextInput
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                rightSection={<EnvelopeIcon />}
                control={control}
                size="md"
            />

            <div>
                <PasswordInput
                    name="password"
                    label="Password"
                    placeholder="Password"
                    rightSection={<KeyIcon />}
                    control={control}
                    size="md"
                />
                <Text size="sm" ta="right" className={styles.recoveryLink}><Link href="/password-recovery">Forgot your password?</Link></Text>
            </div>

            <SubmitButton />
            <LoginErrorMessage state={state} />
        </form>
    );
};

export default LoginForm;