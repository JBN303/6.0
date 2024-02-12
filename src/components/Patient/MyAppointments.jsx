// MyAppointments.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5007/api/patients/${patientId}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>
      {appointments.map((appointment) => (
        <Card key={appointment._id} style={{ marginBottom: '15px' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Doctor Name: {appointment.doctorName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Age: {appointment.age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact No: {appointment.contactNo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {appointment.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Purpose: {appointment.purpose}
            </Typography>
            {/* Add more appointment details as needed */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyAppointments;
