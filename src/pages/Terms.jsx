import React from 'react';
import SEO from '../components/SEO';
import { 
  FileText, 
  HandshakeIcon, 
  Stethoscope, 
  FileKey, 
  CreditCard, 
  CalendarX, 
  ShieldAlert, 
  RefreshCw 
} from 'lucide-react';

function Terms() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <FileText className="w-6 h-6 text-primary" />,
      content: 'Welcome to DermaClinic. These Terms and Conditions govern your use of our dermatology services and website. Please read these terms carefully before accessing for using our services.'
    },
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <HandshakeIcon className="w-6 h-6 text-primary" />,
      content: 'By accessing our services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.'
    },
    {
      id: 'medical-services',
      title: 'Medical Services & Appointments',
      icon: <Stethoscope className="w-6 h-6 text-primary" />,
      content: [
        '1- All medical services are provided by licensed healthcare professionals.',
        '2- Appointments must be scheduled in advance.',
        '3- Medical advice provided is specific to individual cases.',
        '4- Emergency services may require additional terms.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Patient Information',
      icon: <FileKey className="w-6 h-6 text-primary" />,
      content: 'We are committed to protecting your privacy and handling your personal information in accordance with applicable privacy laws and medical regulations. Please refer to our Privacy Policy for detailed information.'
    },
    {
      id: 'payment',
      title: 'Payment & Insurance',
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      content: 'Payment is required at the time of service unless other arrangements have been made. We accept most major insurance plans. Please contact your insurance provider to verify coverage.'
    },
    {
      id: 'cancellation',
      title: 'Cancelation Policy',
      icon: <CalendarX className="w-6 h-6 text-primary" />,
      content: 'We require 24 hours notice for appointment cancellations. Late cancellations or missed appointments may incur a fee as specified in our appointment policy.'
    },
    {
      id: 'liability',
      title: 'Liability',
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      content: 'While we strive to provide the highest quality care, we cannot guarantee specific results. Treatment outcomes may vary between individuals.'
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <RefreshCw className="w-6 h-6 text-primary" />,
      content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.'
    }
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" data-aos="fade-in">
      <SEO 
        title={`HS - Healthcare Solutions - Terms`}
        description={`Terms and conditions for using HS - Healthcare Solutions`}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className="text-center mb-10"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Terms & Conditions</h1>
          <p className="text-text">Last updated: March 1, 2025</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div 
            className="lg:w-1/4 bg-altPrimary border border-borderColor rounded-lg p-6 h-fit"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">Contents</h2>
            <nav className="space-y-3">
              {sections.map((section, index) => (
                <a 
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 text-text hover:text-hoverText transition-colors py-1"
                  data-aos="fade-right"
                  data-aos-delay={250 + (index * 50)}
                >
                  <span className="flex-shrink-0">{section.icon}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Main Content */}
          <div 
            className="lg:w-3/4 space-y-8"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {sections.map((section, index) => (
              <section 
                key={section.id} 
                id={section.id}
                className="bg-altPrimary border border-borderColor rounded-lg p-6"
                data-aos="fade-up"
                data-aos-delay={300 + (index * 100)}
              >
                <div 
                  className="flex items-center gap-3 mb-4"
                  data-aos="fade-right"
                  data-aos-delay={350 + (index * 100)}
                >
                  <span className="flex-shrink-0">{section.icon}</span>
                  <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                </div>
                
                {Array.isArray(section.content) ? (
                  <div className="text-text space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <p 
                        key={itemIndex}
                        data-aos="fade-up"
                        data-aos-delay={400 + (index * 100) + (itemIndex * 50)}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p 
                    className="text-text"
                    data-aos="fade-up"
                    data-aos-delay={400 + (index * 100)}
                  >
                    {section.content}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
