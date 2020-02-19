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
import { Menu, Button, MenuItem } from '@material-ui/core';

import ArrowDownIcon from 'assets/images/ic-arrow-drop-down.svg';

const FilterMenu = ({ label, setter, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addToSelected = option => {
    handleClose();
    setter({
      available: options.available.filter(x => x !== option),
      selected: [...options.selected, option],
    });
  };

  if (!options) {
    return null;
  }
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!options.available.length}
        style={{ textTransform: 'capitalize' }}
        endIcon={<img src={ArrowDownIcon} alt="dropdown arrow down" />}
      >
        {label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.available.map(option => (
          <MenuItem onClick={() => addToSelected(option)} key={option}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterMenu;
