/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { BASE_RENDER_URL, BASE_DELIVERY_URL } from './endpoints';
import { types, searchKeys } from './content';

const checkStatus = response => {
  if (response.ok) {
    return response;
  }

  throw Error(response.statusText);
};

const parseJSON = response => response.json();

export const handleError = error => {
  console.error('Request failed: ', error);
};

const fetcher = {
  get: (path, params) =>
    fetch(path, params)
      .then(checkStatus)
      .then(parseJSON)
      .catch(e => {
        console.error(e);
      }),
};

const getContentById = id => fetcher.get(`${BASE_RENDER_URL}/${id}`);

const search = query => fetcher.get(`${BASE_DELIVERY_URL}/search?${query}`);

const searchDocument = query => search(`&fl=document:[json]${query}`);

const searchFacet = text =>
  fetcher.get(
    `${BASE_DELIVERY_URL}/search?
q=text:${text}*
&fq=type:((${types.article})%20OR%20(${types.galleryImage}))
&rows=0
&facet=true
&facet.field=type
&facet.field=${searchKeys.articleTitle}
&facet.field=${searchKeys.galleryImageTitle}
&facet.mincount=1
&fl=${searchKeys.articleTitle},${searchKeys.galleryImageTitle},type
&facet.limit=5`
  );

export default {
  getContentById,
  searchDocument,
  search,
  searchFacet,
};
