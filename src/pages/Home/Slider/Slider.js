/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import { DOMAIN_NAME } from 'api/endpoints';
import { useHistory } from 'react-router-dom';

import {
  documentsSelector,
  sortMapper,
  renderFormattedText,
} from 'utils/helpers';
import { useSearch } from 'utils/hooks';
import { gallery as galleryRoute } from 'router/routes';
import './styles.scss';

const Slider = ({ title, settings }) => {
  const galleryContainer = useRef();

  const documents = useSearch(
    {
      sort: sortMapper(settings.displayOrder.value.selection),
      rows: settings.numberOfListItems.value,
      fq: `type:(${settings.contentTypeToDisplay.value.selection})`,
      fl: 'document:[json]',
    },
    documentsSelector
  );

  const speedInMilliseconds = settings.DisplayTime.value * 1000;

  const history = useHistory();

  const onImageClick = () => {
    const galleryEl = galleryContainer.current;
    const index = galleryEl.getCurrentIndex();
    history.push({
      pathname: galleryRoute.path,
      search: new URLSearchParams({
        galleryImageId: galleryEl.props.items[index].id,
      }).toString(),
    });
  };

  const handleKeyDown = e => {
    const { key } = e;

    if (!(key === 'ArrowLeft' || key === 'ArrowRight')) {
      return;
    }

    const gallery = galleryContainer.current;
    const index = gallery.getCurrentIndex();
    const length = gallery.props.items.length;

    const table = {
      ArrowLeft: () =>
        gallery.slideToIndex(index === 0 ? length - 1 : index - 1),
      ArrowRight: () =>
        gallery.slideToIndex(index === length - 1 ? 0 : index + 1),
    };

    table[key]();
  };

  const getItems = () =>
    documents
      .filter(d => d?.elements?.galleryImage?.renditions?.rectangleCard?.url)
      .map(({ elements, id }) => {
        const {
          url,
          altText = 'image',
        } = elements?.galleryImage?.renditions?.rectangleCard;

        return {
          original: `${DOMAIN_NAME}/${url}`,
          originalAlt: altText,
          description: elements?.ImageTitle?.value,
          id,
        };
      });

  const renderItem = item => {
    return (
      <div>
        <img
          className="image-gallery-image"
          src={item?.original}
          alt={item?.originalAlt}
        />
        <div className="image-caption">
          <div className="image-title">{title}</div>
          <div className="image-description">
            {renderFormattedText(item?.description)}
          </div>
        </div>
      </div>
    );
  };

  return (
    documents && (
      <div onKeyDown={handleKeyDown}>
        <ImageGallery
          ref={galleryContainer}
          items={getItems()}
          renderItem={renderItem}
          showNav={false}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          autoPlay={true}
          slideInterval={speedInMilliseconds}
          onClick={onImageClick}
        />
      </div>
    )
  );
};

export default Slider;
