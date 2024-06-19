import styles from './layout.module.css';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}

export default AuthLayout;
