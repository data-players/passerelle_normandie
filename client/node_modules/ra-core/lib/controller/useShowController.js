"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inflection_1 = __importDefault(require("inflection"));
var useVersion_1 = __importDefault(require("./useVersion"));
var checkMinimumRequiredProps_1 = require("./checkMinimumRequiredProps");
var dataProvider_1 = require("../dataProvider");
var i18n_1 = require("../i18n");
var sideEffect_1 = require("../sideEffect");
var actions_1 = require("../actions");
/**
 * Prepare data for the Show view
 *
 * @param {Object} props The props passed to the Show component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Show view
 *
 * @example
 *
 * import { useShowController } from 'react-admin';
 * import ShowView from './ShowView';
 *
 * const MyShow = props => {
 *     const controllerProps = useShowController(props);
 *     return <ShowView {...controllerProps} {...props} />;
 * }
 */
var useShowController = function (props) {
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('Show', ['basePath', 'resource'], props);
    var basePath = props.basePath, id = props.id, resource = props.resource;
    var translate = i18n_1.useTranslate();
    var notify = sideEffect_1.useNotify();
    var redirect = sideEffect_1.useRedirect();
    var refresh = sideEffect_1.useRefresh();
    var version = useVersion_1.default();
    var _a = dataProvider_1.useGetOne(resource, id, {
        action: actions_1.CRUD_GET_ONE,
        onFailure: function () {
            notify('ra.notification.item_doesnt_exist', 'warning');
            redirect('list', basePath);
            refresh();
        },
    }), record = _a.data, loading = _a.loading, loaded = _a.loaded;
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection_1.default.humanize(inflection_1.default.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.show', {
        name: "" + resourceName,
        id: id,
        record: record,
    });
    return {
        loading: loading,
        loaded: loaded,
        defaultTitle: defaultTitle,
        resource: resource,
        basePath: basePath,
        record: record,
        version: version,
    };
};
exports.default = useShowController;
