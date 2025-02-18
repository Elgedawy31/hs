import React, { useState } from "react";
import BonusHeading from "../../components/bouns/BonusHeading";
import CardContainer from "../../components/CardContainer";
import BounsList from "../../components/bouns/BounsList";
import BonusForm from "../../components/bouns/BonusForm";

const Bouns = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("New Bonus Added:", data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4 min-h-screen">
      <CardContainer>
        <BonusHeading onAddClick={() => setIsFormOpen(true)} />
      </CardContainer>

      {isFormOpen && (
        <BonusForm 
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      <BounsList />
    </div>
  );
};

export default Bouns;
