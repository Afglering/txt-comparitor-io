import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// FileUpload component manages the file upload and comparison process.
const FileUpload = ({ setComparisonResult }) => {
  const [files, setFiles] = useState([]); // Store the selected files.
  const [fileContents, setFileContents] = useState(['', '']); // Store contents of the uploaded files for display.
  const [isLoading, setIsLoading] = useState(false); // Loading indicator for asynchronous operations.
  const [error, setError] = useState(''); // Error message for user feedback.
  const [isUploaded, setIsUploaded] = useState(false); // Flag to indicate if files have been uploaded.

  // Handler for file selection via the file input element.
  const onFileChange = (e) => {
    if (e.target.files.length !== 2) {
      setError('Please select exactly two .txt files.'); // Set error for incorrect file count.
      return;
    }
    setFiles(e.target.files); // Update state with selected files.
    setError(''); // Clear any existing errors.
  };

  // Function to read contents of selected files using the FileReader API.
  const readFiles = (selectedFiles) => {
    const reader1 = new FileReader(); // Create FileReader for the first file.
    const reader2 = new FileReader(); // Create FileReader for the second file.

    // When the first file is read, update the state to reflect its contents.
    reader1.onload = () => {
      setFileContents(prev => [reader1.result, prev[1]]);
    };
    // When the second file is read, update the state to reflect its contents.
    reader2.onload = () => {
      setFileContents(prev => [prev[0], reader2.result]);
    };

    // Initiate reading of the files.
    reader1.readAsText(selectedFiles[0]);
    reader2.readAsText(selectedFiles[1]);
  };

  // Handler for the upload button. Initiates reading of file contents.
  const onUpload = async () => {
    if (files.length !== 2) {
      setError('Please select exactly two .txt files.'); // Validate file count.
      return;
    }
    setIsLoading(true); // Indicate loading (file reading).
    readFiles(files); // Read the contents of the files.
    setIsUploaded(true); // Set flag indicating files are ready for comparison.
    setIsLoading(false); // End loading indication.
  };

  // Handler for the compare button. Sends files to server for comparison.
  const onCompare = async () => {
    if (!isUploaded) {
      setError('Please upload the files first.'); // Validate files have been uploaded.
      return;
    }
    setIsLoading(true); // Indicate loading (comparison process).
    const formData = new FormData(); // Prepare files for HTTP request.
    Array.from(files).forEach((file) => {
      formData.append('files', file); // Append files to FormData.
    });

    try {
      // Perform the POST request to the server with the selected files.
      const res = await axios.post('http://localhost:3001/upload', formData);
      setComparisonResult(res.data); // Update the comparison results in the parent component.
      setIsLoading(false); // End loading indication.
    } catch (error) {
      console.error('Error comparing files:', error); // Log error for debugging.
      setError('Failed to compare files. Please try again.'); // Set error message for the user.
      setIsLoading(false); // Ensure loading state is reset even if an error occurs.
    }
  };

  return (
    <div>
      {/* File input to select two files. Triggers onFileChange when files are selected. */}
      <input type="file" className="form-control mb-2" multiple onChange={onFileChange} />
      {/* Text areas to display the contents of the uploaded files. Only shown when file contents are available. */}
      {fileContents[0] && fileContents[1] && (
        <>
          <textarea className="form-control mb-2" value={fileContents[0]} readOnly />
          <textarea className="form-control mb-2" value={fileContents[1]} readOnly />
        </>
      )}
      {/* Upload button to initiate reading of file contents. Disabled during loading or after files have been uploaded. */}
      <button className={`btn btn-primary`} onClick={onUpload} disabled={isLoading || files.length !== 2 || isUploaded}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {/* Compare button to initiate comparison on the server. Disabled until files are uploaded or during loading. */}
      <button className="btn btn-secondary ml-2" onClick={onCompare} disabled={!isUploaded || isLoading}>
        {isLoading ? 'Comparing...' : 'Compare'}
      </button>
      {/* Display error messages to the user if any exist. */}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

// PropTypes for type-checking the expected props for the component.
FileUpload.propTypes = {
  setComparisonResult: PropTypes.func.isRequired, // Function to update comparison results in parent component.
};

export default FileUpload;
