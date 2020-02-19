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

import { renderImageRendition, renderFormattedText } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';
import { pagesIds } from 'api/content';
import styles from './styles.module.scss';

const About = () => {
  const elements = useFetchElements(pagesIds.about);

  return (
    elements && (
      <div className={styles.about}>
        <h1>{elements?.pageTitle?.value}</h1>
        {renderImageRendition(elements?.aboutPageImage?.renditions?.default)}
        {renderFormattedText(elements?.aboutPageText?.value)}
      </div>
    )
  );
};

export default About;
