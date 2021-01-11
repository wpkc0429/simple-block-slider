<?php
/**
 * Plugin Name:     Block Simple Slider
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     block-simple-slider
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_block_simple_slider_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/block-simple-slider" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-block-simple-slider-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-block-simple-slider-block-editor', 'block-simple-slider' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-block-simple-slider-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-block-simple-slider-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/block-simple-slider', array(
		'editor_script' => 'create-block-block-simple-slider-block-editor',
		'editor_style'  => 'create-block-block-simple-slider-block-editor',
		'style'         => 'create-block-block-simple-slider-block',
	) );

	wp_enqueue_script(
		'create-block-block-simple-slider-block-frontend-script',
		plugins_url( 'frontend-slider.js?003', __FILE__ ),
		array('jquery'),
		'',
		true
	);

	wp_enqueue_script('slick-js', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',array('jquery'),'',true);
	wp_enqueue_style('slick-css', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', '', '1.8.1', 'all');
	wp_enqueue_style('slick-theme-css', '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css', '', '1.8.1', 'all');
}
add_action( 'init', 'create_block_block_simple_slider_block_init' );
