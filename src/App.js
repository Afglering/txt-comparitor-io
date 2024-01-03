import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ComparisonDisplay from './ComparisonDisplay';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  const [comparisonResult, setComparisonResult] = useState([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">.txt Comparator io</h1>
  
      {/* The 'setComparisonResult' function is passed as a prop. This function will be called
          within the FileUpload component to update the 'comparisonResult' state in this App component. */}
      <FileUpload setComparisonResult={setComparisonResult} />
      
      {comparisonResult && comparisonResult.length > 0 && (
        <ComparisonDisplay data={comparisonResult} />
      )}
    </div>
  );
};

export default App;
