import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Files = new FilesCollection({
  collectionName: 'files',
  storagePath: `${process.env.PWD}/uploads`,
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /xls|xlsx|/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
});

if (Meteor.isClient) {
  Meteor.subscribe('files.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.all', function () {
    return Files.find().cursor;
  });
}

export default Files;
