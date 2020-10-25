import { Mongo } from 'meteor/mongo';

export const DictionariesCollection = new Mongo.Collection('dictionaries');

export const DictionariesItemsCollection = new Mongo.Collection(
  'dictionaries.items'
);
