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
import { useParams } from 'react-router-dom';

import { elementsSelector, documentsSelector } from 'utils/helpers';
import { useSearch } from 'utils/hooks';
import Articles from 'components/Articles/Articles';
import { types } from 'api/content';
import GoBack from 'components/GoBack/GoBack';
import ImageWithCaption from 'components/ImageWithCaption/ImageWithCaption';
import styles from './styles.module.scss';

const Country = () => {
  const { country } = useParams();

  const countryElements = useSearch(
    {
      rows: 1000,
      fq: [`type:(${types.country})`, `categoryLeaves:(${country})`],
      fl: 'document:[json]',
    },
    elementsSelector
  );

  const articles = useSearch(
    {
      rows: 1000,
      fq: [`type:(${types.article})`, `categoryLeaves:(${country})`],
      fl: 'document:[json]',
    },
    documentsSelector
  );

  return (
    countryElements && (
      <div className={styles.country}>
        <GoBack />
        <div className={styles.header}>
          <ImageWithCaption
            image={countryElements.countryImage?.renditions?.countryCard}
            caption={{
              className: styles.imageCaption,
              value: countryElements.countryTitle?.value,
            }}
          />
        </div>
        {articles && <Articles articles={articles} onArticleClick={() => {}} />}
      </div>
    )
  );
};

export default Country;
