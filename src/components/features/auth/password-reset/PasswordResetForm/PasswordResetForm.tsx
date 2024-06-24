'use client'

import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Button, Text } from '@mantine/core';
import { PasswordInput } from 'react-hook-form-mantine';
import { KeyIcon } from '@heroicons/react/24/outline';
import styles from './PasswordResetForm.module.css';
import { PasswordUpdateFormData } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { PasswordUpdateState, updatePassword } from './actions';

const PasswordUpdateFormSchema: ZodType<PasswordUpdateFormData> = z.object({
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
    authCode: z.string(),
});

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button color="primary" type="submit" loading={pending} size="md" className={styles.submitButton}>Update Password</Button>
    );
}

export const PasswordResetErrorMessage = ({ state }: { state: PasswordUpdateState | null }) => {
    const { pending } = useFormStatus();

    if (pending || state?.status !== 'error') {
        return null;
    }

    const errorMessage = state.errorCode === 'invalid_code' ?
        'Your password recovery link has expired. Please try to reset your password again.' :
        'Unable to reset your password. Please try again.';

    return (
        <Text ta="center" className={styles.error}>{errorMessage}</Text>
    );
}

const PasswordResetForm = ({ authCode }: { authCode: string }) => {
    const { control, handleSubmit, register } = useForm<PasswordUpdateFormData>({
        resolver: zodResolver(PasswordUpdateFormSchema),
        defaultValues: { password: '' },
    });

    const [state, formAction] = useFormState<PasswordUpdateState, PasswordUpdateFormData>(updatePassword, null);
    const action: () => void = handleSubmit(async (data) => await formAction(data));

    return (
        <form className={styles.main} autoComplete="off" action={action} noValidate role="form">
            <input type="hidden" value={authCode} {...register('authCode')} />
            
            <PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                rightSection={<KeyIcon />}
                control={control}
                size="md"
            />

            <SubmitButton />
            <PasswordResetErrorMessage state={state} />
        </form>
    );
};

export default PasswordResetForm;