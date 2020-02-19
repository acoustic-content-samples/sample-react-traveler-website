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

import { DOMAIN_NAME, CONTENT_HUB_ID } from 'api/endpoints';
import API from 'api/api';

export const renderImageRendition = (image, className) => {
  if (!image || !image.url) {
    console.error('check rendition for image');
    return null;
  }
  return (
    <img
      className={className}
      src={`${DOMAIN_NAME}/${image.url}`}
      alt={image.altText ?? 'image'}
    />
  );
};

export const renderFormattedText = (value = '', className = '') => {
  //make path for image absolute for local development
  const html =
    process.env.NODE_ENV === 'development'
      ? value.replace(
          new RegExp(`/${CONTENT_HUB_ID}`, 'g'),
          `${DOMAIN_NAME}/${CONTENT_HUB_ID}`
        )
      : value;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export const getLastItemInPath = (category = '') =>
  category.split('/').reverse()[0];

export const getCountryPath = (category = '') =>
  category
    .split('/')
    .slice(1)
    .join('/');

export const getQueryFromParams = params =>
  Object.keys(params).reduce((query, paramKey) => {
    if (paramKey === 'q') {
      return query;
    }
    const paramValue = params[paramKey];

    if (Array.isArray(paramValue)) {
      return paramValue.reduce(
        (res, value) => `${res}&${paramKey}=${value}`,
        query
      );
    }

    return `${query}&${paramKey}=${paramValue}`;
  }, `q=${params.q || '*:*'}`);

export const search = params => API.search(getQueryFromParams(params));

export const firstDocumentSelector = r => r.numFound && r.documents[0];

export const elementsSelector = r =>
  r.numFound && r.documents[0].document.elements;

export const documentsSelector = r =>
  r.numFound && r.documents.map(({ document }) => document);

export const removeDuplicates = array => Array.from(new Set(array));

export const sortMapper = value =>
  `lastModified ${value === 'Most Recent' ? 'desc' : 'asc'}`;

//get Date string in MMM DD YYYY format
const getFormattedDate = dateString =>
  dateString
    .split(' ')
    .slice(1)
    .join(' ');

export const formatDate = (date = '') =>
  getFormattedDate(new Date(date).toDateString());

export const titleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
