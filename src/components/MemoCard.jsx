import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext';
import CardContainer from './CardContainer';

const getWarningTypeStyle = (type) => {
  switch (type.toLowerCase()) {
    case 'green':
      return 'text-success-500 bg-success-100 px-2 py-1 rounded';
    case 'yellow':
      return 'text-orange-500 bg-orange-100 px-2 py-1 rounded';
    case 'red':
      return 'text-danger bg-red-100 px-2 py-1 rounded';
    default:
      return 'text-gray-500 bg-gray-100 px-2 py-1 rounded';
  }
}

const REACT_APP_API_URL = 'https://trackingApp.s3.us-east-2.amazonaws.com'

function MemoCard({ memo, onEdit, onDelete }) {
const {user:{role}} = useAuth()

  return (
    <CardContainer className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-primary font-medium">{memo.type}</span>
          <span className={`${getWarningTypeStyle(memo.warningType)} font-medium`}>
            {memo.warningType} Warning
          </span>
          <span className="text-placeholderText">{memo.date}</span>
        </div>
       {role ==='admin' && <div className="flex gap-2">
          <button 
            className="hover:opacity-80"
            onClick={() => onEdit(memo)}
          >
            <Pencil size={17} className="text-text" />
          </button>
          <button 
            className="text-danger hover:opacity-80"
            onClick={() => onDelete(memo)}
          >
            <Trash2 size={17} />
          </button>
        </div>}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-placeholderText mb-2">Description</h3>
          <p className="text-text">{memo.description}</p>
        </div>

        <div>
          <h3 className="text-placeholderText mb-2">Attachments</h3>
          {!memo.attachments || memo.attachments.length === 0 ? (
            <p className=" text-placeholderText/20 italic">No attachments</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {memo.attachments.map((attachment, index) => (
                <a 
                  key={index}
                  href={attachment.startsWith('http') ? attachment : `${REACT_APP_API_URL}/${attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1  rounded-md  underline transition-colors"
                >
                  <span className="text-sm">{attachment.split('/').pop()}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* <div>
          <h3 className="text-placeholderText mb-2">Required Action:</h3>
          <p className="text-text">{memo.requiredAction}</p>
        </div> */}
      </div>
    </CardContainer>
  )
}

export default MemoCard
