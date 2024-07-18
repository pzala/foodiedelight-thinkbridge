import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  makeStyles,
  shorthands,
  tokens,
  Textarea,
  Field,
  Card,
  Spinner,
  CardHeader,
  Title3,
} from "@fluentui/react-components";
import {
  addRestaurant,
  updateRestaurant,
  fetchRestaurant,
} from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import ErrorCard from "./ErrorCard";

const useStyles = makeStyles({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    "@media (min-width: 768px)": {
      marginTop: "-10vh",
    },
  },
  card: {
    overflow: "auto",
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%",
  },
  form: {
    display: "grid",
    gap: "1rem",
    margin: "0 auto",
    width: "100%",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  actionWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    "@media (min-width: 768px)": {
      gridColumn: 2,
    },
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  errorCard: {
    maxWidth: "400px",
    margin: "40px auto",
    paddingTop: "2rem",
    width: "100%",
  },
  errorIcon: {
    width: "3rem !important",
    margin: "0 auto",
    color: tokens.colorPaletteRedForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
});

function RestaurantForm({ isEdit }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    cuisine: "",
    openingHours: "",
    contactNumber: "",
    email: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isEdit);
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      setIsLoading(true);
      fetchRestaurant(id)
        .then((data) => {
          if (data) {
            setRestaurant(data);
          } else {
            setNotFound(true);
          }
        })
        .catch((err) => {
          setErrors({ fetch: err.message });
          setNotFound(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e, data) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: data.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!restaurant.name) newErrors.name = "Name is required";
    if (!restaurant.description)
      newErrors.description = "Description is required";
    if (!restaurant.location) newErrors.location = "Location is required";
    if (!restaurant.cuisine) newErrors.cuisine = "Cuisine Type is required";
    if (!restaurant.openingHours)
      newErrors.openingHours = "Opening Hours are required";
    if (!restaurant.contactNumber) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^\+?\d+$/.test(restaurant.contactNumber)) {
      newErrors.contactNumber =
        "Contact Number should contain only numbers and optionally a plus sign at the beginning";
    }
    if (!restaurant.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(restaurant.email))
      newErrors.email = "Invalid email format";
    if (!restaurant.website) newErrors.website = "Website is required";
    else if (!/^https?:\/\//.test(restaurant.website))
      newErrors.website = "Invalid website URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    const submitFunction = isEdit ? updateRestaurant : addRestaurant;

    try {
      await submitFunction({ id, restaurant });
      setSaving(false);

      navigate("/");
    } catch (err) {
      setSaving(false);
      setErrors({
        submit: err.message || "An error occurred while submitting the form",
      });
    }
  };
  const buttonIcon = saving ? <Spinner size="tiny" /> : null;
  const buttonContent = !saving
    ? `${isEdit ? "Update" : "Add"}`
    : "Saving...";

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Spinner size="large" label="Loading restaurant data..." />
      </div>
    );
  }

  if (notFound) {
    return (
      <ErrorCard
        message="Restaurant not found"
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<Title3>{isEdit ? "Update" : "Add"} Restaurant</Title3>}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <Field label="Name" required validationMessage={errors.name || ""}>
          <Input name="name" value={restaurant.name} onChange={handleChange} />
        </Field>
        <Field
          label="Cuisine Type"
          required
          validationMessage={errors.cuisine || ""}
        >
          <Input
            name="cuisine"
            value={restaurant.cuisine}
            onChange={handleChange}
          />
        </Field>
        <Field
          label="Location"
          required
          className={styles.fullWidth}
          validationMessage={errors.location || ""}
        >
          <Input
            name="location"
            value={restaurant.location}
            onChange={handleChange}
          />
        </Field>
        <Field
          label="Opening Hours"
          required
          validationMessage={errors.openingHours || ""}
        >
          <Input
            name="openingHours"
            value={restaurant.openingHours}
            onChange={handleChange}
          />
        </Field>
        <Field
          label="Contact Number"
          required
          validationMessage={errors.contactNumber || ""}
        >
          <Input
            name="contactNumber"
            value={restaurant.contactNumber}
            onChange={handleChange}
          />
        </Field>
        <Field label="Email" required validationMessage={errors.email || ""}>
          <Input
            name="email"
            type="email"
            value={restaurant.email}
            onChange={handleChange}
          />
        </Field>
        <Field
          label="Website"
          required
          validationMessage={errors.website || ""}
        >
          <Input
            name="website"
            type="url"
            value={restaurant.website}
            onChange={handleChange}
          />
        </Field>
        <Field
          label="Description"
          required
          className={styles.fullWidth}
          validationMessage={errors.description || ""}
        >
          <Textarea
            name="description"
            value={restaurant.description}
            onChange={handleChange}
            style={{ height: "100px" }}
          />
        </Field>
        <div className={styles.actionWrapper}>
          <Button
            type="button"
            appearance="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            appearance="primary"
            onClick={handleSubmit}
            icon={buttonIcon}
          >
            {buttonContent}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default RestaurantForm;
