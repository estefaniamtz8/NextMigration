import React from 'react';
import LogoMain from 'assets/intrareLogotipo.png';
import dayjs from 'dayjs';

/**
 * Component representing a job card.
 *
 * @component
 * @param {object} props - The properties of the job.
 * @param {object} props.job - The information of the job.
 * @param {string} props.job.name - The name of the job.
 * @param {object} props.job.salary - Information about the job salary.
 * @param {string} props.job.salary.type - The type of salary ('exact' or 'range').
 * @param {number} props.job.salary.total - The total salary (only if type is 'exact').
 * @param {number} props.job.salary.min - The minimum salary (only if type is 'range').
 * @param {number} props.job.salary.max - The maximum salary (only if type is 'range').
 * @param {number} props.job.salaryWork - The salary for work (if not specified, it defaults to 0).
 * @param {object} props.job.location - Information about the job location.
 * @param {string} props.job.location.location - The location of the job.
 * @param {string} props.job.createdAt - The creation date of the job (in ISO 8601 format).
 * @returns {JSX.Element} A React component.
 */
const JobCard = (props) => {
  const { job } = props;

  return (
    <div className="rounded-md bg-white">
      <div className="p-4">
        <div className="mb-6 flex flex-row items-end gap-4">
          <img
            src={job?.dataCompany?.logo?.url || job?.dataCompany?.logo || LogoMain}
            className="h-24 w-24 rounded-md bg-cream"
            alt="job logo"
          />
          <div className="flex flex-col gap-1">
            <p className="text-base">{job?.name}</p>
            <p className="text-sm">
              {job?.salary?.type === 'exact' && `$${new Intl.NumberFormat('en-US').format(job?.salary?.total)}`}
              {job?.salary?.type === 'range' &&
                `$${new Intl.NumberFormat('en-US').format(job?.salary?.min)} - $${new Intl.NumberFormat('en-US').format(
                  job?.salary?.max
                )}`}
              {job?.salaryWork !== 0 && !job?.salary && `$${new Intl.NumberFormat('en-US').format(job?.salaryWork)}`}
            </p>
            <p className="text-sm">{job?.location?.location || 'Mexico City, Federal District, Mexico'}</p>
          </div>
          <p className="ml-auto self-center pb-5 text-xs">
            Posted {job?.createdAt ? dayjs().diff(dayjs(job?.createdAt), 'days') : '0'} days ago
          </p>
        </div>
      </div>

      <div className="flex flex-row" style={{ borderTop: '1px solid #E9E7E6' }}>
        <div
          className="flex h-36 w-full flex-col items-center justify-center px-2 text-center"
          style={{ borderRight: '1px solid #E9E7E6' }}
        >
          <p className="mb-4 text-xl">{job?.matchesCount || 0}</p>
          <p className="text-sm">Recommended</p>
        </div>
        <div
          className="flex h-36 w-full flex-col items-center justify-center px-2 text-center"
          style={{ borderRight: '1px solid #E9E7E6' }}
        >
          <p className="mb-4 text-xl">0</p>
          <p className="text-sm">Views</p>
        </div>
        <div
          className="flex h-36 w-full flex-col items-center justify-center px-2 text-center"
          style={{ borderRight: '1px solid #E9E7E6' }}
        >
          <p className="mb-4 text-xl">0</p>
          <p className="text-sm">Accepted</p>
        </div>
        <div className="flex h-36 w-full flex-col items-center justify-center px-2 text-center">
          <p className="mb-4 text-xl">0</p>
          <p className="text-sm">Rejected</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
