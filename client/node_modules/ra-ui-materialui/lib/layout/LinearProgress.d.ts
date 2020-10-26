/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * Progress bar formatted to replace an input or a field in a form layout
 *
 * Avoids visual jumps when replaced by value or form input
 *
 * @see ReferenceField
 * @see ReferenceInput
 *
 * @param {Object} classes CSS class names
 */
declare const LinearProgress: {
    (props: any): JSX.Element;
    propTypes: {
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
    };
    displayName: string;
};
export default LinearProgress;
