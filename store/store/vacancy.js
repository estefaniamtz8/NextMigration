import { create } from "zustand"

export const vacancyInitialState = {
  companyID: '',
  basicInfo: {},
  extras: {},
  documents: {},
}

const useVacancyStore = create((set) => ({
  ...vacancyInitialState,
  setVacancy: (vacancy) =>
    set({
      ...vacancy,
    }),
  setBasicInfo: (data) =>
    set({
      basicInfo: data,
    }),
  setExtras: (data) =>
    set({
      extras: data,
    }),
  setDocuments: (data) =>
    set({
      documents: data,
    }),
  reset: () =>
    set({
      basicInfo: {},
      extras: {},
      documents: {},
    }),
}))

export const useVacancyData = () =>
  useVacancyStore((state) => ({
    companyID: state.companyID,
    basicInfo: state.basicInfo,
    extras: state.extras,
    documents: state.documents,
  }))

export const useVacancyActions = () =>
  useVacancyStore((state) => ({
    setVacancy: state.setVacancy,
    setBasicInfo: state.setBasicInfo,
    setExtras: state.setExtras,
    setDocuments: state.setDocuments,
    reset: state.reset,
  }))
