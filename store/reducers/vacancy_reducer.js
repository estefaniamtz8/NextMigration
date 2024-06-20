import {vacancyTypes} from "../actions/vacancy_actions";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case vacancyTypes.SET_VACANCY:
            return {
                ...state,
                vacancies: action.payload
            };
        default:
            return state;
    }
}
