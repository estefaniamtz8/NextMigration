import { create } from 'zustand';
import isEmpty from 'lodash/isEmpty';

export const matchingHubInitialState = {
  matches: [],
  filteredMatches: [],
  filters: {
    sort: 'all',
    matchFit: 60,
    companies: [],
    job: {},
    fit: '',
  },
};

const useMatchingHubStore = create((set, get) => ({
  ...matchingHubInitialState,
  setMatchingHub: (data) =>
    set({
      ...data,
    }),
  setMatches: (matches) =>
    set({
      matches,
      filteredMatches: matches,
    }),
  setFilteredMatches: (filteredMatches) =>
    set({
      filteredMatches,
    }),
  setFilters: (key, value, job) => {
    const stateFilters = get().filters;
    let stateFilteredMatches = get().matches;

    const newFilters = {
      ...stateFilters,
      [key]: value,
    };

    if (key === 'job' && !isEmpty(job)) {
      stateFilteredMatches = isEmpty(job);
      return set({ filters: newFilters, filteredMatches: [job] });
    }

    if (!isEmpty(newFilters.companies)) {
      stateFilteredMatches = stateFilteredMatches.filter((match) => newFilters.companies.includes(match.companyName));
    }

    stateFilteredMatches = stateFilteredMatches.filter((match) => match.fit >= newFilters.matchFit / 100);
    stateFilteredMatches = stateFilteredMatches.filter((match) =>
      newFilters?.sort === 'all' ? !!match?.status : match?.status === newFilters?.sort
    );

    return set({ filters: newFilters, filteredMatches: stateFilteredMatches });
  },
  resetFilters: () => set((state) => ({ filters: matchingHubInitialState.filters, filteredMatches: state.matches })),
  reset: () => set(matchingHubInitialState),
}));

export const useMatchingHubData = () =>
  useMatchingHubStore((state) => ({
    matches: state.matches,
    filteredMatches: state.filteredMatches,
    filters: state.filters,
  }));

export const useMatchingHubActions = () =>
  useMatchingHubStore((state) => ({
    setMatchingHub: state.setMatchingHub,
    setMatches: state.setMatches,
    setFilters: state.setFilters,
    setFilteredMatches: state.setFilteredMatches,
    resetFilters: state.resetFilters,
    reset: state.reset,
  }));
