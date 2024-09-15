import { describe, it, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    // Create a DOM element to render into
    const rootElement = document.createElement('div');
    document.body.appendChild(rootElement);

    // Use createRoot to render
    const root = createRoot(rootElement);
    root.render(<App />);

    // Make assertions
    expect(rootElement.innerHTML).toContain('Sign Up'); // Adjust this to match the actual text inside your Signup component

    // Clean up after rendering
    root.unmount();
  });
});