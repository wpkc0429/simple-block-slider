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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {

    const blockProps = useBlockProps.save();
    const { images } = attributes;
    return (
      <figure { ...blockProps }>
        <div className="blocks-slider-gallery-grid-frontend">
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
                  width={ '' }
                  height={ '' }
                  data-id={ img.id }
                  data-url={ img.url }
                  data-link={ img.link }
                  aria-label={ ariaLabel }
                  className={
    								img.id ? `steps-slider wp-image-${ img.id }` : `steps-slider`
    							}
                />
              </div>
            );
          } )
        }
        </div>
      </figure>
    );
}
