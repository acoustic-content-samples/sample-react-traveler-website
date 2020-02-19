/*
* Copyright 2020 Acoustic, L.P.
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
* specific language governing permissions and limitations under the License.
*/

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';

import { search } from 'router/routes';
import API from 'api/api';
import { searchKeys, types } from 'api/content';
import ClearIcon from 'assets/images/ic-clear.svg';
import styles from './styles.module.scss';
import { titleCase } from 'utils/helpers';

const SearchBar = ({ handleSearchClose }) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [facetResutls, setFacetResutls] = useState(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (query.length > 1) {
      setShowHints(true);
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        API.searchFacet(query).then(facets => {
          setFacetResutls(facets);
        });
      }, 200);
      return;
    }
    setShowHints(false);
  }, [query]);

  const handleKeyPress = event => {
    if (event.key === 'Enter' && query.length) {
      startSearch();
    }
  };

  const startSearch = (
    params,
    type = `(${types.article}) OR (${types.galleryImage})`
  ) => {
    setShowHints(false);
    handleSearchClose();
    const nextLocationState = params ? { ...params, type } : { query, type };

    if (!isOnSearchPage()) {
      history.push({
        pathname: search.path,
        search: new URLSearchParams(nextLocationState).toString(),
      });
      return;
    }
    history.replace({
      pathname: search.path,
      search: new URLSearchParams(nextLocationState).toString(),
    });
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const isOnSearchPage = () => history.location.pathname === search.path;

  const handleClose = () => {
    setShowHints(false);
    handleSearchClose();

    if (isOnSearchPage()) {
      history.goBack();
    }
  };

  const handleKeyDown = method => event => {
    if (event.key === 'Enter') {
      method();
    }
  };

  const isFound = key => facetResutls && facetResutls.facets[key].length;

  const getTitles = key =>
    facetResutls.facets[key].filter(title => typeof title === 'string');

  const renderFacetResults = (searchKey, label) =>
    isFound(searchKey) ? (
      <div>
        <div>{label}</div>
        <div>
          {getTitles(searchKey).map(title => (
            <div
              key={title}
              onClick={() => startSearch({ query: title, searchKey }, label)}
              tabIndex="0"
              onKeyDown={handleKeyDown(() =>
                startSearch({ query: title, searchKey }, label)
              )}
            >
              <strong>{titleCase(title)}</strong>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          autoFocus={true}
          className={styles.searchInput}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          value={query}
        />
        <img
          className={styles.searchCloseIcon}
          src={ClearIcon}
          alt="clear icon"
          onClick={handleClose}
          tabIndex="0"
          onKeyDown={handleKeyDown(handleClose)}
        />
      </div>
      {showHints && (
        <div className={styles.searchHints}>
          <div>
            <div>Search all text for</div>
            <div>
              <div
                onClick={() => startSearch()}
                tabIndex="0"
                onKeyDown={handleKeyDown(() => startSearch)}
              >
                <strong>{query}</strong>
              </div>
            </div>
          </div>
          {renderFacetResults(searchKeys.articleTitle, types.article)}
          {renderFacetResults(searchKeys.galleryImageTitle, types.galleryImage)}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
