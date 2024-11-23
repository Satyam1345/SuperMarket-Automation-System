'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Home() {
  const [commodities, setCommodities] = useState([]);
  const [newCommodity, setNewCommodity] = useState({ name: '', price: 0, quantity: 0 });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    axios
      .get('/api/commodities')
      .then((response) => setCommodities(response.data))
      .catch((error) => console.error('Failed to fetch commodities:', error));
  }, []);
  

  const handleAddCommodity = () => {
    // Add new commodity
    axios
  .post('/api/commodities', newCommodity)
  .then(() => {
    // Reset form and refresh the list
    setNewCommodity({ name: '', price: 0, quantity: 0 });
    axios.get('/api/commodities').then((response) => setCommodities(response.data));
  })
  .catch((error) => console.error('Failed to add commodity:', error));

  };

  return (
    <Container maxWidth="lg" className ='bg-gray-200 h-screen text-black'>
      <Typography variant="h3" align="center" sx={{ my: 4 }}>
        Supermarket Management System      </Typography>

      <Grid container spacing={3}>
        {/* Commodity List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Items List
            </Typography>
            <Grid container spacing={2}>
              {commodities.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton size="small" color="primary">
                        <AddCircleIcon /> Add Stock
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Add New Commodity Form */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Add New Commodity
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                '& .MuiTextField-root': { width: '100%' }
              }}
            >
              <TextField
                label="Commodity Name"
                variant="outlined"
                value={newCommodity.name}
                onChange={(e) =>
                  setNewCommodity({ ...newCommodity, name: e.target.value })
                }
              />
              <TextField
                type="number"
                label="Price"
                variant="outlined"
                value={newCommodity.price}
                onChange={(e) =>
                  setNewCommodity({ ...newCommodity, price: +e.target.value })
                }
              />
              <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                value={newCommodity.quantity}
                onChange={(e) =>
                  setNewCommodity({ ...newCommodity, quantity: +e.target.value })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCommodity}
                sx={{ mt: 2 }}
              >
                Add Commodity
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
