import Link from 'next/link';
import Card from '@/components/core/Card/Card';
import styles from './page.module.css';
import LoginForm from '@/components/features/auth/login/LoginForm/LoginForm';
import { Title, Text } from '@mantine/core';

const LoginPage = () => {
    return (
        <Card className={styles.main}>
            <Card.Header>
                <Title order={1} size="h1">Welcome back</Title>
                <Text>Sign in to start sharing</Text>
            </Card.Header>

            <LoginForm />

            <Card.Footer>
                <Text ta="right">Not a member? <Link href="/register">Sign up</Link></Text>
            </Card.Footer>
        </Card>
    )
}

export default LoginPage;
