import './style.css';
import { IApiDocumentOK } from '../../api';
import { dateFormatDDMMYYYY, removeMarkup } from '../../utils';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

function DocumentDisplay(documentProps: IApiDocumentOK) {
    const inMobile = useSelector((state: RootState) => state.inMobile);

    return (
        <div className='document'
            key={documentProps.id}
        >
            <div className='document-info'>
                <p className='text document-info__date'>
                    {dateFormatDDMMYYYY(documentProps.issueDate)}
                </p>
                <a className='text document-info__date document-info__link'
                    href={documentProps.url}
                >
                    {documentProps.source.name}
                </a>
            </div>
            <h3 className='text document__title'>
                {documentProps.title.text}
            </h3>
            <div className='text document-tags'>
                <div className='document-tag'
                    style={{display : documentProps.attributes.isTechNews 
                        ? 'flex' : 'none'}}
                >
                    <p className='document-tag__name'>
                        Технические новости
                    </p>
                </div>
                <div className='document-tag'
                    style={{display : documentProps.attributes.isAnnouncement 
                        ? 'flex' : 'none'}}
                >
                    <p className='document-tag__name'>
                        Анонсы и события
                    </p>
                </div>
                <div className='document-tag'
                    style={{display : documentProps.attributes.isDigest 
                        ? 'flex' : 'none'}}
                >
                    <p className='document-tag__name'>
                        Сводки новостей
                    </p>
                </div>
            </div>
            <img className='document__preview'
                src= {inMobile ? '/images/search-result-image-dummy-mobile.svg'
                        : '/images/search-results-image-dummy.svg'}
                alt='preview'
            />
            <p className='text document__text'>
                {removeMarkup(documentProps.content.markup)}
            </p>
            <div className='document-footer'>
                <button className='text button button-light document-footer__read'
                    onClick={() => {
                        window.location.href = documentProps.url; 
                    }}
                >
                    Читать в источнике
                </button>
                <p className='text document-footer__word-count'>
                    {documentProps.attributes.wordCount} слова
                </p>
            </div>
        </div> 
    );
}

export default DocumentDisplay;