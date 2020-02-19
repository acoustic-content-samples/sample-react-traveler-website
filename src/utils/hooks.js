/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { useState, useEffect } from 'react';

import API, { handleError } from 'api/api';
import { getQueryFromParams } from './helpers';

export const useFetchContent = contentId => {
  const [state, setState] = useState(null);

  useEffect(() => {
    API.getContentById(contentId)
      .then(content => {
        setState(content);
      })
      .catch(handleError);
  }, [contentId]);

  return state;
};

export const useFetchElements = contentId => {
  const content = useFetchContent(contentId);
  return content && content.elements;
};

export const useSearch = (params, select = r => r) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.search(getQueryFromParams(params)).then(data =>
      setResult(select(data))
    );
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return result;
};
