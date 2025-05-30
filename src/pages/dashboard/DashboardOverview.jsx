import React from 'react'
import {ChevronDown, MoreHorizontal } from 'lucide-react'
import Header from '../../components/Header'
import UniTable from '../../components/doctorDashboard/UniTable'

const dataOne = [
  {text:"Today's Appointments", count:"15"},
  {text:"Total Patients", count:"250"},
  {text:"Pending Reports", count:"7"},
  {text:"Revenue This Month", count:"200,000 LE"},
]

const todaySchedule = [
  {time:"11:00 AM =>", name:"Dr. Elena Vargs", fol:"Follow_Up"},
  {time:"12:00 AM =>", name:"Dr. Lukas Weber", fol:"Consultation"},
  {time:"11:00 AM =>", name:"Dr. Anna Schneider", fol:"Treatment"}
]

// Data for the Recent Patients table using UniTable format
const recentPatientsData = [
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "001",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Completed",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "002",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "In Progress",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "003",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Scheduled",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "004",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "In Progress",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "005",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Completed",
    time: "Jan 15, 2024"
  }
]

export default function DashboardOverview() {
  return (
    <div className=''>
      <Header />
      <h1 className="text-3xl text-center font-bold my-16">Dashboard Overview</h1>
      <div className="mx-8 flex gap-7">
        <div className="w-1/5 h-16"></div>
        <div className="w-4/5">
          <div className="w-full flex justify-between ">
            {dataOne.map((item) => {
              return(
                <div key={item.count} className="card w-64  bg-primary pl-11 py-6 text-text rounded-xl gap-3">
                <p className='text-base font-normal mb-2.5 '>{item.text}</p>
                <span className='font-bold text-2xl'>{item.count}</span>
              </div>
            )})}
          </div>
          <div className="my-8 flex gap-3">
            <div className="px-5 pt-6 w-1/2 border-small border-primary rounded-xl ">
              <div className="flex justify-between mb-5">
                <h3 className='font-semibold'>Today's Schedule</h3>
                <p className='text-primary cursor-pointer leading-none'>View All</p>
              </div>
              <div className="">
                  {todaySchedule.map((el) => {
                    return(
                      <div key={el.time} className="flex justify-between mb-5 items-center p-3.5 rounded-lg bg-placeholderText ">

                        <div className="flex gap-2.5 mx-8 items-center">
                          <p className='font-medium text-sm'>{el.time}</p>
                          <div className="">
                            <p className='text-sm font-medium lign leading-none mb-1.5'>{el.name}</p>
                            <p className='text-hoverText text-sm'>{el.fol}</p>
                          </div>
                        </div>
                        <ChevronDown />
                      </div>
                ) 
              })}
              </div>
            </div>
            <div className="px-5 py-6 w-1/2 border-small border-primary rounded-xl ">
              <h3 className='font-medium mb-5'>Weekly Patient Visits</h3>
              <img className='rounded-lg  max-h-full' src="/src/assets/Images/maaa.jpg" alt="" />
            </div>
          </div>
          <div className="">
            <div className="mb-8">
              <div className="flex justify-between rounded-lg px-8 py-6 border-small mb-7">
                <h3 className='font-medium'>Recent Patients</h3>
                <p className='text-base text-primary cursor-pointer'>View All</p>
              </div>
              <UniTable 
                data={recentPatientsData} 
                headers={['Patient Name', 'Date', 'Diagnosis', 'Status', 'Actions']}
                columnMappings={[
                  { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
                  { type: 'text', field: 'time' },
                  { type: 'text', field: 'diagnosis' },
                  { type: 'status', field: 'type' },
                  { type: 'actions', actionType: 'menu' }
                ]}
                title="Recent Patients"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
