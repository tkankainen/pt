import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [customer] = useState(props.customer);
    const [training, setTraining] = useState({customer: customer.links[0].href});

    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }

    const addTraining = () => {
        props.addTraining(training);
        handleClose();
    }

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.id]: event.target.value})
    }

    return(
        <div>
            <Button onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="datetime-local"
                            onChange={e => handleInputChange(e)}
                            variant="standard"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="activity"
                            value={training.activity}
                            onChange={e => handleInputChange(e)}
                            label="Activity"
                            type="text"
                            variant="standard"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="duration"
                            value={training.duration}
                            onChange={e => handleInputChange(e)}
                            label="Duration"
                            type="text"
                            variant="standard"
                            fullWidth
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;