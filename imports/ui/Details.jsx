import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { DictionariesItemsCollection } from '../api/dictionaries/collections';
import { langMap } from './common';

const Details = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const items = useTracker(() =>
    DictionariesItemsCollection.find({ dictionaryId: id }).fetch()
  );

  return (
    <div>
      <h1>details</h1>
      <div className="details">
        <div className="details-header">
          {items.length &&
            Object.keys(items[0].values).map((key, i) => (
              <div key={i}>{langMap.get(key)}</div>
            ))}
        </div>
        <div className="details-body">
          {items.length &&
            items.map((item) => (
              <div className="details-body-row" key={item._id}>
                {Object.values(item.values).map((val, i) => (
                  <div key={i}>{val}</div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
