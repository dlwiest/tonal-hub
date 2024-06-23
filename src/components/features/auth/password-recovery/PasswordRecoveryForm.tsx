'use client'

import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Button, Text } from '@mantine/core';
import { TextInput } from 'react-hook-form-mantine';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import styles from './PasswordRecoveryForm.module.css';
import { PasswordRecoveryFormData } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { PasswordResetState, resetPassword } from './actions';

const PasswordRecoveryFormSchema: ZodType<PasswordRecoveryFormData> = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
});

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button color="primary" type="submit" loading={pending} size="md" className={styles.submitButton}>Reset Password</Button>
    );
}

export const PasswordRecoveryErrorMessage = ({ state }: { state: PasswordResetState | null }) => {
    const { pending } = useFormStatus();

    if (pending || state?.status !== 'error') {
        return null;
    }

    return (
        <Text ta="center" className={styles.error}>Unable to reset your password. Please try again.</Text>
    );
}

const PasswordRecoveryForm = () => {
    const { control, handleSubmit } = useForm<PasswordRecoveryFormData>({
        resolver: zodResolver(PasswordRecoveryFormSchema),
        defaultValues: { email: '' },
    });

    const [state, formAction] = useFormState<PasswordResetState, PasswordRecoveryFormData>(resetPassword, null);
    const action: () => void = handleSubmit(async (data) => await formAction(data));

    if (state?.status === 'success') {
        return <Text>Password reset email sent. Please check your email for instructions.</Text>;
    }

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

            <SubmitButton />
            <PasswordRecoveryErrorMessage state={state} />
        </form>
    );
};

export default PasswordRecoveryForm;