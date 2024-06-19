import { Button, PasswordInput, TextInput } from '@mantine/core';
import { UserIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
    return (
        <form className={styles.main} autoComplete="off">
            <TextInput label="Username" placeholder="Username" size="md" rightSection={<UserIcon />} />
            <TextInput label="Email" type="email" placeholder="Your email" size="md" rightSection={<EnvelopeIcon />} />
            <PasswordInput label="Password" placeholder="Your password" size="md" rightSection={<KeyIcon />} />
            
            <Button className={styles.submitButton} color="primary" size="md">Register</Button>
        </form>
    );
};

export default RegistrationForm;