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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.scss';

const GoBack = ({ onClick, className }) => {
  const history = useHistory();

  const getPrev = () => {
    const path = history.location.pathname.split('/').slice(0, -1);

    return [path[path.length - 1], path.join('/')];
  };

  const [prevName, prevPath] = getPrev();

  const goBack = () => history.push(prevPath);

  return (
    <div
      className={`${styles.goBack} ${className}`}
      onClick={onClick || goBack}
    >
      <ArrowBackIcon />
      <strong>{prevName}</strong>
    </div>
  );
};

export default GoBack;
