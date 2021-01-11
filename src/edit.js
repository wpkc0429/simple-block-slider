/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { MediaPlaceholder, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {
	every,
	filter,
	find,
	forEach,
	get,
	isEmpty,
	map,
	reduce,
	some,
	toString,
} from 'lodash';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, isSelected } ) {
  const blockProps = useBlockProps();

  // Simplify access to attributes
  const { images } = attributes;

  return (
      <figure { ...blockProps }>
      { images.length > 0 &&
        <div>
        <div className="blocks-slider-gallery-grid">
  				{
            images.map( ( img, index ) => {
  					const ariaLabel = sprintf(
  						/* translators: 1: the order number of the image. 2: the total number of images. */
  						__( 'image %1$d of %2$d in gallery' ),
  						index + 1,
  						images.length
  					);
  					return (
  						<div
  							className="blocks-slider-gallery-item"
  							key={ img.id || img.url }
  						>
                <img
                  src={ img.url }
                  alt={ img.alt }
                  data-id={ img.id }
                  tabIndex="0"
                  aria-label={ ariaLabel }
                  onLoad={
                    () => {
          						jQuery('.blocks-slider-gallery-display').remove();
          						jQuery('.blocks-slider-gallery-grid').after('<div class="blocks-slider-gallery-display"></div>');
                      jQuery('.blocks-slider-gallery-display').html(jQuery('.blocks-slider-gallery-grid').html());
                      jQuery('.blocks-slider-gallery-display').slick({
                        dots: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        adaptiveHeight: true
                      });
                    }
                  }
                />
  						</div>
  					);
  				} )
        }
  			</div>
        <div className="blocks-slider-gallery-display">
        </div>
        </div>
      }
      <MediaPlaceholder
        addToGallery={ images.length > 0 }
  			isAppender={ images.length > 0 }
  			disableMediaButtons={ images.length > 0 && ! isSelected }
        onSelect = {
          ( newImages ) => {
            setAttributes( {
              images: newImages.map(( newImage ) => ( {
        				id: toString( newImage.id ),
                url: toString( newImage.url ),
                link: toString( newImage.link ),
                alt: toString( newImage.alt ),
                caption: toString( newImage.caption ),
        			} )),
            } );
						jQuery('.blocks-slider-gallery-display').remove();
						jQuery('.blocks-slider-gallery-grid').after('<div class="blocks-slider-gallery-display"></div>');
            jQuery('.blocks-slider-gallery-display').html(jQuery('.blocks-slider-gallery-grid').html());
            jQuery('.blocks-slider-gallery-display').slick({
              dots: true,
              infinite: true,
              speed: 300,
              slidesToShow: 1,
              adaptiveHeight: true
            });
          }
        }
        allowedTypes = { [ 'image' ] }
        multiple = { true }
        value={ images }
        labels = { { title: '圖片輪播' } }
      >
      </MediaPlaceholder>
      </figure>
  );
}
