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

import { renderFormattedText } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';
import Slider from './Slider/Slider';
import ArticlePreview from './ArticlePreview/ArticlePreview';
import styles from './styles.module.scss';

const Home = () => {
  const elements = useFetchElements('8b21b33d-f217-45a7-851c-a9c050228674');

  const showSlider = elements?.imageSliderSettings?.value;
  const showPreview = elements?.articlePreviewsSettings?.value;
  const showText = elements?.missionStatementText?.value;

  return (
    elements && (
      <>
        {showSlider && (
          <Slider
            title={elements.websiteTitle?.value}
            settings={elements.imageSliderSettings?.value}
          />
        )}
        {showText && (
          <div className={styles.caption}>
            {renderFormattedText(elements?.missionStatementText?.value)}
          </div>
        )}
        {showPreview && (
          <div className={styles.articlePreview}>
            <ArticlePreview
              settings={elements?.articlePreviewsSettings?.value}
            />
          </div>
        )}
      </>
    )
  );
};

export default Home;
