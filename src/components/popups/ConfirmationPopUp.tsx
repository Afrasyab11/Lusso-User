import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface ConfirmationModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({loading, open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure to delete?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
          <br></br>This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
        style={{
          border: '1px #E73877 solid',
          color:'#E73877'
        }}
        onClick={onClose} color="primary">
          No, Cancel
        </Button>
        <LoadingButton
          size="small"
          onClick={onConfirm}
          loading={loading}
          variant="outlined"
          disabled={loading}
          style={{
              color:'#FFF',
              backgroundColor:'#E73877'
          }}
        >
          <span>Delete</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
