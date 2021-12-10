import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import AddTraining from './Addtraining';

export default function Customers() {

    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(error => console.error(error))
    }

    const columns = [
        { headerName: "First name", field: "firstname", sortable: true, filter: true, width: 160, resizable: true },
        { headerName: "Last name", field: "lastname", sortable: true, filter: true, width: 160, resizable: true },
        { headerName: "Street address", field: "streetaddress", sortable: true, filter: true, width: 160, resizable: true },
        { headerName: "Postcode", field: "postcode", sortable: true, filter: true, width: 100, resizable: true },
        { headerName: "City", field: "city", sortable: true, filter: true, width: 120, resizable: true },
        { headerName: "Email", field: "email", sortable: true, filter: true, width: 200, resizable: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true, width: 160, resizable: true },
        { headerName: '', width: 170,
            cellRendererFramework: params => 
            <AddTraining addTraining={saveTraining} customer={params.data} />
        },
        { headerName: '', field: "links", sortable: false, filter: false, width: 90,
            cellRendererFramework: params => {
                const url = params.value[0].href;
                return (
                    <Button onClick={() => deleteCustomer(url)}>Delete</Button>
                )}
        },
        { headerName: '', width:90,
            cellRendererFramework: function(params) {
                return (
                    <Editcustomer updateCustomer={updateCustomer} customer={params.data} />
                )
            }
        }
    ]

    const gridRef = useRef();

    const deleteCustomer = (url) => {
        console.log("Delete", url)
        if (window.confirm('Are you sure you want to delete customer?')) {
            fetch(url, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(error => console.error(error))
            setOpen(true);
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const action = (
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
            CLOSE
        </Button>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );

    return (
        <div className="ag-theme-material" style={{height: 700, margin: 'auto'}}>
            <Addcustomer saveCustomer={saveCustomer}/>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current= params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={customers}>
            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Customer deleted"
                action={action}
            />
        </div>
    );
}