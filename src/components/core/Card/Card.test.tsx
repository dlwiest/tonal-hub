import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
    it('renders the card', () => {
        render(<Card>Sample Content</Card>);
        expect(screen.getByText('Sample Content')).toBeInTheDocument();
    });

    it('renders the card with a header', () => {
        render(
            <Card>
                <Card.Header>Header Content</Card.Header>
                Sample Content
            </Card>
        );

        expect(screen.getByText('Header Content')).toBeInTheDocument();
        expect(screen.getByText('Sample Content')).toBeInTheDocument();
    });

    it('renders the card with a footer', () => {
        render(
            <Card>
                Sample Content
                <Card.Footer>Footer Content</Card.Footer>
            </Card>
        );
        const footer = screen.getByText('Footer Content');

        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass('footer');
    });

    it('allows custom classes to be applied', () => {
        const { container } = render(
            <Card className="custom-class">
                <Card.Header className="custom-header">Header Content</Card.Header>
                Sample Content
                <Card.Footer className="custom-footer">Footer Content</Card.Footer>
            </Card>
        );

        expect(container.firstChild).toHaveClass('custom-class');
        expect(screen.getByText('Header Content')).toHaveClass('custom-header');
        expect(screen.getByText('Footer Content')).toHaveClass('custom-footer');
    });
});