import * as ElasticAppSearch from '@elastic/app-search-javascript';
import { userNameIndex, endpointBaseAppSearch, searchKeyAppSearch } from 'utils/environment';

export const usersClient = ElasticAppSearch.createClient({
  searchKey: searchKeyAppSearch,
  endpointBase: endpointBaseAppSearch,
  engineName: userNameIndex,
  cacheResponses: false,
});

const parseUsers = (user) => {
  let userData;
  if (user.data) {
    userData = user.data;
  } else {
    userData = user;
  }
  // console.log(userData);

  return {
    activeSearchJob: userData?.active_search_job?.raw ? 'si' : 'no',
    hasDocuments: userData?.has_documents?.raw ? 'si' : 'no',
    email: userData?.email?.raw,
    codePhone: userData?.code_phone?.raw,
    phone: userData?.phone?.raw,
    names: userData?.names?.raw,
    lastNames: userData?.last_names?.raw,
    userID: userData?.id?.raw,
    stayInMexico: userData?.stay_in_mexico?.raw,
    address: userData?.address?.raw,
    viability: userData?.viability?.raw,
    percentageNoDocuments: userData?.percentage_no_documents?.raw || 0,
    percentageYesDocuments: userData?.percentage_yes_documents?.raw || 0,
    percentageHelpDocuments: userData?.percentage_help_documents?.raw || 0,
    numberOfMatches: userData?.number_of_matches?.raw || 0,
    documentsStatus: userData?.documents_status?.raw?.map((document) => JSON.parse(document)) || [],
    belongingToCommunity: userData?.belonging_to_community?.raw || [],
  };
};

export async function usersClientSearch(query, options) {
  const response = (await usersClient.search(query, options)) || {};
  const data = {
    hits: response.results?.map(parseUsers) || [],
    nbHits: response?.info.meta.page.total_results || 0,
    nbPages: response?.info.meta.page.total_pages || 0,
    page: response?.info.meta.page.current || 1,
  };
  return data;
}
