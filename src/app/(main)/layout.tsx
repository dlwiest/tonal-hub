import AppHeader from '@/components/layout/AppHeader/AppHeader';

const AppMainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppHeader />
            <main>
                {children}
            </main>
        </>
    )
}

export default AppMainLayout;