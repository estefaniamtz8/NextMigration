import dynamic from 'next/dynamic';

const CompanyComponent = dynamic(() => import('pages/Company'));

export default CompanyComponent;
