'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.existsParamsInPath = existsParamsInPath;
exports.parsePath = parsePath;
exports.calcBindField = calcBindField;
exports.match = match;
/**
 * [是否存在参数]
 * @param  {[type]} path [路径]
 * @return {[type]}      [是否存在参数]
 */
function existsParamsInPath(path) {
    return (/,/.test(path)
    );
}

/**
 * [解析路径]
 * @param  {[type]} path [路径]
 * @return {[type]}      [路径+参数数组]
 */
function parsePath(path) {
    if (!path) return;
    if (path.indexOf(',') == -1) {
        return {
            path: path
        };
    } else {
        var segments = path.split(","),
            vars = segments.slice(1);
        return {
            path: segments[0],
            vars: vars
        };
    }
}

/**
 * [根据解析后的路径计算绑定字段路径]
 * @param  {[type]} bindField  [绑定字段路径]
 * @param  {[type]} parsedPath [解析后路径]
 * @return {[type]}            [计算出的绑定字段路径]
 */
function calcBindField(bindField, parsedPath) {
    if (!bindField) return bindField;

    if (!parsedPath || !parsedPath.vars) return bindField;

    var vars = parsedPath.vars;

    var hit = false;

    //root.detail.code,0;form.detail.${0}.code => form.detail.0.code
    //root.detail,0;form.detail => form.detail.0
    bindField = bindField.replace(/{(\d+)}/g, function (match, index) {
        hit = true;
        return vars[index];
    });
    return hit ? bindField : bindField + '.' + vars[0];
}

/**
 * [路径匹配]
 * @param  {[type]} path         [当前路径]
 * @param  {[type]} propertys    [当前属性]
 * @param  {[type]} hitPaths     [命中路径]
 * @param  {[type]} hitPropertys [命中属性]
 * @return {[type]}              [是否命中]
 */
function match(path, propertys, hitPaths, hitPropertys) {
    if (!hitPaths && !hitPropertys) return true;

    var parsedPath = parsePath(path);

    var pathEquals = function pathEquals(currentPath) {
        return parsedPath.path === currentPath;
    };

    var propertyEquals = function propertyEquals(currentProperty) {
        var b = false;
        if (typeof propertys === 'string' && propertys.constructor == String) {
            if (propertys === currentProperty) b = true;
        } else {
            propertys.forEach(function (pt) {
                if (pt.indexOf(currentProperty) > -1) b = true;
            });
        }

        return b;
    };

    var hit = function hit(currentPath, currentProperty) {
        if (!currentPath && !currentProperty) return true;
        if (!currentPath && currentProperty) {
            return propertyEquals(currentProperty);
        }
        if (currentPath && !currentProperty) return pathEquals(currentPath);
        var b = pathEquals(currentPath) && propertyEquals(currentProperty);
        return b;
    };

    if (hitPaths) {
        if (typeof hitPaths === 'string' && hitPaths.constructor == String) {
            hitPaths = [hitPaths];
        }
    }
    if (hitPropertys) {
        if (typeof hitPropertys === 'string' && hitPropertys.constructor == String) {
            hitPropertys = [hitPropertys];
        }
    }

    var result = false;

    if (!hitPaths && hitPropertys) {
        hitPropertys.forEach(function (p) {
            result = result || hit(hitPaths, p);
        });
        return result;
    }

    if (hitPaths && !hitPropertys) {
        hitPaths.forEach(function (p) {
            result = result || hit(p, hitPropertys);
        });

        return result;
    }

    hitPaths.forEach(function (p) {
        hitPropertys.forEach(function (pt) {
            result = result || hit(p, pt);
            if (result) return false;
        });
        if (result) return false;
    });
    return result;
}