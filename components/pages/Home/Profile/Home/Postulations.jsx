import React, { useEffect, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import toast from 'react-hot-toast';
import palette from '../../../../../styles/palette';
import PostulateToVacancySidebar from './MatchingHub/PostulateToVacancySidebar';
import { fetchDataGetAsync } from '../../../../../services/axios/fetchs';
import { JobsCardsSkeletonThin } from '../../../../Elements/Skeleton';
import magicHat from '../../../../../assets/lotties/Magic_Hat.json';
import Postulation from './MatchingHub/Postulation';

function Postulations(args) {
  const [showAddVacancy, setShowAddVacancy] = useState(false);
  const user = useSelector((state) => state?.users?.user);

  const [recentVacancies, setRecentVacancies] = useState([]);
  const [postulationsFiltered, setPostulationsFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchDataGetAsync(`/ats/postulations?userID=${user?.uid || user?.docID}`)
      .then((data) => {
        if (data?.body?.success) {
          setRecentVacancies(data?.body?.data?.postulations);
          setPostulationsFiltered(data?.body?.data?.postulations);
        } else {
          setRecentVacancies([]);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error en la búsqueda de vacantes');
        setLoading(false);
      });
  }, [user?.uid, user?.docID]);

  useEffect(() => {
    if (filter) {
      const filtered = recentVacancies.filter((postulation) =>
        postulation?.job?.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
      setPostulationsFiltered(filtered);
    } else {
      setPostulationsFiltered(recentVacancies);
    }
  }, [filter, recentVacancies]);

  if (loading) {
    return <JobsCardsSkeletonThin />;
  }

  return (
    <div className="flex max-w-[33rem] flex-col gap-8">
      <div className="flex items-center justify-between">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          id="textSearch"
          name="textSearch"
          type="text"
          placeholder="Buscar por palabra clave"
          className="w-80 rounded-lg border-none bg-white px-4 py-2 font-sans text-sm outline-none placeholder:text-black"
        />
        <div className="flex gap-4">
          <AiFillFire onClick={() => setShowAddVacancy(true)} size={20} cursor="pointer" color={palette.purple300} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {postulationsFiltered?.length > 0 ? (
          postulationsFiltered
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((postulation) => <Postulation key={postulation.jobID} postulation={postulation} />)
        ) : (
          <>
            <Lottie animationData={magicHat} className="h-40 w-40 self-center" />
            <span style={{ fontSize: '13px' }}> Sin postulaciones </span>
          </>
        )}
      </div>
      <PostulateToVacancySidebar
        showAddVacancy={showAddVacancy}
        setShowAddVacancy={setShowAddVacancy}
        {...args}
        postulationsFiltered={postulationsFiltered}
        setPostulationsFiltered={setPostulationsFiltered}
      />
    </div>
  );
}

export default Postulations;
