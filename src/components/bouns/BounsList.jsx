import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { deleteBonus } from '../../store/reducers/bonuses';
import { useAuth } from '../../contexts/AuthContext';
import CardContainer from '../CardContainer';
import UniHeading from '../UniHeading';
import NoDataMsg from '../NoDataMsg';
import DeleteConfirmation from '../DeleteConfirmation';

function BounsList({ onEdit }) {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { bonuses  } = useSelector(state => state.bonuses || {});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBonusId, setSelectedBonusId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedBonusId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedBonusId) {
      dispatch(deleteBonus({ bonusId: selectedBonusId, token }));
      setDeleteModalOpen(false);
    }
  };

  const handleEdit = (bonus) => {
    if (onEdit) {
      onEdit(bonus);
    }
  };
  return (
    <div>
      <div className="space-y-4">
        <UniHeading
          icon={PlusCircle}
          text="Bonus Configuration"
        />
        
        {bonuses && bonuses.length > 0 ? (
          bonuses.map((bonus) => (
            <CardContainer key={bonus._id} className="p-4 rounded-lg border border-borderColor flex justify-between items-center">
              <div>
                <h4 className="text-lg text-text font-medium">{bonus.name}</h4>
                <p className="text-placeholderText text-sm">{bonus.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm capitalize">
                    {bonus.type}
                  </span>
                  {bonus.type === "overtime" ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {bonus.overtimeRates && bonus.overtimeRates.length > 0 
                        ? `${bonus.overtimeRates[0].rate}%` 
                        : "Variable Rate"}
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      ${bonus.fixedAmount}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="hover:opacity-80"
                  onClick={() => handleEdit(bonus)}
                >
                  <Pencil size={17} className="text-text" />
                </button>
                <button 
                  className="text-danger hover:opacity-80"
                  onClick={() => handleDeleteClick(bonus._id)}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </CardContainer>
          ))
        ) : (
          <NoDataMsg message="No bonuses found" />
        )}
      </div>

      {deleteModalOpen && (
        <DeleteConfirmation
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Bonus"
          message="Are you sure you want to delete this bonus? This action cannot be undone."
        />
      )}
    </div>
  )
}

BounsList.propTypes = {
  onEdit: PropTypes.func
};

export default BounsList;
