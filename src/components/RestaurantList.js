import React, { lazy, Suspense } from "react";
import { EditRegular, DeleteRegular } from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Title3,
  Button,
  Card,
  CardHeader,
  Spinner,
} from "@fluentui/react-components";
import DeleteRestaurantDialog from "./DeleteRestaurantDialog";
import useRestaurantList from "../hooks/useRestaurantList";
const ErrorCard = lazy(() => import("./ErrorCard"));

function RestaurantList() {
  const {
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
  } = useRestaurantList();
  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Spinner size="large" label="Loading restaurants..." />
      </div>
    );
  }
  if (notFound) {
    return <Suspense>
     <ErrorCard message="Something went wrong, please try again later!" />;
     </Suspense>
  }
  return (
    <>
      <Button type="button" appearance="primary" className={styles.button} onClick={() => navigate("/add")}>
        Add Restaurant
      </Button>
      <Card className={globalStyles.overflowAuto}>
        <CardHeader header={<Title3>Restaurant List</Title3>} />
        <Table {...keyboardNavAttr} role="grid" aria-label="Table with grid keyboard navigation" style={{ minWidth: "620px" }}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((item) => (
              <TableRow key={item.name.label}>
                {Object.keys(item)?.map((columnKey) =>
                  columnKey !== "id" ? (
                    <TableCell key={columnKey + "cell"} tabIndex={0} role="gridcell" className={globalStyles.textWrap}>
                      {item[columnKey]}
                    </TableCell>
                  ) : null
                )}
                <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                  <TableCellLayout>
                    <Button icon={<EditRegular />} aria-label="Edit" className={globalStyles.mr3} onClick={() => navigate(`/edit/${item.id}`)} />
                    <Button icon={<DeleteRegular />} aria-label="Delete" onClick={() => setDeleteRestaurantData({ open: true, restaurant: item })} />
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <DeleteRestaurantDialog
        open={deleteRestaurantData.open}
        setOpen={(open) => setDeleteRestaurantData({ ...deleteRestaurantData, open })}
        restaurant={deleteRestaurantData.restaurant}
        onDelete={handleDelete}
      />
    </>
  );
}
export default RestaurantList;
