import {createFromAlgoliaCredentials} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch';


export const searchStore = createFromAlgoliaCredentials('TY70EG43AB', 'ad50754214a919e6c5a9b352dbaac6d8');

export const adminIndex = algoliasearch('TY70EG43AB', '0ad56bad0eb24f79800a0a1c5953ae8d').initIndex('books');