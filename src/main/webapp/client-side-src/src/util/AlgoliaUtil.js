import {createFromAlgoliaCredentials} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch';


export const searchStore = createFromAlgoliaCredentials('', '');

export const adminIndex = algoliasearch('asdasdasds', '').initIndex('books');