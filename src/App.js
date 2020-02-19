/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { createContext, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';
import Content from 'layout/Content/Content';

export const Context = createContext({});

const App = () => {
  const [state, setState] = useState({});
  const update = prop => setState({ ...state, ...prop });
  return (
    <Context.Provider value={{ state, update }}>
      <Router basename="/">
        <Header />
        <Content />
        <Footer />
      </Router>
    </Context.Provider>
  );
};

export default App;
