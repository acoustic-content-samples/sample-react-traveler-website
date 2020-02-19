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
import { useHistory, useRouteMatch } from 'react-router-dom';

import { elementsSelector } from 'utils/helpers';
import { useSearch } from 'utils/hooks';
import { types } from 'api/content';
import ImageWithCaption from 'components/ImageWithCaption/ImageWithCaption';
import styles from './styles.module.scss';

const CountryPreview = ({ countryName }) => {
  const elements = useSearch(
    {
      rows: 1000,
      fq: [`type:(${types.country})`, `categoryLeaves:(${countryName})`],
      fl: 'document:[json]',
    },
    elementsSelector
  );

  const history = useHistory();
  const { url } = useRouteMatch();

  const handleClick = () => {
    history.push(`${url}/${countryName}`);
  };

  const handleEnterKeyDown = method => event => {
    if (event.key === 'Enter') {
      method();
    }
  };

  return (
    elements && (
      <div className={styles.countryPreviewContainer}>
        <div
          className={styles.country}
          onClick={handleClick}
          tabIndex="0"
          onKeyDown={handleEnterKeyDown(handleClick)}
        >
          <ImageWithCaption
            image={elements.countryImage?.renditions?.destinationsCard}
            caption={{
              className: styles.imageCaption,
              value: elements.countryTitle?.value,
            }}
          />
        </div>
      </div>
    )
  );
};

export default CountryPreview;
