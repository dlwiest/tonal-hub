import { Button, Title } from '@mantine/core';
import Card from '@/components/core/Card/Card';
import styles from './page.module.css';

const Home = () => {
    return (
        <div className={styles.main}>
            <div>
                <Card className={styles.mr1}>
                    <span>card</span>
                    <Button color="blue">Click me</Button>
                </Card>
            </div>

            <Card className={`${styles.mr1}`}>
                <span>card with footer</span>

                <Card.Footer>
                    <span>footer</span>
                </Card.Footer>
            </Card>

            <Card className={`${styles.mr1} ${styles.grow}`}>
                <Card.Header>
                    <Title order={1} size="h1">Find your next Tonal workout here</Title>
                </Card.Header>
            </Card>

            <Card>
                <Card.Header>
                    <span>header</span>
                </Card.Header>

                <span>card with header and footer</span>

                <Card.Footer>
                    <span>footer</span>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Home;