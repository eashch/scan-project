import { IUserAuthData } from './interfaces';

export const API_PATH = 'https://gateway.scan-interfax.ru/api/v1/';


export const isUserAuthDataValid = (userAuthData: IUserAuthData | null): boolean => {
    if (!userAuthData)
        return false;
    const dateNow = new Date();
    const dateExpire = new Date(userAuthData.tokenExpireDate);
    return userAuthData !== null
        && userAuthData.token !== '' 
        && (dateExpire > dateNow);
};

export type TApiSearchHistogramTypes = 'totalDocuments' | 'riskFactors';
export type TApiSearchIntervalType = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type TApiSearchTonality = 'any' | 'negative' | 'posivite';
export type TApiSearchCompany = 'company' | 'suggestedPersons';

export interface IApiSearchIssueDateInterval {
    startDate: string,
    endDate: string
}

export interface IApiSearchRiskFactor {
    id: number
}

export interface IApiSearchRiskTheme {
    tonality: TApiSearchTonality,
    entityId: number
}

export interface IApiSearchFilter<T> { 
    and: T[],
    or: T[],
    not: T[]
}

export interface IApiSearchFilterDummy { 
    and: [],
    or: [],
    not: []
}

export interface IApiSearchTargetSearchEntity {
    type: TApiSearchCompany,
    inBusinessNews: boolean | null,
    sparkId: null,
    entityId: null,
    inn: number,
    maxFullness: boolean
}

export interface IApiSearchTargetSearchEntitiesContext {
    targetSearchEntities: IApiSearchTargetSearchEntity[],
    onlyMainRole: boolean,
    tonality: TApiSearchTonality,
    onlyWithRiskFactors: boolean,
    riskFactors: IApiSearchFilter<IApiSearchRiskFactor>,
    themes: IApiSearchFilterDummy
}

export interface IApiSearchContext {
    targetSearchEntitiesContext: IApiSearchTargetSearchEntitiesContext,
    searchEntitiesFilter?: IApiSearchFilterDummy,
    locationsFilter?: IApiSearchFilterDummy,
    themesFilter: IApiSearchFilterDummy
}

export interface IApiSearchArea {
    includedSources: [],
    excludedSources: [],
    includedSourceGroups: [],
    excludedSourceGroups: []
}

export interface IApiSearchAttributeFilter {
    excludeTechNews: boolean,
    excludeAnnouncements: boolean,
    excludeDigests: boolean
}

export type TApiSearchSimilarMode = 'none' | 'duplicates';


export interface IApiSearch {
    intervalType: TApiSearchIntervalType,
    histogramTypes: TApiSearchHistogramTypes[],
    issueDateInterval: IApiSearchIssueDateInterval,
    searchContext: IApiSearchContext,
    searchArea: IApiSearchArea,
    attributeFilters: IApiSearchAttributeFilter,
    similarMode: TApiSearchSimilarMode,
    limit: number,
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
};

export interface IApiDocumentOK {
    id: string,
    issueDate: string,
    url: string,
    source: {
        name: string
    },
    title: {
        text: string
    },
    content: {
        markup: string
    },
    attributes: {
        isTechNews: false,
        isAnnouncement: false,
        isDigest: false,
        wordCount: 99
    }
}