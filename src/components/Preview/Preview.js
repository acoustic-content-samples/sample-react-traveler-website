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

import { renderImageRendition, formatDate } from 'utils/helpers';
import styles from './styles.module.scss';

const Preview = ({
  handleItemClick = () => {},
  image,
  title,
  info,
  handleInfoCLick = () => {},
  author,
  date,
}) => {
  const handleEnterKeyDown = method => event => {
    if (event.key === 'Enter') {
      method();
    }
  };
  return (
    <div className={styles.preview}>
      <div
        onClick={handleItemClick}
        tabIndex="0"
        onKeyDown={handleEnterKeyDown(handleItemClick)}
      >
        {image && renderImageRendition(image)}
      </div>
      <div>
        <strong
          onClick={handleItemClick}
          tabIndex="0"
          onKeyDown={handleEnterKeyDown(handleItemClick)}
        >
          {title}
        </strong>
        {info && (
          <span
            className={styles.info}
            onClick={handleInfoCLick}
            tabIndex="0"
            onKeyDown={handleEnterKeyDown(handleInfoCLick)}
          >
            {info}
          </span>
        )}
        {(author || date) && (
          <span className={styles.details}>
            {author} {formatDate(date)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Preview;
