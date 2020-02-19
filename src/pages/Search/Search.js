/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { search, getLastItemInPath, getCountryPath } from 'utils/helpers';
import { types } from 'api/content';
import { destination, gallery } from 'router/routes';
import styles from './styles.module.scss';
import Preview from 'components/Preview/Preview';

const Search = () => {
  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const searchKey = searchParams.get('searchKey');
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  const [results, setResults] = useState(null);
  const [exactQuery, setExactQuery] = useState(null);

  const replaceSymbols = text =>
    text.replace(/[^\w\s]/gi, match => `\\${match}`);

  useEffect(() => {
    const params = searchKey
      ? {
          fq: `${searchKey}:(${replaceSymbols(query)})`,
          rows: 1,
        }
      : {
          q: `text:(*${replaceSymbols(query)}*)`,
          rows: 1000,
        };
    search({
      fq: `type:(${type})`,
      fl: 'document:[json]',
      ...params,
    }).then(res => {
      if (!res) {
        setResults({ numFound: 0 });
        return;
      }
      if (res.numFound === 1) {
        const el = res.documents[0].document.elements;
        const title = el.travelArticleTitle || el.ImageTitle;
        setExactQuery(title.value);
      } else {
        setExactQuery(null);
      }
      setResults(res);
    });
  }, [query, type, searchKey]);

  if (!results) {
    return null;
  }

  const onArticleClick = (countryPath, id) => {
    history.push(`${destination.path}/${countryPath}/${id}`);
  };

  const onCountryClick = countryPath => {
    history.push(`${destination.path}/${countryPath}`);
  };

  const onImageClick = galleryImageId => {
    history.push({
      pathname: gallery.path,
      search: new URLSearchParams({ galleryImageId }).toString(),
    });
  };

  const getCountryInfo = category => {
    const country = getLastItemInPath(category);
    const countryPath = getCountryPath(category);
    return [country, countryPath];
  };

  const renderContentByType = {
    [types.article]: ({ elements, id, lastModified }) => {
      const [country, countryPath] = getCountryInfo(
        elements?.countryOfTravelArticle?.categories?.[0]
      );
      return (
        <Preview
          key={id}
          handleItemClick={() => onArticleClick(countryPath, id)}
          image={elements?.travelArticleImage?.renditions?.card}
          title={elements?.travelArticleTitle?.value}
          info={country}
          handleInfoCLick={() => onCountryClick(countryPath)}
          author={elements?.articleAuthor?.value}
          date={lastModified}
        />
      );
    },
    [types.galleryImage]: ({ elements, id, lastModified }) => {
      const [country, countryPath] = getCountryInfo(
        elements?.imageCountryValue?.categories?.[0]
      );
      return (
        <Preview
          key={id}
          handleItemClick={() => onImageClick(id)}
          image={elements?.galleryImage?.renditions?.squareCard}
          title={elements?.ImageTitle?.value}
          info={country}
          handleInfoCLick={() => onCountryClick(countryPath)}
          date={lastModified}
        />
      );
    },
  };

  return (
    <section className={styles.search}>
      {results.numFound ? (
        <div className={styles.results}>
          <p>
            {results.numFound} search result{results.numFound === 1 ? '' : 's'}{' '}
            for <strong>"{exactQuery || query}"</strong>
          </p>
          <div>
            {results.documents.map(({ document }) => {
              if (!renderContentByType[document.type]) {
                return null;
              }
              return renderContentByType[document.type](document);
            })}
          </div>
        </div>
      ) : (
        <p className={styles.noResults}>
          Searching for <strong>"{query}"</strong> doesn't return any good
          matches. Try your search again with a different term
        </p>
      )}
    </section>
  );
};

export default Search;
