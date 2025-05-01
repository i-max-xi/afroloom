/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from 'primereact/dialog';
import React, { useMemo, useState } from 'react';
import { textureValues } from './arrays/neededArrays';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // optional: for blur effect

import alternateTexture from './textures/tie_and_dye/10 medofo - Copy.jpg';
import queensAlternate from './textures/diaspora/queens_LE_auto_x2 - Copy.jpg';
import repuAlternate from './textures/diaspora/repo_LE_auto_x2 - Copy.jpg';
import otumfuoAlternate from './textures/commemorative/otumfuo - Copy.jpg';
import contiAlternate from './textures/diaspora/conti_LE_auto_x2 - Copy.jpg';
import africaAlternate from './textures/diaspora/africa_LE_auto_x2 - Copy.jpg';
import katangaAlternate from './textures/diaspora/kat_LE_auto_x2 - Copy.jpg';
import AsanteheneAnniversaryAlternate from './textures/commemorative/1-imageonline.co-merged - Copy.jpeg';
import AsanteheneAnniversaryAlternate2 from './textures/commemorative/gfsdg-imageonline.co-merged (1) - Copy.jpeg';
import GhanaMapAlternate from './textures/new_textures/7. ghana flag.jpg';

const textureMap = {
  '/static/media/10 medofo.84aa9ed3bbc49733e1bd.jpg': alternateTexture,
  '/static/media/repo_LE_auto_x2.42e321b653537455d23c.jpg': repuAlternate,
  '/static/media/A.d9379b965b715f313603.png': queensAlternate,
  '/static/media/otumfuo.46a2fea2de6a31c52a17.jpg': otumfuoAlternate,
  '/static/media/conti_LE_auto_x2.bdf93a21d9fe17700452.jpg': contiAlternate,
  '/static/media/africa_LE_auto_x2.e33124ba711b85535cd5.jpg': africaAlternate,
  '/static/media/kat_LE_auto_x2.027d8f3b120fd32985ad.jpg': katangaAlternate,
  '/static/media/1-imageonline.co-merged.6daa3b6a171f9f9c0242.jpeg':
    AsanteheneAnniversaryAlternate,
  '/static/media/gfsdg-imageonline.co-merged (1).ed8bdf12e1c96c823397.jpeg':
    AsanteheneAnniversaryAlternate2,
  '/static/media/7. ghana flag - Copy.ec91924585d1ba65c097.jpg':
    GhanaMapAlternate,
};

function TextureItem({
  texture,
  selectedTexture,
  handleTextureChange,
  subTextureDescriptions,
  textureIndex,
  noInfo = false,
  noPleaseNote = false,
}) {
  const [displayDialog, setDisplayDialog] = useState(false);

  const masterTexture = useMemo(() => {
    return textureMap[texture] || texture;
  }, [texture]);

  return (
    <div className="texture-item">
      <div
        className={`texture-button ${
          selectedTexture === texture ? 'border-3 border-[#ffc107]' : ''
        }`}
      >
        {/* <img
          src={texture}
          loading="lazy"
          alt="Texture"
          width="100"
          height="100"
          // className="h-full w-full"
          onClick={() => handleTextureChange(texture)}
          onContextMenu={(e) => e.preventDefault()}
        /> */}
        {/* <Image
          src={texture}
          alt="Texture"
          width={100}
          height={100}
          radius="sm"
          isBlurred
          isZoomed
          className="cursor-pointer"
          onClick={() => handleTextureChange(texture)}
          onContextMenu={(e) => e.preventDefault()}
        /> */}
        <LazyLoadImage
          alt="Texture"
          src={texture}
          effect="blur" // Optional: other options are 'opacity', 'black-and-white', or no effect
          onClick={() => handleTextureChange(texture)}
          onContextMenu={(e) => e.preventDefault()}
          className=" object-cover"
          height="100"
          width="100"
        />
      </div>

      {!noInfo && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          className="bi bi-info-circle texture-item-info my-1 mb-2"
          viewBox="0 0 16 16"
          onClick={() => setDisplayDialog(true)}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      )}

      <Dialog
        header={
          subTextureDescriptions[textureIndex]?.textureName || 'Title N/A'
        }
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
        className="col-12 col-sm-4"
        dismissableMask
      >
        <div className="flex flex-col relative">
          <img
            alt="Texture"
            src={masterTexture}
            height="150px"
            width="250px"
            style={{ alignSelf: 'center', objectFit: 'cover' }}
            onContextMenu={(e) => e.preventDefault()}
          />

          <div className="text-block-container">
            <div className="text-block">
              <p>Afroloom</p>
            </div>
          </div>

          <p className="pt-4">
            {subTextureDescriptions[textureIndex]?.textureDescription ||
              'Description N/A'}
          </p>

          {!noPleaseNote && (
            <p className="font-bold">
              {subTextureDescriptions[textureIndex]?.disclaimer ||
                'Please note, we only source these fabrics from official producers, and Afroloom does not manufacture them. Fabric availability depends on stock from the original producers.'}
            </p>
          )}

          <p>{subTextureDescriptions[textureIndex]?.footNote}</p>
        </div>
      </Dialog>
    </div>
  );
}

export default TextureItem;
