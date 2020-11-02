import { Action, createReducer, on } from '@ngrx/store'

import { SearchActions } from '../actions/search.actions'
import { ICurrentWeather } from '../interfaces'
import { defaultWeather } from '../weather.service'

// interface for state date of this reducer
export interface State {
  current: ICurrentWeather // ICurrentWeather is a type like string or number in genral case
}

// define initialState from type State wiche i created as interface has property called current from type ICurrentWeather
// the initail state of this reducer of type from the intrface of this reducer state
export const initialState: State = {
  current: defaultWeather, // defaultWeather is a value the  initial value current weather
}

// search reducer is function take(initialState and action is parameters)
// the action of type Action from ngrx wiche has action.type and action.payload
const searchReducer = createReducer(
initialState,
  on(SearchActions.weatherLoaded, (state, action) => {
    return {
      ...state,
      current: action.current,
    }
  })
)

// export a fuction to access this searchReducer and register it in store
export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action)
}