/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

import { getCountryPath, getLastItemInPath } from 'utils/helpers';
import { home, destination } from 'router/routes';
import Preview from 'components/Preview/Preview';
import styles from './styles.module.scss';

const Articles = ({ articles, redirectFrom }) => {
  const history = useHistory();

  const getPathByRedirectUrl = {
    [home.path]: category => `${destination.path}/${getCountryPath(category)}`,
  };

  const handleArticleClick = (category, id) => {
    if (category && id) {
      const path = redirectFrom
        ? getPathByRedirectUrl[redirectFrom](category)
        : history.location.pathname;
      history.push(`${path}/${id}`);
    }
  };

  const handleCountryClick = category => {
    if (!redirectFrom || !category) {
      return;
    }
    history.push(getPathByRedirectUrl[redirectFrom](category));
  };

  if (!articles) {
    return null;
  }
  return (
    <div className={styles.articles}>
      {articles.map(article => (
        <Preview
          key={article?.id}
          handleItemClick={() =>
            handleArticleClick(
              article?.elements?.countryOfTravelArticle?.categories?.[0],
              article?.id
            )
          }
          image={article?.elements?.travelArticleImage?.renditions?.card}
          title={article?.elements?.travelArticleTitle?.value}
          info={getLastItemInPath(
            article?.elements?.countryOfTravelArticle?.categories?.[0]
          )}
          handleInfoCLick={() =>
            handleCountryClick(
              article?.elements?.countryOfTravelArticle?.categories?.[0]
            )
          }
          author={article?.elements?.articleAuthor?.value}
          date={article?.lastModified}
        />
      ))}
    </div>
  );
};

export default Articles;
