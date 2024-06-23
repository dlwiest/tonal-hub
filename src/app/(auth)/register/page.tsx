import Link from 'next/link';
import Card from '@/components/core/Card/Card';
import styles from './page.module.css';
import RegistrationForm from '@/components/features/auth/register/RegistrationForm/RegistrationForm';
import { Title, Text } from '@mantine/core';

const RegisterPage = () => {
    return (
        <Card className={styles.main}>
            <Card.Header>
                <Title order={1} size="h1">Register</Title>
                <Text>Welcome to TonalHub</Text>
            </Card.Header>

            <RegistrationForm />

            <Card.Footer>
                <Text ta="right">Already a member? <Link href="/login">Log in</Link></Text>
            </Card.Footer>
        </Card>
    )
}

export default RegisterPage;
