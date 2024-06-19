import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Component', () => {
  it('renders and displays the main content', () => {
    render(<Home />);
    // Check for specific text content that you expect to be in the document
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    // You can also check for the presence of a link or any other element
    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
  });
});