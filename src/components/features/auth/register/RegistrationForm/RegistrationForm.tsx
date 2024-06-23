'use client'

import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Button, Text } from '@mantine/core';
import { PasswordInput, TextInput } from 'react-hook-form-mantine';
import { UserIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import styles from './RegistrationForm.module.css';
import { RegisterFormData } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { register, RegisterState } from './actions';
import { useFormState, useFormStatus } from 'react-dom';

const RegisterFormSchema: ZodType<RegisterFormData> = z.object({
    username: z
        .string()
        .min(1, { message: 'Username is required' })
        .max(32, { message: 'Username must be 32 characters or less' })
        .refine((s) => {
            return /^[a-zA-Z0-9]+$/.test(s);
        }, { message: 'Username may only contain letters and numbers' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
});

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button color="primary" type="submit" loading={pending} size="md" className={styles.submitButton}>Register</Button>
    );
}

export const ServerErrorMessage = ({ state }: { state: RegisterState | null }) => {
    const { pending } = useFormStatus();

    return !pending && state?.status === 'error' && !state.isEmailTaken && !state.isUsernameTaken && (
        <Text ta="center" className={styles.serverError}>Unable to register user. Please try again.</Text>
    );
}

const RegistrationForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const [state, formAction] = useFormState<RegisterState, RegisterFormData>(register, null);
    const action: () => void = handleSubmit(async (data) => await formAction(data));

    return (
        <form className={styles.main} autoComplete="off" action={action} noValidate role="form">
            <TextInput
                name="username"
                label="Username"
                placeholder="Username"
                maxLength={32}
                rightSection={<UserIcon />}
                control={control}
                error={state?.isUsernameTaken ? 'Username is already in use' : errors.username?.message}
                size="md"
            />

            <TextInput
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                rightSection={<EnvelopeIcon />}
                control={control}
                error={state?.isEmailTaken ? 'Email is already in use' : errors.email?.message}
                size="md"
            />

            <PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                rightSection={<KeyIcon />}
                control={control}
                error={errors.password?.message}
                size="md"
            />

            <SubmitButton />
            <ServerErrorMessage state={state} />
        </form>
    );
};

export default RegistrationForm;