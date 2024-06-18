export const jobsTypes = {
  SET_JOBS: 'jobs/SET_JOBS',
  ADD_JOB: 'jobs/ADD_JOB',
  EDIT_JOB: 'jobs/EDIT_JOB',
};

export const setJobs = (jobs) => ({
  type: jobsTypes.SET_JOBS,
  payload: jobs,
});

export const addJob = (job) => ({
  type: jobsTypes.ADD_JOB,
  payload: job,
});

export const editJob = (job) => ({
  type: jobsTypes.EDIT_JOB,
  payload: job,
});
