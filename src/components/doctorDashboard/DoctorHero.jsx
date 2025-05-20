import React, { useEffect } from 'react';
import { Heart, User, DollarSign, Star } from 'lucide-react';
import UniBtn from '../UniBtn';
import doctorImage from '../../assets/Images/doctor-dashboard.png';
import AOS from 'aos';

function DoctorHero() {
  useEffect(() => {
    // Refresh AOS when component mounts
    AOS.refresh();
  }, []);

  return (
    <div className=" px-4 py-6">
      <div 
        className="border border-borderColor card-shadow rounded-3xl shadow-lg overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Doctor Image Section */}
          <div 
            className="w-full lg:w-1/3 p-6"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img 
              src={doctorImage} 
              alt="Doctor" 
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* Doctor Info Section */}
          <div className="w-full lg:w-2/3 p-6">
            {/* Stats Cards */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* Total Patients Card */}
              <div className="bg-background rounded-3xl border border-borderColor p-6 flex flex-col items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-4">
                  <Heart className="text-primary" size={24} />
                </div>
                <h3 className="text-4xl font-bold text-primary">680</h3>
                <p className="text-text font-medium mb-2">Total Patients</p>
                <p className="text-secondPrimaryColor text-sm">20% Higher than last week.</p>
              </div>

              {/* Dermatologists Card */}
              <div className="bg-background rounded-3xl border border-borderColor p-6 flex flex-col items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-4">
                  <User className="text-primary" size={24} />
                </div>
                <h3 className="text-4xl font-bold text-primary">50</h3>
                <p className="text-text font-medium mb-2">Dermatologists</p>
                <p className="text-secondPrimaryColor text-sm">50% Higher than last week.</p>
              </div>

              {/* Earnings Card */}
              <div className="bg-background rounded-3xl border border-borderColor p-6 flex flex-col items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-4">
                  <DollarSign className="text-primary" size={24} />
                </div>
                <h3 className="text-4xl font-bold text-primary">20,000</h3>
                <p className="text-text font-medium mb-2">Earnings</p>
                <p className="text-secondPrimaryColor text-sm">60% Higher than last week.</p>
              </div>
            </div>

            {/* Doctor Details */}
            <div 
              className="mb-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="text-3xl font-bold mb-1 text-text">Good Morning,</h2>
              <h1 className="text-4xl font-bold mb-4 text-primary">Dr. Christy Shea</h1>
              
              <div className="space-y-2 text-text">
                <p className="text-lg">MBBS, MS - Dermatology</p>
                <p className="text-lg">Speaks: English, French, and Spanish</p>
                <p className="text-lg">Location: 9 E 2nd St, New York, NY 30003, USA</p>
              </div>
            </div>

            {/* Rating and Button */}
            <div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="flex items-center mb-4 md:mb-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-altPrimary fill-altPrimary" size={24} />
                ))}
                <span className="ml-2 text-2xl font-bold text-text">3690</span>
                <span className="ml-2 text-placeholderText">Reviews</span>
              </div>
              
              <UniBtn 
                text="Add Doctor" 
                className="text-background font-medium"
                onClick={() => console.log('Add Doctor clicked')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorHero;
