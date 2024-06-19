import Link from 'next/link';
import Card from '@/components/core/Card/Card';
import styles from './page.module.css';
import RegistrationForm from '@/components/features/auth/register/RegistrationForm/RegistrationForm';

const RegisterPage = () => {
    return (
        <Card className={styles.main}>
            <Card.Header>
                <h1>Register</h1>
                <span>Welcome to TonalHub</span>
            </Card.Header>

            <RegistrationForm />

            <Card.Footer className={styles.footer}>
                <span>Already have an account? <Link href="/login">Log in</Link></span>
            </Card.Footer>
        </Card>
    )
}

export default RegisterPage;
