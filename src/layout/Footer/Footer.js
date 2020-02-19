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

import styles from './styles.module.scss';
import { renderImageRendition } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';

const Footer = () => {
  const elements = useFetchElements('8137afca-4281-4a19-9501-2360bc028cbf');
  const socialMedia = elements?.socialMedia?.values ?? [];

  return (
    elements && (
      <footer className={styles.footer}>
        <div className="copyright">
          <span>{elements?.copyrighttext?.value}</span>
        </div>
        <div className={styles.socialMedia}>
          {socialMedia.map((media, index) => (
            <a
              href={media?.socialMediaLink?.linkURL}
              title={media?.socialMediaLink?.linkText}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              {renderImageRendition(
                media?.socialMediaIcon?.renditions?.default
              )}
            </a>
          ))}
        </div>
      </footer>
    )
  );
};

export default Footer;
