import { createAction, props, union } from '@ngrx/store';
import {ICurrentWeather} from '../interfaces';

export const SearchActions ={ 
    //createAction need (type:action name , payload: props data)
    //you can define a class with constructor for payload and property for actipn type as other optional way
    search:createAction('[Search] Search',props<{searchText:string;country?:string}>()),
    weatherLoaded:createAction('[Search] CurrentWether Loaded',props<{current:ICurrentWeather}>())
}

const all = union(SearchActions)
export type SearchActions = typeof all




