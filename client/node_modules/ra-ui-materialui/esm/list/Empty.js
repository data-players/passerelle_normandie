import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Inbox from '@material-ui/icons/Inbox';
import { useTranslate, useListContext } from 'ra-core';
import inflection from 'inflection';
import { CreateButton } from '../button';
var useStyles = makeStyles(function (theme) { return ({
    message: {
        textAlign: 'center',
        opacity: theme.palette.type === 'light' ? 0.5 : 0.8,
        margin: '0 1em',
        color: theme.palette.type === 'light'
            ? 'inherit'
            : theme.palette.text.primary,
    },
    icon: {
        width: '9em',
        height: '9em',
    },
    toolbar: {
        textAlign: 'center',
        marginTop: '2em',
    },
}); }, { name: 'RaEmpty' });
var Empty = function (props) {
    var _a = useListContext(props), resource = _a.resource, basePath = _a.basePath;
    var classes = useStyles(props);
    var translate = useTranslate();
    var resourceName = translate("resources." + resource + ".forcedCaseName", {
        smart_count: 0,
        _: inflection.humanize(translate("resources." + resource + ".name", {
            smart_count: 0,
            _: inflection.pluralize(resource),
        }), true),
    });
    var emptyMessage = translate('ra.page.empty', { name: resourceName });
    var inviteMessage = translate('ra.page.invite');
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.message },
            React.createElement(Inbox, { className: classes.icon }),
            React.createElement(Typography, { variant: "h4", paragraph: true }, translate("resources." + resource + ".empty", {
                _: emptyMessage,
            })),
            React.createElement(Typography, { variant: "body1" }, translate("resources." + resource + ".invite", {
                _: inviteMessage,
            }))),
        React.createElement("div", { className: classes.toolbar },
            React.createElement(CreateButton, { variant: "contained", basePath: basePath }))));
};
export default Empty;
