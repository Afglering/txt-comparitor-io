import React from 'react';
import PropTypes from 'prop-types';

// ComparisonDisplay component is responsible for rendering the differences
// between the two files after they have been compared on the server.
const ComparisonDisplay = ({ data }) => {
  return (
    <div className="mt-4">
      <h2>Comparison Results:</h2>
      {/* Iterate over each result item. The 'data' prop is expected to be an array of objects
          where each object represents the differences found between two corresponding entries in the files. */}
      {data.map((item, index) => (
        <div key={index} className="card my-3">
          {/* Card Header: Displays the type and ID for the item being compared.*/}
          <div className="card-header">
            Type: {item.Type}, ID: {item.ID}
          </div>
          {/* Card Body: Contains a preformatted text area where the differences
               are displayed in a structured JSON format */}
          <div className="card-body">
            {/* JSON.stringify is used to convert the differences object into a readable string.
                 The arguments 'null' and '2' are used to format the JSON with proper indentation. */}
            <pre>{JSON.stringify(item.differences, null, 2)}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};


// Ensures that the data passed to the component is an array of objects with specific properties.
ComparisonDisplay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Type: PropTypes.string,       // Expect a string for the 'Type' property.
      ID: PropTypes.string,         // Expect a string for the 'ID' property.
      differences: PropTypes.object,  // Expect an object for the 'differences' property.
    })
  ).isRequired,  // Data is a required prop for this component to function properly.
};

export default ComparisonDisplay;
