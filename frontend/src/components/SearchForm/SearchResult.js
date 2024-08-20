// ListingsDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({ listings }) => {
  return (
    <div className="listings-container">
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing, index) => (
            <li key={index} className="listing-item">
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <p>Price: {listing.price}</p>
              <p>Location: {listing.location}</p>
              {/* Add other relevant details here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchResult.propTypes = {
  listings: PropTypes.array.isRequired,
};

export default SearchResult;
