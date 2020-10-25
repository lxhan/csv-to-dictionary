import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';
import Files from '../api/files';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const upload = (file) => {
    const uploadInstance = Files.insert(
      {
        file,
        streams: 'dynamic',
        chunkSize: 'dynamic',
      },
      false
    );

    uploadInstance.on('uploaded', function (error, fileObj) {
      console.log('Uploaded: ', fileObj);
      Meteor.call('dictionaries.onUpload', title, fileObj);
      history.push('/list');
    });

    uploadInstance.on('error', function (error, fileObj) {
      console.log('Error during upload: ' + error);
    });

    uploadInstance.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !selectedFile) return;

    upload(selectedFile);

    setTitle('');
    setSelectedFile(null);
  };

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const fuck = (value) => {
    console.log('value', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" name="file" onChange={handleFile} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
