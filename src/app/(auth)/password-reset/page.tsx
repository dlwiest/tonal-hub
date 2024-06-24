import Card from '@/components/core/Card/Card';
import styles from './page.module.css';
import PasswordRecoveryForm from '@/components/features/auth/password-recovery/PasswordRecoveryForm/PasswordRecoveryForm';
import { Title, Text } from '@mantine/core';
import PasswordResetForm from '@/components/features/auth/password-reset/PasswordResetForm/PasswordResetForm';

const PasswordResetPage = ({ searchParams: { code, error } }: { searchParams: { code: string, error: string } }) => {
    const isValidLink = code && !error;

    return (
        <Card className={styles.main}>
            <Card.Header>
                <Title order={1} size="h2">{ isValidLink ? 'Update your password' : 'Invalid reset link' }</Title>

                <Text className={styles.headerBlurb}>{ isValidLink ?
                    'Enter your new password below' :
                    'This password reset link is invalid or has expired. Please confirm your email address and try again.' }</Text>
            </Card.Header>

            {isValidLink ? <PasswordResetForm authCode={code} /> : <PasswordRecoveryForm />}
        </Card>
    )
}

export default PasswordResetPage;
