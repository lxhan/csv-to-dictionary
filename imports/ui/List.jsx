import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import { langMap } from './common';
import { DictionariesCollection } from '../api/dictionaries/collections';

const List = () => {
  const dictionaries = useTracker(() =>
    DictionariesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: '/details',
      search: `id=${id}`,
    });
  };

  const handleChildClick = (e, id) => {
    e.stopPropagation();
    const remove = confirm('Are you sure you want to remove this dictionary?');

    if (remove) {
      Meteor.call('dictionaries.remove', id);
    }
  };

  return (
    <>
      <h1>list</h1>
      <div className="list-header">
        <div>Number</div>
        <div>Dictionary Name</div>
        <div>Languages</div>
        <div>Words Count</div>
        <div>Registration Date</div>
        <div>Actions</div>
      </div>
      {dictionaries.map((dict, i) => (
        <div
          className="list-body"
          onClick={() => handleClick(dict._id)}
          key={dict._id}
        >
          <div>{i + 1}</div>
          <div>{dict.name}</div>
          <div>{dict.languages.map((lang) => ` ${langMap.get(lang)} `)}</div>
          <div>{dict.count}</div>
          <div>{new Date(dict.createdAt.toString()).toDateString()}</div>
          <div onClick={(e) => handleChildClick(e, dict._id)}>X</div>
        </div>
      ))}
    </>
  );
};

export default List;
