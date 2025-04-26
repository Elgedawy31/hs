import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AlertTriangle, Download, Printer } from 'lucide-react';
import UniBtn from '../components/UniBtn';

function Prescription() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8" data-aos="fade-in">
      <div className="max-w-4xl mx-auto  ">
        {/* Header */}
        <div className="p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-primary">E-Prescription</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Secure online prescription management for our patients
          </p>
        </div>

        {/* Patient and Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="300">
          {/* Patient Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name :</span> Hagar Othman</p>
              <p><span className="font-medium">Patient ID :</span> PAT_2025_ 249</p>
              <p><span className="font-medium">Email :</span> HagarOsman@gmail.com</p>
              <p><span className="font-medium">Phone :</span> 01020304050</p>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Payment Date :</span> 7 April , 2025</p>
              <p><span className="font-medium">Payment Method :</span> Credit Card(****123)</p>
              <p><span className="font-medium">Transaction ID :</span> TXN-2024-5678</p>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-xl font-semibold mb-3">Diagnosis</h2>
          <p className="text-placeholderText">
            Atopic Dermatitis (L20.9) - Moderate to severe presentation with acute exacerbation
          </p>
        </div>

        {/* Symptoms */}
        <div className="p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="500">
          <h2 className="text-xl font-semibold mb-3">Symptoms</h2>
          <ol className="list-decimal list-inside space-y-2 pl-1">
            <li>Persistent itching and redness</li>
            <li>Inflammation in affected areas</li>
            <li>Dry and scaly patches</li>
          </ol>
        </div>

        {/* Prescription Details */}
        <div className="p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-borderColor">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text bg-altPrimary">Medications</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text bg-altPrimary">Dosage</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text bg-altPrimary">Frequency</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text bg-altPrimary">Durations</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-text bg-altPrimary">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                <tr>
                  <td className="px-4 py-3 text-sm">Tacrolimus Ointment 0.1%</td>
                  <td className="px-4 py-3 text-sm">Apply thin layer</td>
                  <td className="px-4 py-3 text-sm">Once daily</td>
                  <td className="px-4 py-3 text-sm">2 weeks</td>
                  <td className="px-4 py-3 text-sm">Take at bedtime</td>
                </tr>
                <tr className="bg-altPrimary ">
                  <td className="px-4 py-3 text-sm">Tacrolimus Ointment 0.1%</td>
                  <td className="px-4 py-3 text-sm">Liberal amount</td>
                  <td className="px-4 py-3 text-sm">Twice daily</td>
                  <td className="px-4 py-3 text-sm">30 days</td>
                  <td className="px-4 py-3 text-sm">Take at bedtime</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Tacrolimus Ointment 0.1%</td>
                  <td className="px-4 py-3 text-sm">Liberal amount</td>
                  <td className="px-4 py-3 text-sm">Twice daily</td>
                  <td className="px-4 py-3 text-sm">30 days</td>
                  <td className="px-4 py-3 text-sm">Take at bedtime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Instructions and Follow Up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-borderColor" data-aos="fade-up" data-aos-delay="700">
          {/* Additional Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Instructions</h2>
            <div className="mb-4">
              <h3 className="font-medium mb-2">LifeStyle Recommendations :</h3>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li className="ml-4">Use mild, fragrance-free soap</li>
                <li className="ml-4">Avoid known triggers and irritants</li>
                <li className="ml-4">Wear loose-fitting, cotton clothing</li>
              </ol>
            </div>
          </div>

          {/* Follow Up */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Up :</h2>
            <p className="mb-4">Schedule follow-up appointment in 3 weeks</p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-primary p-4 rounded-r">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-primary font-medium">Allergies & Contraindications !</h3>
                  <p className="text-gray-700 dark:text-gray-300">Patient reports allergy to penicillin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Signature and Validity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6" data-aos="fade-up" data-aos-delay="800">
          {/* Digital Signature */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Digital Signature</h2>
            <p className="text-primary text-xl font-medium">Dr. Alejandro Gómez</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Digitally signed on March 7, 2025</p>
            
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Prescription Validity</h2>
              <p>Valid for 30 days from date of issue</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <div className="inline-block border-2 border-primary p-2 rounded-md">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-6 h-6 bg-primary"></div>
                  <div className="w-6 h-6 bg-primary"></div>
                  <div className="w-6 h-6 bg-primary"></div>
                  <div className="w-6 h-6 bg-transparent"></div>
                </div>
              </div>
              <p className="text-sm mt-1">Scan For Digital Copy</p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <UniBtn
                text={
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </div>
                }
                className="text-white"
              />
              <UniBtn
                text={
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    <span>Print</span>
                  </div>
                }
                className="bg-transparent border border-primary text-primary hover:bg-primary hover:bg-opacity-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
