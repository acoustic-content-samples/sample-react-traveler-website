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
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Country from './Country/Country';
import Article from './Article/Article';
import DestinationTabs from './DestinationTabs';

const DestinationContainer = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:region/:country/:articleId`} component={Article} />
      <Route path={`${path}/:region/:country`} component={Country} />
      <Route path={path} component={DestinationTabs} />
    </Switch>
  );
};

export default DestinationContainer;
