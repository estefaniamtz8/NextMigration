import { urlBaseCX } from '../../../utils/environment';
import { fetchDataGetAsyncCX, fetchDataPostAsyncCX } from '../../../services/axios/fetchs';

export async function updateInsertBillingInfo(sendable) {
  try {
    const response = await fetchDataPostAsyncCX(`${urlBaseCX}/v1/billing`, { billing: sendable });
    if (response?.billing?.companyID) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

export async function getTransactionsInfo(companyID) {
  try {
    const response = await fetchDataGetAsyncCX(`${urlBaseCX}/v1/transactions?companyID=${companyID}`);
    if (response?.transactions) {
      return {
        transactions: response?.transactions,
        invoices: response?.invoices,
        success: true,
      };
    }
    return {
      transactions: [],
      invoices: [],
      success: false,
    };
  } catch (e) {
    return {
      transactions: [],
      invoices: [],
      success: false,
      error: e,
    };
  }
}
export default updateInsertBillingInfo;
