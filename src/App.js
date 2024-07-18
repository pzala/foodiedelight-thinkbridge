import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantEdit from "./components/RestaurantEdit";
import FluentContainer from "./components/FluentContainer";
import "./styles/global.css";

const useStyles = makeStyles({
  bgMain: {
    backgroundImage: "radial-gradient(circle at 64% 46%,#e9f0f5 0,#f2f0f4 57%,#f5f5f5 100%)",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RestaurantList />,
  },
  {
    path: "add",
    element: <RestaurantForm />,
  },
  {
    path: "edit/:id",
    element: <RestaurantEdit />,
  },
]);

function App() {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme} className={styles.bgMain}>
      <FluentContainer>
        <RouterProvider router={router} />
      </FluentContainer>
    </FluentProvider>
  );
}

export default App;
