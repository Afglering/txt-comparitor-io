import React from 'react';
import PropTypes from 'prop-types';


const ComparisonDisplay = ({ data }) => {
  return (
    <div className="mt-4">
      <h2>Comparison Results:</h2>
      {/* Iterate over each result item. The 'data' prop is expected to be an array of objects
          where each object represents the differences found between two corresponding entries. */}
      {data.map((item, index) => (
        <div key={index} className="card my-3">
          {/* Card Header: Displays the type and ID for the item being compared.*/}
          <div className="card-header">
            Type: {item.Type}, ID: {item.ID}
          </div>
          {/* Card Body: Contains  text area where the differences are displayed in a JSON format */}
          <div className="card-body">
            {/* JSON.stringify is used to convert the 'differences' object into a readable string. */}
            <pre>{JSON.stringify(item.differences, null, 2)}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

ComparisonDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Type: PropTypes.string,       // Expect a string for the 'Type' property.
      ID: PropTypes.string,         // Expect a string for the 'ID' property.
      differences: PropTypes.object,  // Expect an object for the 'differences' property.
    })
  ).isRequired,  
};

export default ComparisonDisplay;
