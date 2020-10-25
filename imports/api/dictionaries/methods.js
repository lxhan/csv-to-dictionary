import { check } from 'meteor/check';
import xlsx from 'xlsx';
import {
  DictionariesCollection,
  DictionariesItemsCollection,
} from './collections';

Meteor.methods({
  'dictionaries.onUpload'(name, file) {
    check(name, String);
    check(file, Object);

    const xlsFile = xlsx.readFile(file.path);
    const sheet = xlsFile.Sheets[xlsFile.SheetNames[0]];
    const xlsToJson = xlsx.utils.sheet_to_json(sheet);
    const now = new Date();
    const languages = [];
    Object.keys(xlsToJson[0]).forEach((key) => languages.push(key));

    if (name && languages.length) {
      DictionariesCollection.insert(
        {
          name,
          languages,
          count: xlsToJson.length,
          createdAt: now,
        },
        (err, inserted) => {
          if (err) {
            console.error(err);
            throw err;
          }

          xlsToJson.forEach((obj) => {
            DictionariesItemsCollection.insert({
              dictionaryId: inserted,
              values: obj,
              createdAt: now,
            });
          });
        }
      );
    }
  },
  'dictionaries.remove'(id) {
    check(id, String);
    DictionariesCollection.remove(id);
    DictionariesItemsCollection.remove({ dictionaryId: id });
  },
});
