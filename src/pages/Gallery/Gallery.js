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
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';

import {
  documentsSelector,
  removeDuplicates,
  renderImageRendition,
  renderFormattedText,
  getLastItemInPath,
} from 'utils/helpers';
import { useSearch } from 'utils/hooks';
import FilterMenu from './FilterMenu/FilterMenu';
import FilterResults from './FilterResults/FilterResults';
import CloseIcon from 'assets/images/ic-clear.svg';
import { types } from 'api/content';
import ImageWithCaption from 'components/ImageWithCaption/ImageWithCaption';
import { gallery as galleryRoute } from 'router/routes';
import styles from './styles.module.scss';

const EXCLUDED_TAG = 'travel site sample';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  paper: {
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '1px 1px 5px',
    padding: '1rem',
    overflow: 'auto',
    position: 'relative',
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100vw',
      height: '100vh',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '95%',
      height: 'auto',
      maxHeight: '95%',
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '90%',
      height: 'auto',
      width: '70%',
    },
  },
  image: {
    maxWidth: '100%',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
}));

const ImageModalId = 'image-preview-modal';

const Gallery = () => {
  const classes = useStyles();
  const [previewImage, setPreviewImage] = React.useState(null);

  const documents = useSearch(
    {
      rows: 1000,
      fq: `type:(${types.galleryImage})`,
      fl: 'document:[json]',
    },
    documentsSelector
  );

  const [locationFilter, setLocationFilter] = useState({
    available: [],
    selected: [],
  });

  const [interestsFilter, setInterestsFilter] = useState({
    available: [],
    selected: [],
  });

  useEffect(() => {
    if (documents) {
      const filters = documents.reduce(
        (acc, doc) => {
          if (doc?.elements) {
            acc.location.push(...getCountryValues(doc.elements));
          }
          if (doc?.tags)
            acc.interests.push(
              ...doc.tags.filter(tag => tag.toLowerCase() !== EXCLUDED_TAG)
            );
          return acc;
        },
        {
          location: [],
          interests: [],
        }
      );

      setLocationFilter({
        available: removeDuplicates(filters.location),
        selected: [],
      });
      setInterestsFilter({
        available: removeDuplicates(filters.interests),
        selected: [],
      });
    }
  }, [documents]);

  const onFilterDelete = item => {
    if (locationFilter.selected.includes(item)) {
      setLocationFilter({
        available: [...locationFilter.available, item],
        selected: locationFilter.selected.filter(x => x !== item),
      });
      return;
    }
    setInterestsFilter({
      available: [...interestsFilter.available, item],
      selected: interestsFilter.selected.filter(x => x !== item),
    });
  };

  const getCountryValues = elements => {
    const categories = elements?.imageCountryValue?.categories;
    return categories.length ? categories.map(getLastItemInPath) : [];
  };

  const isFilterEmpty =
    !interestsFilter.selected.length && !locationFilter.selected.length;

  const includes = (searchIn = [], includesFrom = []) =>
    searchIn.some(i => includesFrom.includes(i));

  const filterOut = d =>
    isFilterEmpty ||
    includes(d.tags, interestsFilter.selected) ||
    includes(getCountryValues(d.elements), locationFilter.selected);

  const onClosePreview = () => {
    setPreviewImage(null);
    history.push({
      pathname: galleryRoute.path,
    });
  };

  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const galleryImageId = searchParams && searchParams.get('galleryImageId');

  useEffect(() => {
    if (documents && galleryImageId) {
      const imageFromRedirect = documents.find(
        ({ id }) => id === galleryImageId
      );
      setPreviewImage(imageFromRedirect.elements);
    }
  }, [documents]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleEnterKeyDown = method => event => {
    if (event.key === 'Enter') {
      method();
    }
  };

  const handleImageEscapeKeydown = event => {
    const isActive = document.getElementById(ImageModalId);
    if (isActive && event.key === 'Escape') {
      onClosePreview();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleImageEscapeKeydown);

    return () =>
      document.body.removeEventListener('keydown', handleImageEscapeKeydown);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const openImage = d => {
    setPreviewImage(d?.elements);
    history.push({
      pathname: galleryRoute.path,
      search: new URLSearchParams({
        galleryImageId: d?.id,
      }).toString(),
    });
  };

  if (!documents?.length) {
    return null;
  }
  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>
      <div className={styles.filter}>
        <div className={styles.actions}>
          <FilterMenu
            label="Location"
            options={locationFilter}
            setter={setLocationFilter}
          />
          <FilterMenu
            label="Interests"
            options={interestsFilter}
            setter={setInterestsFilter}
          />
        </div>
        <div className={styles.chips}>
          <FilterResults
            results={[...locationFilter.selected, ...interestsFilter.selected]}
            onDelete={onFilterDelete}
          />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.cards}>
          {documents.filter(filterOut).map(d => (
            <div
              key={d?.id}
              className={styles.card}
              onClick={() => openImage(d)}
              tabIndex="0"
              onKeyDown={handleEnterKeyDown(() => openImage(d))}
            >
              <ImageWithCaption
                image={d?.elements?.galleryImage?.renditions?.squareCard}
                caption={{
                  className: styles.imageCaption,
                  value: d?.elements?.ImageTitle?.value,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {previewImage && (
        <Modal
          id={ImageModalId}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={Boolean(previewImage)}
          onClose={onClosePreview}
          closeAfterTransition
          disableAutoFocus={true}
          disableEnforceFocus={true}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          onEscapeKeyDown={onClosePreview}
        >
          <Fade in={Boolean(previewImage)}>
            <div className={classes.paper}>
              <div className={classes.modalHeader}>
                <h2 style={{ margin: 0 }}>{previewImage?.ImageTitle?.value}</h2>
                <img
                  src={CloseIcon}
                  alt="Close icon"
                  className={classes.closePreview}
                  onClick={onClosePreview}
                />
              </div>

              <div>
                {renderImageRendition(
                  previewImage?.galleryImage?.renditions?.default,
                  classes.image
                )}
              </div>
              {renderFormattedText(previewImage?.imageDescription?.value)}
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
