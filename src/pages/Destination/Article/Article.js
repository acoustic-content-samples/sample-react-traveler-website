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

import {
  renderImageRendition,
  renderFormattedText,
  formatDate,
} from 'utils/helpers';
import GoBack from 'components/GoBack/GoBack';
import { useFetchContent } from 'utils/hooks';
import styles from './styles.module.scss';

const Article = () => {
  const { articleId } = useParams();
  const content = useFetchContent(articleId);

  if (!content) {
    return null;
  }

  const { elements, lastModified } = content;
  return (
    elements && (
      <div className={styles.article}>
        <GoBack className={styles.goBack} />
        <div className={styles.header}>
          <h1>{elements.travelArticleTitle?.value}</h1>
          <div className={styles.details}>
            <span>{elements.articleAuthor?.value}</span>
            <span>{formatDate(lastModified)}</span>
          </div>
        </div>
        <section>
          {renderImageRendition(
            elements.travelArticleImage?.renditions?.default
          )}
          {elements.travelArticleText &&
            renderFormattedText(
              elements.travelArticleText.value,
              styles.articleContent
            )}
        </section>
      </div>
    )
  );
};

export default Article;
