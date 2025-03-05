import React, { useCallback, useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Upload, FileText, FileSpreadsheet, File, X, Image as ImageIcon, FileType } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { truncateText } from "../utils/truncate";
import { useTheme } from "../contexts/ThemeContext";

const ACCEPTED_FILE_TYPES = {
  documents: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  },
  images: {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
};

const getFileTypeDescription = (fileType) => {
  switch (fileType) {
    case "documents":
      return "Supports: PDF, DOC, DOCX, XLS, XLSX";
    case "images":
      return "Supports: PNG, JPG, JPEG, GIF, WEBP";
    case "all":
      return "Supports: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG, GIF, WEBP";
    default:
      return "";
  }
};

function UniUploadDoc({
  title = "Upload Files",
  fileType = "documents",
  onFilesChange,
  maxFiles = 0,
  description,
  showFileList = true,
  className = "",
  requiredDocuments = [],
  existingFiles = [],
  onDeleteExisting,
}) {
  const { theme } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentExistingFiles, setCurrentExistingFiles] = useState(existingFiles);
  const [allFiles, setAllFiles] = useState([]);

  // Reset state when existingFiles prop changes
  useEffect(() => {
    existingFiles.forEach((file) => {
    });
    setUploadedFiles([]);
    setCurrentExistingFiles(existingFiles);
  }, [JSON.stringify(existingFiles)]);

  // Update combined files when either state changes
  useEffect(() => {
    const combined = [...currentExistingFiles, ...uploadedFiles];
    setAllFiles(combined);
    onFilesChange?.(combined);
  }, [uploadedFiles, currentExistingFiles]);

  const acceptedTypes =
    fileType === "all"
      ? { ...ACCEPTED_FILE_TYPES.documents, ...ACCEPTED_FILE_TYPES.images }
      : ACCEPTED_FILE_TYPES[fileType];

  const defaultDescription = description || getFileTypeDescription(fileType);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const processFile = async (file) => {
        const isImage = file.type.startsWith("image/");
        let preview;

        if (isImage) {
          preview = URL.createObjectURL(file);
        }

        return {
          file,
          name: file.name,
          uploadDate: new Date().toISOString().split("T")[0],
          type: file.name.split(".").pop() || "",
          preview,
        };
      };

      Promise.all(acceptedFiles.map(processFile)).then((newFiles) => {
        const remainingSlots = maxFiles > 0 ? maxFiles - allFiles.length : Infinity;
        const filesToAdd = newFiles.slice(0, remainingSlots);

        setUploadedFiles((prev) => [...prev, ...filesToAdd]);
      });
    },
    [allFiles.length, maxFiles]
  );

  const removeFile = (index, isExisting) => {
    if (isExisting) {
      const fileToRemove = currentExistingFiles[index];
      onDeleteExisting?.(fileToRemove);
      // Update allFiles immediately
      setAllFiles((prev) => prev.filter((f) => ("url" in f ? f.url !== fileToRemove.url : true)));
    } else {
      const uploadedIndex = index - currentExistingFiles.length;
      const fileToRemove = uploadedFiles[uploadedIndex];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      setUploadedFiles((prev) => prev.filter((_, i) => i !== uploadedIndex));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: maxFiles > 0 ? maxFiles - allFiles.length : undefined,
    disabled: maxFiles > 0 && allFiles.length >= maxFiles,
  });

  const getFilePreview = (file) => {
    if ("preview" in file) {
      return file.preview;
    }
    if ("url" in file && file.type.match(/^(jpg|jpeg|png|gif|webp)$/i)) {
      return file.url;
    }
    return undefined;
  };

  const getFileIcon = (file) => {
    const preview = getFilePreview(file);

    if (preview) {
      return <img src={preview} alt="preview" className="w-10 h-10 object-contain rounded" />;
    }

    switch (file.type.toLowerCase()) {
      case "pdf":
        return <FileType className="w-6 h-6 text-red-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 text-blue-500" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "webp":
        return <ImageIcon className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

      <Card className="w-full mb-6">
        <CardBody>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-primary bg-secondPrimaryColor" : "border-borderColor hover:border-primary"}
              ${maxFiles > 0 && allFiles.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}`}>
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 w-12 h-12 text-primary" />
            <p className="text-lg mb-2 text-hoverText">Drop files here or click to upload</p>
            {defaultDescription && <p className="text-sm text-placeholderText">{defaultDescription}</p>}
            {maxFiles > 0 && (
              <p className="text-sm text-placeholderText mt-2">
                Files: {allFiles.length} / {maxFiles}
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {requiredDocuments.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Required Documents:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="text-sm text-placeholderText">
                • {doc.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {showFileList && allFiles.length > 0 && (
        <div className="space-y-4">
          <ul className="space-y-3">
            {allFiles.map((file, index) => (
              <li 
                key={index}
                className="flex items-center justify-between p-3 bg-background rounded-lg group">
                <div className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <Tooltip content={file.name} isDisabled={file.name.length < 50}>
                    <span className="font-medium text-text xs:text-xs"> {truncateText(file.name, 30, "...")} </span>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-placeholderText">{file.uploadDate || "Existing file"}</span>

                  <Button
                    onPress={() => removeFile(index, index < currentExistingFiles.length)}
                    className="p-0 rounded-full hover:bg-secondPrimaryColor text-placeholderText hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove file"
                    size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UniUploadDoc;
