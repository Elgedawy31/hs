import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBonuses, createBonus, resetBonusesState } from "@store/reducers/bonuses";
import { useAuth } from "@contexts/AuthContext";
import BonusHeading from "@components/bouns/BonusHeading";
import CardContainer from "@components/CardContainer";
import BounsList from "@components/bouns/BounsList";
import BonusForm from "@components/bouns/BonusForm";
import Loading from "@components/Loading";

const Bouns = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { loading, error, isCreated } = useSelector(state => state.bonuses);

  useEffect(() => {
    // Fetch all bonuses when component mounts
    dispatch(getAllBonuses({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    // Close form and reset state when bonus is created successfully
    if (isCreated) {
      setIsFormOpen(false);
      dispatch(resetBonusesState());
    }
  }, [isCreated, dispatch]);

  const handleSubmit = (data) => {
    dispatch(createBonus({ bonusData: data, token }));
  };

  return (
    <>
      {loading && <Loading />}
      
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
    </>
  );
};

export default Bouns;
