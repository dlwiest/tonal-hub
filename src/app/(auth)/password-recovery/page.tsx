import Card from '@/components/core/Card/Card';
import styles from './page.module.css';
import PasswordRecoveryForm from '@/components/features/auth/password-recovery/PasswordRecoveryForm/PasswordRecoveryForm';
import { Title, Text } from '@mantine/core';

const PasswordRecoveryPage = () => {
    return (
        <Card className={styles.main}>
            <Card.Header>
                <Title order={1} size="h2">Forgot your password?</Title>
                <Text className={styles.headerBlurb}>Enter your email below to reset your password</Text>
            </Card.Header>

            <PasswordRecoveryForm />
        </Card>
    )
}

export default PasswordRecoveryPage;
