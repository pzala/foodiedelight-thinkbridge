import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  tokens,
} from "@fluentui/react-components";

const DeleteRestaurantDialog = ({ open = false, setOpen, restaurant = null, onDelete }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        setOpen(data.open);
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete?</DialogTitle>
          <DialogContent>
            Are you sure you want to delete <b>{restaurant?.name}</b>?
          </DialogContent>
          <DialogActions fluid>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary" color={tokens.colorPaletteRedBackground3} onClick={() => onDelete(restaurant?.id)}>
              Delete
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DeleteRestaurantDialog;
