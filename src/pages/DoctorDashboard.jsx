import React from 'react'
import DoctorHero from '../components/doctorDashboard/DoctorHero'
import CustomChart from '../components/doctorDashboard/CustomChart'
import PeopleSay from '../components/home/PeopleSay';
import UniTable from '../components/doctorDashboard/UniTable';

function DoctorDashboard() {
  // Sample appointment data for chart
  const appointmentData = [
    { month: 'Jan', value: 15 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 20 },
    { month: 'May', value: 30 },
    { month: 'Jun', value: 35 },
    { month: 'Jul', value: 25 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 20 },
    { month: 'Oct', value: 35 },
    { month: 'Nov', value: 40 },
    { month: 'Dec', value: 50 }
  ];

  // Sample data for appointments table
  const tableData = [
    {
      patientName: 'Amira Hassan',
      patientImage: '/src/assets/Images/Amira.jpg',
      id: '001',
      age: '32',
      gender: 'Female',
      diagnosis: 'Alphaviruses',
      type: 'General',
      time: '09:00 AM'
    },
    {
      patientName: 'Ahmed Kamal',
      patientImage: '/src/assets/Images/Ahmed.jpg',
      id: '002',
      age: '45',
      gender: 'Male',
      diagnosis: 'Hypertension',
      type: 'Follow-up',
      time: '09:30 AM'
    },
    {
      patientName: 'Kareem Mahmoud',
      patientImage: '/src/assets/Images/kareem.jpg',
      id: '003',
      age: '28',
      gender: 'Male',
      diagnosis: 'Diabetes Type 2',
      type: 'General',
      time: '10:00 AM'
    },
    {
      patientName: 'Sofia Ahmed',
      patientImage: '/src/assets/Images/sofia.jpg',
      id: '004',
      age: '36',
      gender: 'Female',
      diagnosis: 'Migraine',
      type: 'Emergency',
      time: '10:30 AM'
    },
    {
      patientName: 'Omar Khaled',
      patientImage: '/src/assets/Images/Omar.jpg',
      id: '005',
      age: '52',
      gender: 'Male',
      diagnosis: 'Arthritis',
      type: 'Follow-up',
      time: '11:00 AM'
    },
    {
      patientName: 'Karan Singh',
      patientImage: '/src/assets/Images/karan.jpg',
      id: '006',
      age: '41',
      gender: 'Male',
      diagnosis: 'Asthma',
      type: 'General',
      time: '11:30 AM'
    },
    {
      patientName: 'Mariam Ali',
      patientImage: '/src/assets/Images/mar.jpg',
      id: '007',
      age: '29',
      gender: 'Female',
      diagnosis: 'Anxiety',
      type: 'Follow-up',
      time: '12:00 PM'
    },
    {
      patientName: 'Amira Hassan',
      patientImage: '/src/assets/Images/Amira.jpg',
      id: '008',
      age: '32',
      gender: 'Female',
      diagnosis: 'Alphaviruses',
      type: 'General',
      time: '01:00 PM'
    },
    {
      patientName: 'Ahmed Kamal',
      patientImage: '/src/assets/Images/Ahmed.jpg',
      id: '009',
      age: '45',
      gender: 'Male',
      diagnosis: 'Hypertension',
      type: 'Follow-up',
      time: '01:30 PM'
    },
    {
      patientName: 'Sofia Ahmed',
      patientImage: '/src/assets/Images/sofia.jpg',
      id: '010',
      age: '36',
      gender: 'Female',
      diagnosis: 'Migraine',
      type: 'Emergency',
      time: '02:00 PM'
    }
  ];

  return (
    <div className='space-y-8 container mx-auto mt-10'>
      <DoctorHero />
      <CustomChart data={appointmentData} />

       <div data-aos="zoom-in" data-aos-delay="400">
        <PeopleSay />
      </div>

      <UniTable data={tableData} headers={['pateint name' , 'id' , 'age/gender' , 'diagnosis' , 'type' , 'actions'  , 'time']} />
    </div>
  )
}

export default DoctorDashboard
