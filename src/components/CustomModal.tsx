import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import type { TodoType } from '../Types/types';
import { useState } from 'react';
import React from 'react';

interface ModalProps {
  open: boolean;
  modalTitle: string;
  todo: TodoType;
  isForm?: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit?: (updatedTodo: TodoType) => void;
  onDelete?: (id: string) => void;
}

const CustomModal = ({ open, modalTitle, todo, isForm = false, setModal, onEdit, onDelete }: ModalProps) => {
  const [newData, setNewData] = useState<Omit<TodoType, "isCompleted" | "id">>({
    title: todo.title,
    description: todo.description
  });

  const handleEditSubmit = () => {
    onEdit?.({...todo, title: newData.title, description: newData.description});
    setModal(false);
  }

  const handleDeleteSubmit = (id: string) => {
    onDelete?.(id);
    setModal(false);
  }

  return isForm ? (
    <Dialog open={open} fullWidth>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Todo Title"
            type="text"
            fullWidth
            variant="standard"
            value={newData.title}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            required
            margin="dense"
            label="Todo Description"
            type="text"
            fullWidth
            variant="standard"
            value={newData.description}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModal(false)}>Cancel</Button>
        <Button type="submit" form="subscription-form" onClick={handleEditSubmit}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <Dialog open={open} fullWidth>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogActions>
        <Button onClick={() => setModal(false)}>Cancel</Button>
        <Button 
          type="submit" 
          form="subscription-form" 
          onClick={() => handleDeleteSubmit(todo.id)} 
          onKeyDown={(e) => e.key === "Enter" ? handleDeleteSubmit(todo.id) : null}
          >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomModal