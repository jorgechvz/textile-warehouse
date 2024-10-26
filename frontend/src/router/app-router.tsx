import { Route, Routes } from "react-router-dom";
import { AppRoutes, AuhtRoutes } from "./app-routes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path={Paths.portal.PORTAL} element={<Home />} />
      <Route path={Paths.portal.DIRECTORIO} element={<DirectoryPage />} />
      <Route path={Paths.portal.EMPRESA + ":id"} element={<CompanyPage />} />
      <Route
        path={Paths.portal.DATA_TECNICA}
        element={<DataTecnicaInicio isEdit={false} />}
      />
      <Route
        path={Paths.portal.ACERCA}
        element={<DataTecnicaInicio isEdit={false} />}
      /> */}
      {AuhtRoutes.map((route, index) => (
        <Route
          key={`auth-route-${index}`}
          path={route.path}
          element={route.element}
        />
      ))}
      {AppRoutes.map((route, index) => (
        <Route
          key={`app-route-${index}`}
          path={route.path}
          element={route.element}
        >
         {/*  {route.children &&
            route.children.map((child, childIndex) => (
              <Route
                key={`app-child-${childIndex}`}
                path={child.path}
                element={<ProtectedRoute>{child.element}</ProtectedRoute>}
              />
            ))} */}
        </Route>
      ))}
    </Routes>
  );
};
