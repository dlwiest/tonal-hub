import Link from 'next/link';

import styles from './AppHeader.module.css';
import AppHeaderUserButton from '../AppHeaderUserButton/AppHeaderUserButton';

const AppHeader = () => {
    return (
        <header className={styles.main}>
            <nav className={styles.nav}>
                <Link className={styles.logo} href="/">
                    TonalHub
                </Link>
                
                <AppHeaderUserButton />
            </nav>
        </header>
    )
}

export default AppHeader;