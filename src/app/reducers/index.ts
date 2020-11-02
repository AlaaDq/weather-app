  
import { ActionReducer, ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store'

// import { environment } from '../../environments/environment'
import * as fromSearch from './search.reducer'


// the store intrface all reducers interface data register here
export interface State {
  search: fromSearch.State
}

// register the search reducer in index.ts
// reducers is form type ActionReducerMap which is used with 
// the  StoreModule.forRoot() 
// so i need to define it and export and register my reducers in it
// to call it in app.module
export const reducers: ActionReducerMap<State> = {
  // register here all reducers u have
  search: fromSearch.reducer, // fromSearch.reducer is the searchreducer function
}


//reusable selector to call it in component and access current weather form state dirctley 
export const selectCurrentWeather = createSelector(
  (state: State) => state.search.current,
  (current) => current
)

// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//   return (state, action) => {
//     const result = reducer(state, action)
//     console.groupCollapsed(action.type)
//     console.log('prev state', state)
//     console.log('action', action)
//     console.log('next state', result)
//     console.groupEnd()

//     return result
//   }
// }

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : []