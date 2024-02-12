import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TextField, Button, Typography, Box, Modal } from '@mui/material';

const Nearby = () => {
  const [pincode, setPincode] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: '',
    age: '',
    contactNo: '',
    email: '',
    purpose: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = doctors.filter((doctor) => doctor.conslt === pincode);
    setFilteredDoctors(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookAppointment = async (doctorId) => {
    try {
      // Customize the appointment details based on your requirements
      const appointmentDetailsToSend = {
        patientName: appointmentDetails.patientName,
        age: appointmentDetails.age,
        contactNo: appointmentDetails.contactNo,
        email: appointmentDetails.email,
        purpose: appointmentDetails.purpose,
      };

      // Send appointment details to the server
      const response = await axios.post(`http://localhost:5007/api/appointments/${doctorId}`, appointmentDetailsToSend);

      console.log('Appointment booked successfully:', response.data);
      setAppointmentDetails({
        patientName: '',
        age: '',
        contactNo: '',
        email: '',
        purpose: '',
      });
      
      alert("Appointment successfull");
      
      handleCloseModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <TextField
          label="Search by Pincode"
          variant="outlined"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Nearby Doctors</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        {filteredDoctors.map((doctor) => (
          <Box key={doctor._id} sx={{ margin: '10px', textAlign: 'center' }}>
            <Typography variant="h6">{doctor.name}</Typography>
            <Typography variant="body1">Specialty: {doctor.spec}</Typography>
            <Typography variant="body2">Language: {doctor.lang}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenModal(doctor)} style={{ marginTop: '10px' }}>
              Book Appointment
            </Button>
          </Box>
        ))}
      </Box>
      {selectedDoctor && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedDoctor.name}
            </Typography>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="patientName"
              value={appointmentDetails.patientName}
              onChange={handleInputChange}
            />
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              margin="normal"
              name="age"
              value={appointmentDetails.age}
              onChange={handleInputChange}
            />
            <TextField
              label="Contact No."
              variant="outlined"
              fullWidth
              margin="normal"
              name="contactNo"
              value={appointmentDetails.contactNo}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={appointmentDetails.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Purpose of Appointment"
              variant="outlined"
              fullWidth
              margin="normal"
              name="purpose"
              value={appointmentDetails.purpose}
              onChange={handleInputChange}
            />
            <Button onClick={() => handleBookAppointment(selectedDoctor._id)} style={{ color: '#77d5cb' }}>
              BOOK NOW
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Nearby;