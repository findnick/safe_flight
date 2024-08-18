import { Dialog, DialogTitle } from "@mui/material";

const DialogBox = ({ open = false, onClose, title, children }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      className="rounded-full"
      style={{ height: "auto" }}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogBox;
