import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addcustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return(
        <div>
        <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e => handleInputChange(e)}
                    label="First name"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Last name"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Street address"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    type="email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={addCustomer}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}