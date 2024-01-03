import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ComparisonDisplay from './ComparisonDisplay';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS to style the application.

const App = () => {
  // useState hook to manage the state of the comparison results.
  // Initially, it's an empty array, indicating no comparison has been performed yet.
  const [comparisonResult, setComparisonResult] = useState([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">.TXT Comparitor I/0</h1>
  
      {/* FileUpload component is responsible for handling the file upload process.
          The 'setComparisonResult' function is passed as a prop. This function will be called
          within the FileUpload component to update the 'comparisonResult' state in this App component. */}
      <FileUpload setComparisonResult={setComparisonResult} />
      
      {/* ComparisonDisplay component is responsible for displaying the comparison results.
          It's rendered only if there are comparison results to display. This is determined by checking
          that 'comparisonResult' has a length greater than 0. */}
      {comparisonResult && comparisonResult.length > 0 && (
        <ComparisonDisplay data={comparisonResult} />
      )}
    </div>
  );
};

export default App;
