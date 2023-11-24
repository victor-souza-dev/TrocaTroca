import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes/Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={browserRouter} />
);
