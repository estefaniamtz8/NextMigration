import React from 'react';
import { Drawer, Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import isEmpty from 'lodash/isEmpty';

import { fetchDataPostAsync } from 'services/axios/fetchs';
import Job from 'components/common/Job';
import Resume from 'components/common/Applicants/Resume';
import MapWithPin from "components/Elements/Maps/MapWithPin";
import ApplicantsPagination from 'components/common/Applicants/Pagination';
import { ResumeSkeleton } from 'components/Elements/Skeleton';
import parseApplicants from 'utils/matches/applicant';
import useOnClickOutside from '../../../../../hook/useOnClickOutside';

const intialCenter = {
  lat: 19.427,
  lng: -99.1677,
};

const JobMatch = ({ job, jobs, matches, match, companies, open, onClose, onAccept, onReject }) => {
  const [currentApplicant, setApplicant] = React.useState(match);
  const [currentJob, setJob] = React.useState(job);
  const [currentCompany, setCurrentCompany] = React.useState(
    companies.find((company) => company.companyName === matches[match?.index]?.companyName)
  );
  const [center, setCenter] = React.useState(intialCenter);
  const [showMap, setShowMap] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const applicants = parseApplicants(matches, ['candidateID', 'name']);

  const onBeforeFindApplicant = (index) => {
    const applicant = matches[index];
    const company = companies.find((company) => company.companyName === applicant.companyName);
    const job = jobs.find((job) => job.docID === applicant?.jobID);
    setCurrentCompany(() => company);
    setJob(() => job);
    return setApplicant(() => ({ index, ...applicant }));
  };

  const onBeforeAcceptReject = (callback) => {
    const match = {
      userID: currentApplicant.candidateID,
      docID: currentApplicant.docID,
    };
    return callback(match);
  };

  const onBeforeShowMap = (address) => {
    if (address.lat && address.lng) {
      setCenter({ lat: address.lat, lng: address.lng });
    }
    setShowMap(true);
  };

  React.useEffect(() => {
    if (currentApplicant.candidateID && currentApplicant.candidateID !== person.docID && !loading) {
      setLoading(() => true);
      setShowMap(() => false);
      fetchDataPostAsync('aperture/user/personal', {
        IdUser: currentApplicant.candidateID,
      })
        .then((data) => {
          const person = data?.user;
          setPerson(() => person);
          setLoading(() => false);
        })
        .catch(() => {
          setPerson(() => ({}));
          setLoading(() => false);
        });
    }
  }, [currentApplicant]);

  React.useEffect(() => {
    if (match.index !== currentApplicant.index) {
      setApplicant(match);
    }
  }, [match]);

  React.useEffect(() => {
    if (job.docID !== currentJob.docID) {
      setCurrentCompany(() => companies.find((company) => company.companyName === matches[match?.index].companyName));
      setJob(job);
    }
  }, [job]);

  const MapMatchingHubRef = React.useRef();
  useOnClickOutside(MapMatchingHubRef, () => setShowMap(false));
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: { width: '95vw' },
      }}
    >
      <Box
        role="button"
        id="close-poper"
        sx={{ position: 'fixed', left: '1.8vw', top: '50vh', cursor: 'pointer' }}
        onClick={() => onClose()}
      >
        <MdClose size={30} color="#FFF" />
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <ApplicantsPagination
            current={currentApplicant.index}
            candidates={applicants}
            onPrevious={onBeforeFindApplicant}
            onNext={onBeforeFindApplicant}
            onSelectCandidate={onBeforeFindApplicant}
          />
        </Grid>
        <Grid item xs={5}>
          {loading || isEmpty(person) ? (
            <ResumeSkeleton />
          ) : (
            <Resume person={person} showMap={showMap} setShowMap={setShowMap} onShowAddress={onBeforeShowMap} />
          )}
        </Grid>
        <Grid item xs={4}>
          <Box
            ref={MapMatchingHubRef}
            sx={{ width: '100%', height: '100%', boxShadow: '0px 3px 20px #00000029', position: 'relative' }}
          >
            {showMap ? (
              <MapWithPin 
                center={center} 
                setShowMap={setShowMap} 
                setCenter={setCenter} 
                job={currentJob} 
                person={person} 
              />
            ) : (
              <Job
                job={{
                  ...currentJob,
                  companyName: currentCompany ? currentCompany.companyName : 'Company Name',
                  logo: currentCompany ? currentCompany.logo : null,
                }}
                showClose={false}
                showActions
                onAccept={() => onBeforeAcceptReject(onAccept)}
                onReject={() => onBeforeAcceptReject(onReject)}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

JobMatch.defaultProps = {
  open: false,
};

JobMatch.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  job: PropTypes.shape().isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  match: PropTypes.shape().isRequired,
  matches: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const MemoizedJobMatch = React.memo(JobMatch);

export default MemoizedJobMatch;
