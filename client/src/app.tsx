import { createRoot } from 'react-dom/client';
import { Index } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Render your React component instead
const root = createRoot(document.querySelector('body')!);
root.render(<Index />);