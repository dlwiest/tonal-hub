'use client'

import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/solid';
import styles from './AppHeaderUserButton.module.css';

export default function AppHeaderUserButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    };

    return (
        <div className={styles.main}>
            <button className={`${styles.button} drop-shadow-sm`} onClick={handleClick}>
                <UserIcon className={styles.icon} />
            </button>
        </div>
    );
};
