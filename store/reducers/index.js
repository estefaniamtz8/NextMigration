import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loaderReducer from './loader_reducers';
import authReducer from './auth_reducers';
import JobsReducers from './jobs_reducers';
import CompaniesReducers from './companies_reducer';
import UsersReducers from './users_reducer';
import VacanciesReducers from './vacancy_reducer';
import FiltersReducer from "./filters_reducer";
import Admins from "./admins_reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      loader: loaderReducer,
      jobs: JobsReducers,
      companies: CompaniesReducers,
      users: UsersReducers,
      vacancies: VacanciesReducers,
      filters: FiltersReducer,
      admins: Admins
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
