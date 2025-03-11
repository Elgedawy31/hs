import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';

// Import images
import canDo1 from '../../assets/Images/can-do-1.svg';
import canDo2 from '../../assets/Images/can-do-2.svg';
import canDo3 from '../../assets/Images/can-do-3.svg';

function CanDo() {
  const { theme } = useTheme();

  const services = [
    {
      id: 1,
      image: canDo1,
      description: <>Advanced treatments for <br /> eczema and skin allergies</>
    },
    {
      id: 2,
      image: canDo2,
      description: <> Innovative solutions for <br /> vitiligo management and treatment</>
    },
    {
      id: 3,
      image: canDo3,
      description: <>Expert care for <br /> psoriasis and skin infections</>
    }
  ];

  return (
    <section className="py-16 px-4">
      <UniHeading title="What We Can Do For You" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col">
            <div className="overflow-hidden mb-4">
              <img  draggable="false"
                src={service.image}
                alt={service.description}
                className="w-full h-[350px] object-cover"
              />
            </div>
            <p
              className="text-xl"
              style={{
                color: theme.placeholderText,
                fontFamily: 'Montaga, serif'
              }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CanDo;
