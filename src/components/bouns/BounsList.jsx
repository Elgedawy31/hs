import React, { useState }  from 'react'
import { PlusCircle, Pencil, Trash } from "lucide-react";
import CardContainer from '../CardContainer';
import UniHeading from '../UniHeading';


function BounsList() {

   const handleDelete = (id) => {
    setBonuses(bonuses.filter((bonus) => bonus.id !== id));
  };
    const [bonuses, setBonuses] = useState([
      {
        id: 1,
        title: "Over time",
        description: "Per hour worked beyond regular hours to 24 hour over time",
        type: "Over Time",
        percentage: "120%",
      },
      {
        id: 2,
        title: "Over time",
        description: "Per hour worked beyond regular hours to 24 hour over time",
        type: "Over Time",
        percentage: "120%",
      },
      {
        id: 3,
        title: "Over time",
        description: "Per hour worked beyond regular hours to 24 hour over time",
        type: "Over Time",
        percentage: "120%",
      },
    ]);
  return (
    <div>

      <div className="space-y-4">
        <UniHeading
          icon={PlusCircle}
          text="Bonus Configuration"
          
        />
        {bonuses.map((bonus) => (
          <CardContainer key={bonus.id} className=" p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium">{bonus.title}</h4>
              <p className="text-gray-500 text-sm">{bonus.description}</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                  {bonus.type}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                  {bonus.percentage}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="text-gray-600 hover:text-gray-800">
                <Pencil size={18} />
              </button>
              <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(bonus.id)}>
                <Trash size={18} />
              </button>
            </div>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}

export default BounsList