/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { getLastItemInPath } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';
import { destination } from 'router/routes';
import Region from './Region/Region';
import { pagesIds } from 'api/content';
import styles from './styles.module.scss';

const useStyles = makeStyles({
  indicator: {
    display: 'none',
  },
  selected: {
    color: '#13173d',
    fontWeight: '700',
    '&:after': {
      bottom: 0,
      left: '7%',
      width: '86%',
      right: 0,
      borderTop: '2px solid #13173d',
      content: '""',
      position: 'absolute',
    },
  },
  flexContainer: {
    '&:before': {
      bottom: 0,
      width: '80vw',
      left: 0,
      right: 0,
      borderTop: '2px solid #eceff1',
      content: '""',
      position: 'absolute',
    },
  },
  scrollButtons: {
    width: 'auto',
  },
});

const Destination = () => {
  const classes = useStyles();
  const elements = useFetchElements(pagesIds.destination);
  let { path, url, isExact } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const categories = elements?.regionList?.categories ?? [];
  const regions = categories.map(getLastItemInPath);

  //open first tab
  useEffect(() => {
    if (regions.length) {
      if (isExact) {
        history.push(`${url}/${regions[0]}`);
      }
      setLoading(false);
    }
  }, [regions, isExact, history, url]);

  const isRedirected = history.location.pathname !== destination.path;

  return (
    !loading && (
      <div className={styles.destination}>
        <h1>{elements.destinationsTitle?.value}</h1>
        {isRedirected && (
          <Tabs
            value={history.location.pathname}
            scrollButtons="on"
            variant="scrollable"
            classes={{
              indicator: classes.indicator,
              flexContainer: classes.flexContainer,
              scrollButtons: classes.scrollButtons,
            }}
          >
            {regions.map(region => (
              <Tab
                label={`${region}`}
                component={Link}
                to={`${url}/${region}`}
                value={`${url}/${region}`}
                key={region}
                classes={{ selected: classes.selected }}
                style={{
                  textTransform: 'capitalize',
                  minWidth: 'auto',
                  fontSize: '18px',
                }}
              />
            ))}
          </Tabs>
        )}
        <Route
          path={`${path}/:region`}
          component={Region}
          key={history.location.pathname}
        />
      </div>
    )
  );
};

export default Destination;
