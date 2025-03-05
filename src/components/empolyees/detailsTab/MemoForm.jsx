import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../AddModal';
import UniTextInput from '../../UniTextInput';
import UniUploadDoc from '../../UniUploadDoc';
import { resetWarningState } from '../../../store/reducers/warning';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { IMAGE_URL } from '../../../utils/constants';

const levelOptions = [
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'red', label: 'Red' }
];

const memoSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  level: z.string({
    required_error: 'Please select level level'
  }),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  files: z.array(z.any()).optional()
});

const MemoForm = ({ isOpen, onClose, onSubmit, initialValues = { 
  title: '', 
  level: 'moderate', 
  description: '', 
  requiredAction: '',
  files: [],
  attachments: []
}, isEdit }) => {
  const { loading, isCreated , error } = useSelector((state) => state.warning)
  const dispatch = useDispatch();
  const [existingFiles, setExistingFiles] = useState([]);
  
  const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(memoSchema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  const values = watch();

  // Process attachments into the format expected by UniUploadDoc
  useEffect(() => {
    // Ensure attachments exists and is an array before processing
    const attachments = initialValues?.attachments || [];
    
    if (attachments.length > 0) {
      const formattedFiles = attachments.map(attachment => {
        if (!attachment) return null; // Skip null/undefined attachments
        
        const fileName = attachment.split('/').pop();
        const fileType = fileName.split('.').pop() || '';
        return {
          name: fileName,
          url: attachment.startsWith('http') ? attachment : `${IMAGE_URL}/${attachment}`,
          type: fileType,
          uploadDate: 'Existing file',
          // Store the original attachment string for reference
          originalAttachment: attachment
        };
      }).filter(Boolean); // Remove any null entries
      
      setExistingFiles(formattedFiles);
      
      // Initialize the files value with existing files
      setValue('files', formattedFiles, { shouldValidate: true });
    } else {
      setExistingFiles([]);
    }
  }, [initialValues, setValue]);

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFilesChange = (newFiles) => {
    setValue('files', newFiles, { shouldValidate: true });
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };


  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Memo" : "Issue a New Memo"}
      onSave={handleSubmit(handleFormSubmit)}
      saveButtonText={isEdit ? "Save" : "Issue"}
      cancelButtonText="Cancel"
      isLoading={loading}
      haveWidth={true}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <UniTextInput
          label="Title"
          placeholder="Enter title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Level"
          placeholder="Select  level"
          value={values.level || ''}
          onChange={(value) => setValue('level', value, { shouldValidate: true })}
          options={levelOptions}
          error={errors.level?.message}
          required
        />


        <UniUploadDoc
          title=""
          fileType="all"
          onFilesChange={handleFilesChange}
          maxFiles={1}
          description="Support for single or bulk upload. Strictly prohibit from uploading company data or other banned files"
          showFileList={true}
          error={errors.files?.message}
          existingFiles={existingFiles}
          onDeleteExisting={(file) => {
            // Remove the file from existingFiles
            setExistingFiles(prev => prev.filter(f => f.url !== file.url));
            // Update the form value
            const updatedFiles = values.files.filter(f => 
              !("url" in f) || f.url !== file.url
            );
            setValue('files', updatedFiles, { shouldValidate: true });
          }}
        />
        <UniTextInput
          type="textarea"
          label="Description"
          placeholder="Enter description"
          value={values.description || ''}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
          error={errors.description?.message}
          required
          rows={6}
        />

      </form>
    </AddModal>
  );
};

export default MemoForm;
