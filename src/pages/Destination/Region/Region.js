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

import { firstDocumentSelector, getLastItemInPath } from 'utils/helpers';
import { useSearch } from 'utils/hooks';
import CountryPreview from '../CountryPreview/CountryPreview';
import { types } from 'api/content';
import styles from './styles.module.scss';

const Region = () => {
  const { region } = useParams();
  const regionDocument = useSearch(
    {
      fq: [`type:(${types.region})`, `name:(${region})`],
      fl: 'categories',
    },
    firstDocumentSelector
  );

  if (!regionDocument?.categories?.length) {
    return null;
  }
  return (
    <div className={styles.region}>
      {regionDocument.categories.map(countryPath => {
        const countryName = getLastItemInPath(countryPath);
        return <CountryPreview countryName={countryName} key={countryName} />;
      })}
    </div>
  );
};

export default Region;
