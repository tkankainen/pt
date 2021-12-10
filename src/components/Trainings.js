import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = useState(false);

    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => console.error(error))
    }

    const deleteTraining = (url) => {
        console.log(url);
        if (window.confirm('Are you sure you want to delete training?')) {
            fetch(url, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(error => console.error(error))
            setOpen(true);
        } 
    }
    
    const columns = [
        { headerName: "Date", field: "date", sortable: true, filter: true,
            cellRendererFramework: function(params) {
                return (
                    moment(params.data.date).format('LLL')
            )}
        },
        { headerName: "Duration", field: "duration", sortable: true, filter: true },
        { headerName: "Activity", field: "activity", sortable: true, filter: true },
        { headerName: "Customer", field: "customer", sortable: true, filter: true,
            cellRendererFramework: function(params) {
                return (
                    params.data.customer.firstname + " " + params.data.customer.lastname
            )}
        },
        { headerName: "", sortable: false, filter: false, width: 100,
            cellRendererFramework: params => {
                const url = 'https://customerrest.herokuapp.com/api/trainings/'+params.data.id;
                return (
                    <Button onClick={() => deleteTraining(url)}>Delete</Button>
                )}
        },
    ]

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const action = (
        <React.Fragment>
        <Button color="primary" size="small" onClick={handleClose}>
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
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current= params.api }
                rowSelection="single"
                columnDefs={columns}
                rowData={trainings}>
            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Training deleted"
                action={action}
            />
        </div>
    );
}