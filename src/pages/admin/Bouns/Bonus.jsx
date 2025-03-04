import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBonuses, createBonus, updateBonus, resetBonusesState } from "@store/reducers/bonuses";
import { useAuth } from "@contexts/AuthContext";
import BonusHeading from "@components/bouns/BonusHeading";
import CardContainer from "@components/CardContainer";
import BounsList from "@components/bouns/BounsList";
import BonusForm from "@components/bouns/BonusForm";
import Loading from "@components/Loading";

const Bouns = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBonus, setEditingBonus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { loading, isCreated, isUpdated, pagination } = useSelector(state => state.bonuses);

  useEffect(() => {
    // Fetch all bonuses when component mounts or page changes
    dispatch(getAllBonuses({ token, page: currentPage, limit }));
  }, [dispatch, token, currentPage, limit]);

  useEffect(() => {
    // Close form and reset state when bonus is created or updated successfully
    if (isCreated || isUpdated) {
      setIsFormOpen(false);
      setEditingBonus(null);
      dispatch(resetBonusesState());
    }
  }, [isCreated, isUpdated, dispatch]);

  const handleSubmit = (data) => {
    if (editingBonus) {
      dispatch(updateBonus({ bonusId: editingBonus._id, bonusData: data, token }));
    } else {
      dispatch(createBonus({ bonusData: data, token }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (bonus) => {
    setEditingBonus(bonus);
    setIsFormOpen(true);
  };

  return (
    <>
      
      <div className="space-y-4 min-h-screen">
        <CardContainer>
          <BonusHeading onAddClick={loading ? () => {} : () => setIsFormOpen(true)} />
        </CardContainer>

      {loading && <Loading />}
       {!loading && <>
        {isFormOpen && (
          <BonusForm 
            onClose={() => {
              setIsFormOpen(false);
              setEditingBonus(null);
            }}
            onSubmit={handleSubmit}
            editMode={!!editingBonus}
            initialData={editingBonus}
          />
        )}

        <BounsList 
          onEdit={handleEdit} 
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          onPageChange={handlePageChange}
        /></>}
      </div>
    </>
  );
};

export default Bouns;
