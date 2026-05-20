import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './appRoutes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
