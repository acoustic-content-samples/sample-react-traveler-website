/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { DOMAIN_NAME } from 'api/endpoints';

const hidden = { visibility: 'hidden' };

const ImageWithCaption = data => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };
  const style = loaded ? {} : hidden;

  return (
    <>
      <img
        src={`${DOMAIN_NAME}/${data?.image?.url}`}
        alt={data?.image?.altText ?? 'image'}
        onLoad={() => setLoaded(true)}
        onError={() => handleError()}
        style={style}
      />
      {!hasError && (
        <div className={data?.caption?.className} style={style}>
          <span>{data?.caption?.value}</span>
        </div>
      )}
      {!loaded && (
        <div style={{ position: 'relative', top: '45%', left: '45%' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default ImageWithCaption;
