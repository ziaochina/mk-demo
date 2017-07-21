'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.setMeta = setMeta;
exports.parseMeta = parseMeta;
exports.getMeta = getMeta;
exports.getField = getField;
exports.setField = setField;
exports.updateField = updateField;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _path = require('./path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = { meta: (0, _immutable.Map)() };

window['__getCache'] = function () {
    return cache;
};

function setMeta(appInfo) {

    if (!appInfo || !appInfo.meta) return;

    var appName = appInfo.name;

    if (cache.meta.has(appName)) return;

    var meta = (0, _immutable.fromJS)(appInfo.meta);

    cache.meta = cache.meta.setIn([appName, 'meta'], meta).setIn([appName, 'metaMap'], parseMeta(meta));
}

function parseMeta(meta) {
    var ret = (0, _immutable.Map)();

    /*
        name = meta.get('name')
     ret = ret.set(name, '')
     /*const parseChildren = (children, parentPath, parentRealPath) => {
        if (!children) return
        parentRealPath = parentRealPath? `${parentRealPath}.` : parentRealPath
        children.forEach((child, index) => {
            if(typeof child !='string'){
                let childName = child.get('name'),
                    path = `${parentPath}.${childName}`,
                    realPath = `${parentRealPath}children.${index}`
                ret = ret.set(path, realPath)
                parseChildren(children.get('children'), path, realPath)
            }
        })
    }*/

    var parseProp = function parseProp(propValue, parentPath, parentRealPath) {
        if (!(propValue instanceof _immutable2.default.Map)) {
            return;
        }

        if (propValue.get('name') && propValue.get('component')) {
            parentPath = parentPath ? parentPath + '.' + propValue.get('name') : propValue.get('name');
            ret = ret.set(parentPath, parentRealPath);
        }

        propValue.keySeq().toArray().forEach(function (p) {

            var v = propValue.get(p),
                currentPath = parentPath ? parentPath + '.' + p : p;
            if (v instanceof _immutable2.default.List) {
                v.forEach(function (c, index) {
                    var currentRealPath = parentRealPath ? parentRealPath + '.' + p + '.' + index : p + '.' + index;
                    parseProp(c, '' + currentPath, currentRealPath);
                });
            } else {
                var currentRealPath = parentRealPath ? parentRealPath + '.' + p : p;
                parseProp(v, '' + currentPath, currentRealPath);
            }
        });
    };

    parseProp(meta, '', '');
    debugger;
    /*
        meta.keySeq().toArray().forEach(p=>{
    
    
             if(p != 'children' && p != 'name' && p != 'component'){
                parseProp(meta.get(p), `${name}.#${p}`, `${name}.${p}`)
            }
        })
    
        parseChildren(meta.get('children'), name, '')
        */
    return ret;
}

function isComponent(meta) {
    return (typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) == 'object' && !!meta.name && !!meta.component;
}

function getMeta(appInfo, fullpath, propertys) {

    if (!fullpath) return cache.meta.getIn([appInfo.name, 'meta']).toJS();

    var parsedPath = (0, _path.parsePath)(fullpath),
        vars = parsedPath.vars,
        metaMap = cache.meta.getIn([appInfo.name, 'metaMap']),
        meta = cache.meta.getIn([appInfo.name, 'meta']);

    var path = metaMap.get(parsedPath.path);

    var currentMeta = path ? meta.getIn(path.split('.')) : meta;

    if (!propertys) return currentMeta.toJS();

    var ret = {};

    if (propertys instanceof Array) {
        propertys.forEach(function (p) {
            var val = currentMeta.getIn(p.split('.'));
            if (p == 'bindField') {
                ret[p] = (0, _path.calcBindField)(val, parsedPath);
            } else {
                ret[p] = val && val.toJS ? val.toJS() : val;
            }
        });

        return ret;
    }

    if (typeof propertys == 'string') {
        var val = currentMeta.getIn(propertys.split('.'));
        if (propertys == 'bindField') {
            return (0, _path.calcBindField)(val, parsedPath);
        }
        return val && val.toJS ? val.toJS() : val;
    }
}

function getField(state, fieldPath) {
    if (!fieldPath) {
        return state.get('data');
    }

    if (fieldPath instanceof Array) {
        return state.getIn(fieldPath);
    } else {
        return state.getIn(fieldPath.split('.'));
    }
}

function setField(state, fieldPath, value) {
    if (fieldPath instanceof Array) {
        return state.setIn(fieldPath, value);
    } else {
        return state.setIn(fieldPath.split('.'), value);
    }
}

function updateField(state, fieldPath, fn) {
    if (fieldPath instanceof Array) {
        return state.updateIn(fieldPath, fn);
    } else {
        return state.updateIn(fieldPath.split('.'), fn);
    }
}

(0, _assign2.default)(exports, (0, _extends3.default)({
    existsParamsInPath: _path.existsParamsInPath,
    parsePath: _path.parsePath,
    calcBindField: _path.calcBindField,
    match: _path.match
}, exports));