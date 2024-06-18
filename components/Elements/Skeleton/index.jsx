import React from 'react';
import BaseSkeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Skeleton = () => (
  <Stack spacing={1}>
    <BaseSkeleton variant="text" sx={{ fontSize: '1rem' }} />
    <BaseSkeleton variant="rounded" width="100%" height={60} />
    <BaseSkeleton variant="rounded" width="100%" height={60} />
  </Stack>
);

export default Skeleton;

export const FormSkeleton = () => (
  <Stack spacing={1} sx={{ width: '100%', padding: '1rem 0' }}>
    <BaseSkeleton variant="text" height={40} sx={{ fontSize: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.11)' }} />
    {Array.from({ length: 9 }, (value) => value).map((i) => (
      <BaseSkeleton
        key={i}
        variant="rounded"
        width="100%"
        height={60}
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.11)' }}
      />
    ))}
  </Stack>
);

export const ResumeSkeleton = () => (
  <Stack spacing={3} direction="column" sx={{ width: '100%', padding: '1rem' }}>
    <Stack spacing={3} sx={{ width: '100%' }} direction="row" alignItems="center">
      <BaseSkeleton variant="circular" width={120} height={100} sx={{ backgroundColor: '#E0E0E0' }} />
      <Stack spacing={2} direction="column" sx={{ width: '100%' }}>
        <BaseSkeleton variant="rounded" width="100%" height={16} sx={{ backgroundColor: '#E0E0E0' }} />
        <BaseSkeleton variant="rounded" width="100%" height={16} sx={{ backgroundColor: '#E0E0E0' }} />
        <BaseSkeleton variant="rounded" width="100%" height={16} sx={{ backgroundColor: '#E0E0E0' }} />
      </Stack>
    </Stack>
    <BaseSkeleton variant="rounded" height={80} sx={{ backgroundColor: '#E0E0E0' }} />
    <BaseSkeleton variant="rounded" height={150} sx={{ backgroundColor: '#E0E0E0' }} />
    <BaseSkeleton variant="rounded" height={80} sx={{ backgroundColor: '#E0E0E0' }} />
    <BaseSkeleton variant="rounded" height={80} sx={{ backgroundColor: '#E0E0E0' }} />
    <BaseSkeleton variant="rounded" height={150} sx={{ backgroundColor: '#E0E0E0' }} />
    <BaseSkeleton variant="rounded" height={70} sx={{ backgroundColor: '#E0E0E0' }} />
  </Stack>
);

export const CalendarSkeleton = () => (
  <div className="mx-auto w-full rounded-md bg-white p-4">
    <div className="flex animate-pulse flex-col gap-4">
      <div className="h-32 w-full rounded bg-light-four" />
      <div className="h-32 w-full rounded bg-light-four" />
      <div className="h-32 w-full rounded bg-light-four" />
      <div className="h-32 w-full rounded bg-light-four" />
      <div className="h-32 w-full rounded bg-light-four" />
    </div>
  </div>
);

export const JobsCardsSkeleton = () => (
  <div className="grid animate-pulse grid-cols-2 gap-8">
    {Array.from({ length: 4 }, (value) => value).map((i) => (
      <div className="mx-auto h-72 w-full rounded-md bg-white p-4" key={i}>
        <div className="flex flex-row items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-light-four" />
          <div className="flex w-full flex-col gap-3">
            <div className="h-5 rounded bg-light-four" />
            <div className="h-3 rounded bg-light-four" />
            <div className="h-3 rounded bg-light-four" />
          </div>
        </div>
        <div className="mt-8 flex w-full flex-row gap-2">
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
        </div>
      </div>
    ))}
  </div>
);

export const JobsCardsSkeletonThin = () => (
  <div className="grid animate-pulse grid-cols-1 gap-8">
    {Array.from({ length: 4 }, (value) => value).map((i) => (
      <div className="mx-auto h-32 w-full rounded-md bg-white p-4" key={i}>
        <div className="flex flex-row items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-light-four" />
          <div className="flex w-full flex-col gap-3">
            <div className="h-5 rounded bg-light-four" />
            <div className="h-3 rounded bg-light-four" />
            <div className="h-3 rounded bg-light-four" />
          </div>
        </div>
        <div className="mt-8 flex w-full flex-row gap-2">
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
          <div className="h-40 w-full rounded bg-light-four" />
        </div>
      </div>
    ))}
  </div>
);
