import React from 'react';
import { JobsCardsSkeleton } from 'components/Elements/Skeleton';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import JobCard from './ jobCard';
import { fetchDataGetAsync } from '../../../../../services/axios/fetchs';

/**
 *
 * @component
 * @returns {JSX.Element}
 */
const AnalyticsJobs = () => {
  async function getRecentVacancies() {
    const rawData = await fetchDataGetAsync('/ats/vacancy/recent');
    const dataNew = rawData?.body;
    return dataNew;
  }

  const {
    data: recentVacancies,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['recentVacancies'],
    queryFn: getRecentVacancies,
  });
  if (error) {
    toast.error('Error en la búsqueda de vacantes');
  }
  // const [loading, setLoading] = useState(false);
  // const [recentVacancies, setRecentVacancies] = useState([]);
  //
  // useEffect(() => {
  //   setLoading(true);
  //   fetchDataGetAsync('/ats/vacancy/recent')
  //     .then((data) => {
  //       setRecentVacancies(data?.body);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       NotificationManager.error('Error en la búsqueda de vacantes', 'code: 500');
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) {
    return <JobsCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {recentVacancies
        ?.sort((a, b) => b?.matchesCount - a?.matchesCount)
        ?.slice(0, 4)
        ?.map((value) => (
          <JobCard key={value?.jobID || value?.docID} job={value} />
        ))}
    </div>
  );
};

export default AnalyticsJobs;
