/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { ToggleControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const { startingYear, showStartingYear } = props.attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Setting">
					<TextControl
						__next40pxDefaultSize
						label="Starting Year"
						value={ startingYear }
						onChange={ ( value ) =>
							props.setAttributes( { startingYear: value } )
						}
					/>
					<ToggleControl
						label="Show Starting Year"
						checked={ showStartingYear }
						onChange={ () => props.setAttributes( { showStartingYear: ! showStartingYear } ) }
						/>
				</PanelBody>
			</InspectorControls>
			{
				showStartingYear ? (
					<p { ...useBlockProps() }>
					{ __(
						'Copyright Date Block – hello from the editor!',
						'copyright-date-block'
					) } {startingYear}
				</p>
				)
				: (
					<p>None</p>
				)
			}

		</>
	);
}
