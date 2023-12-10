import { TApiSearchTonality } from "./api"

export interface IUserData {
    usedCompanyCount: number,
    companyLimit: number
}

export interface IUserAuthData {
    userLogin: string,
    token: string,
    tokenExpireDate: string,
}

export interface ISearchRequest {
    taxPayerID: number,
    tonality: TApiSearchTonality,
    documentsMaxNumber: number,
    dateStart: string,
    dateEnd: string,
    maximumCompleteness: boolean,
    businessContextMentions: boolean,
    mainRoleInPublications: boolean,
    publicationsWithRiskFactorOnly: boolean,
    includeTechnicalMarketNews: boolean,
    includeAnnouncementsAndCalendars: boolean,
    includeNewsReports: boolean
}

export interface IStorageSlice {
    isLoggedIn: boolean,
    userAuthData: IUserAuthData | null,
    userData: IUserData | null,
    inMobile: boolean,
    searchRequest: ISearchRequest | null
}

export interface ICarousel {
    items: {
        description: string,
        descriptionWidth: number,
        iconPath: string,
        iconAlt: string
    }[]
}

export interface ISearchResultReportTableRow {
    date: string,
    total: number,
    risks: number
}

export interface ISearchResultReportTable {
    rows: ISearchResultReportTableRow[]
    isLoaded: boolean
}

export interface IRateCard {
    id: number,
    headerHasWhiteText: boolean,
    isCurrentRate: boolean,
    name: string,
    nameShortInfo: string,
    postfix: string,
    iconAlt: string,
    priceNow: string,
    priceFull: string,
    priceOption: string | null,
    includes: string[],
    hasOrangeBorder: boolean,
    onClick: () => void,
}

export interface IInputWithLabel {
    id?: number,
    label: string,
    inputType: string,
    hasError: boolean,
    error: string,
    inputText: string,
    postfix: string,
    showThatMandatory: boolean,
    marginTop?: number,
    placeholder?: string,
    onChange: (value: string) => void
}

export interface ICheckboxWithLabel {
    id: number,
    label: string,
    isChecked: boolean,
    onChange: (value: boolean) => void
}

export interface IDropdownWithLabelOption {
    value: string;
    title: string;
}

export interface IDropdownWithLabel {
    id: number,
    label: string,
    options: IDropdownWithLabelOption[],
    onChange: (value: string) => void
}

export interface IDateRange {
    id: number,
    label: string,
    hasError: boolean,
    error: string,
    showThatMandatory: boolean,
    startDateText: string,
    endDateText: string,
    onStartDateChanged: (value: string) => void
    onEndDateChanged: (value: string) => void
}