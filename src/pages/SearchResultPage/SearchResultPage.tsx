import './style.css';
import SearchResultReportTable from '../../components/SearchResultReportTable/SearchResultReportTable';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import DocumentDisplay from '../../components/DocumentDisplay/DocumentDisplay';
import { useEffect, useState } from 'react';
import { API_PATH, IApiDocumentOK, IApiSearch, TApiSearchTonality, isUserAuthDataValid } from '../../api';
import axios from 'axios';
import { setIsLoggedIn, setUserAuthData } from '../../store/storageSlice';
import { ISearchResultReportTable } from '../../interfaces';

function SearchResultPage() {
    const dispatch = useDispatch();
    const userAuthData = useSelector((state: RootState) => state.userAuthData);
    const searchRequest = useSelector((state: RootState) => state.searchRequest);

    const [documentIDs, setDocumentIDs] = useState<string[]>([]);
    const lazyLoadNumber = 10;
    const [currentPositionInDocuments, setCurrentPositionInDocuments] 
        = useState<number>(0);
    const [documentsData, setDocumentsData] 
        = useState<IApiDocumentOK[]>([]);
    const [reportTableData, setReportTableData] 
        = useState<ISearchResultReportTable>({rows: [], isLoaded: false});
    const [reportsTotal, setReportsTotal] 
        = useState<number>(-1);

    const parseHistogramResult = (response: any) => {
        if (response.data.data.length === 0) {
            setReportTableData({rows: [], isLoaded: true});
            return;
        }
        const dataTotal = response.data.data[0].data;
        const dataRisks = response.data.data[1].data;

        const reportTableData: ISearchResultReportTable = {
            rows: [],
            isLoaded: true
        };
        let reportsAll = 0;
        dataTotal.forEach((item: any, index: number) => {
            reportsAll += item.value;
            reportTableData.rows.push({
                date: item.date,
                total: item.value,
                risks: dataRisks[index].value
            });
        });
        reportTableData.rows.sort(function(a,b){
            return (+new Date(b.date)) - (+new Date(a.date));
        });
        setReportsTotal(reportsAll);
        setReportTableData(reportTableData);
    };

    const parseDocumentsResult = (response: any) => {
        if (!response.data || !response.data.items.length) {
            setDocumentIDs([]);
            return;
        }
        setDocumentIDs(response.data.items.map(
            (item: any) => item.encodedId));
    };
    
    const searchHistogramsAndDocuments = async () => {
        //const searchRequest = {"taxPayerID":7710137066,"tonality":"any","documentsMaxNumber":100,"dateStart":"2022-12-08T00:00:00.000Z","dateEnd":"2023-12-09T00:00:00.000Z","maximumCompleteness":true,"businessContextMentions":true,"mainRoleInPublications":false,"publicationsWithRiskFactorOnly":false,"includeTechnicalMarketNews":false,"includeAnnouncementsAndCalendars":false,"includeNewsReports":false};
        
        if (!searchRequest)
            return;
        if (!isUserAuthDataValid(userAuthData)) {
            dispatch(setUserAuthData(null));
            dispatch(setIsLoggedIn(false));
            return;
        }

        const searchBody: IApiSearch = {
            intervalType: 'month',
            histogramTypes: [
                'totalDocuments', 
                'riskFactors'
            ],
            issueDateInterval: {
                startDate: searchRequest.dateStart,
                endDate: searchRequest.dateEnd
            },

            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: 'company',
                            sparkId: null,
                            entityId: null,
                            inn: searchRequest.taxPayerID,
                            maxFullness: searchRequest.maximumCompleteness,
                            inBusinessNews: searchRequest.businessContextMentions,
                        }
                    ],
                    onlyMainRole: searchRequest.mainRoleInPublications,
                    tonality: searchRequest.tonality as TApiSearchTonality,
                    onlyWithRiskFactors: searchRequest.publicationsWithRiskFactorOnly,
                    riskFactors: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themes: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                themesFilter: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            searchArea: {
                includedSources: [],
                excludedSources: [],
                includedSourceGroups: [],
                excludedSourceGroups: []
            },
            attributeFilters: {
                excludeAnnouncements: !searchRequest.includeAnnouncementsAndCalendars,
                excludeDigests: !searchRequest.includeNewsReports,
                excludeTechNews: !searchRequest.includeTechnicalMarketNews
            },
            similarMode: 'duplicates',
            limit: searchRequest.documentsMaxNumber,
            sortType: 'sourceInfluence',
            sortDirectionType: 'desc',
        };

        axios.post(API_PATH + 'objectsearch/histograms', searchBody, {
            headers: {
                Authorization: `Bearer ${userAuthData!.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }).then((response: any) => {
            parseHistogramResult(response);
        }).catch((error) => {
            console.error('ERROR:'  + error);
        });
            
        axios.post(API_PATH + 'objectsearch', searchBody, {
            headers: {
                Authorization: `Bearer ${userAuthData!.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }).then((response: any) => {
            parseDocumentsResult(response);
        }).catch((error) => {
            console.error('ERROR:'  + error);
        });        
    }

    const addDocuments = (): JSX.Element[] => {
        if (!documentsData.length)
            return [<></>];
        return (documentsData.map(document => {
            return (
                <DocumentDisplay 
                    {...document}
                />
            );
        }));
    }

    useEffect(() => {
        searchHistogramsAndDocuments();
    }, []);

    useEffect(() => {
        if (!documentIDs.length)
            return;
        loadMore(false);
    }, [documentIDs]);

    const loadDocuments = (ids: string[], append: boolean) => {
        axios.post(API_PATH + 'documents', {
            ids: ids
        }, {
            headers: {
                Authorization: `Bearer ${userAuthData!.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }).then((response: any) => {
            const validResultsRaw = response.data.filter(
                (documentResult: any) => documentResult.ok !== undefined);
            const validResults: IApiDocumentOK[] = validResultsRaw.map((okItem: any) => {
                return okItem.ok as IApiDocumentOK;
            });
            if (append)
                setDocumentsData(prev => [...prev, ...validResults]);
            else
                setDocumentsData(validResults);
        }).catch((error) => {
            console.error('ERROR:'  + error);
        });
    }

    const loadMore = (append: boolean) => {
        if (currentPositionInDocuments >= documentIDs.length)
            return;
        const maxNumber = Math.min(currentPositionInDocuments + lazyLoadNumber, 
            documentIDs.length);
        const idsToLoadData = documentIDs.slice(
            currentPositionInDocuments, maxNumber);
        loadDocuments(idsToLoadData, append);
        setCurrentPositionInDocuments(maxNumber);
    }

    return (
        <main className='search-result-page'>
            <section className='search-result-title'>
                <div className='search-result-title-wrapper'>
                    <h1 className='text_title search-result-title-wrapper__title'>
                        Ищем. Скоро<br />
                        будут результаты
                    </h1>
                    <p className='text search-result-title-wrapper__description'>
                        Поиск может занять некоторое время,<br />
                        просим сохранять терпение.
                    </p>
                </div>
                <img 
                    className='search-result-title__image'
                    src='/images/search-result-title-image.svg'
                    alt='Woman with lens and target'
                />
            </section>
            <section className='search-result-report'>
                <h2 className='text_title search-result-report__title'>
                    Общая сводка
                </h2>
                <p className='text search-result-report__found-count'
                    style={{visibility: reportsTotal === -1 
                        ? 'hidden' : 'visible'}}
                >
                    Найдено {reportsTotal} вариантов
                </p>
                <SearchResultReportTable 
                    {...reportTableData}
                />
            </section>
            <section className='search-result-documents'>
                <h2 className='text_title search-result-report__title'>
                    Список документов
                </h2>
                <div className='result-documents'>
                    {addDocuments()}
                </div>
                <button className='text button button-dark search-result-documents__show-more'
                    style={{display: (currentPositionInDocuments >= documentIDs.length 
                        || documentIDs.length === 0)
                        ? 'none' : 'initial'}}
                    onClick={() => loadMore(true)}
                >
                    Показать больше
                </button>
            </section>
        </main>
    );
}

export default SearchResultPage;