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
import { useRouteMatch } from 'react-router-dom';

import Articles from 'components/Articles/Articles';
import { sortMapper, documentsSelector } from 'utils/helpers';
import { useSearch } from 'utils/hooks';

const ArticlePreview = ({ settings }) => {
  const documents = useSearch(
    {
      sort: sortMapper(settings.ArticleDisplayOrder.value.selection),
      rows: settings.numberOfListItems.value,
      fq: `type:(${settings.contentTypeToDisplay.value.selection})`,
      fl: 'document:[json]',
    },
    documentsSelector
  );

  const { url } = useRouteMatch();

  return documents && <Articles articles={documents} redirectFrom={url} />;
};

export default ArticlePreview;
