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

import { renderFormattedText, renderImageRendition } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';
import { pagesIds } from 'api/content';
import styles from './styles.module.scss';

const Contact = () => {
  const elements = useFetchElements(pagesIds.contact);
  const contactOptions = elements?.contactOptions?.values ?? [];

  return (
    elements && (
      <div className={styles.contact}>
        <h1>{elements.contactInformationTitle?.value}</h1>
        {renderImageRendition(elements.contactPageImage?.renditions?.default)}
        {contactOptions.map((option, index) => (
          <div key={index} className={styles.contactItem}>
            <strong>{option?.contactOptionName?.value}</strong>
            {renderFormattedText(option?.contactOptionValue?.value)}
          </div>
        ))}
      </div>
    )
  );
};

export default Contact;
