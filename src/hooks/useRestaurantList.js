import { useEffect, useState } from "react";
import { useArrowNavigationGroup, useFocusableGroup, makeStyles } from "@fluentui/react-components";
import { fetchRestaurants, deleteRestaurant } from "../services/api";
import useGlobalStyles from "../styles/global-styles";
import { useNavigate } from "react-router-dom";
const columns = [
  { columnKey: "name", label: "Name" },
  { columnKey: "description", label: "Description" },
  { columnKey: "location", label: "Location" },
  { columnKey: "cuisine", label: "Cuisine Type" },
  { columnKey: "openingHours", label: "Opening Hours" },
  { columnKey: "contactNumber", label: "Contact Number" },
  { columnKey: "email", label: "Email" },
  { columnKey: "website", label: "Website" },
  { columnKey: "actions", label: "Actions" },
];

const useStyles = makeStyles({
  button: {
    marginBottom: "1rem",
    alignSelf: "flex-end",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    "@media (min-width: 768px)": {
      marginTop: "-10vh",
    },
  },
});
function useRestaurantList() {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [deleteRestaurantData, setDeleteRestaurantData] = useState({
    open: false,
    restaurant: null,
  });
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  useEffect(() => {
    setIsLoading(true);
    fetchRestaurants()
      .then((data) => {
        if (data) {
          setRestaurants(data);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        setNotFound(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  function handleDelete(id) {
    deleteRestaurant(id)
      .then(() => setRestaurants(restaurants.filter((r) => r.id !== id)))
      .catch((error) => console.error(error))
      .finally(() => setDeleteRestaurantData({
        open: false,
        restaurant: null,
      }));
  }
  return {
    styles,
    globalStyles,
    columns,
    keyboardNavAttr,
    focusableGroupAttr,
    isLoading,
    notFound,
    restaurants,
    deleteRestaurantData,
    setDeleteRestaurantData,
    handleDelete,
    navigate,
  };
}

export default useRestaurantList;
