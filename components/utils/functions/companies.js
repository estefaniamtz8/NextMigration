import dayjs from 'dayjs';

const createCompanyMinSchema = function (company) {
  return {
    docID: company?.companyID,
    companyID: company?.companyID,
    companyName: company.companyName || 'Sin nombre',
    createdAt: company.createdAt || dayjs().valueOf(),
    ATSTime: dayjs().valueOf(),
    fromAPI: true,
    isFromATS: false,
    location: company?.location || '',
    logo: company.logo || null,
    active: company.active || false,
    status: company.status || 'waiting',
    plan: company.plan || null,
    integrations: company.integrations || [],
  };
};

export default createCompanyMinSchema;
