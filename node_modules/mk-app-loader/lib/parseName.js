'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseName;
function parseName(fullName) {
	var segments = fullName.split('?'),
	    name = segments[0],
	    query = segments[1] || '',
	    params = parseQuery(query);

	return {
		fullName: fullName,
		name: name,
		query: query,
		params: params
	};
}

function parseQuery(query) {
	var ret = {},
	    seg = query.replace(/^\?/, '').split('&'),
	    len = seg.length,
	    i = 0,
	    s = void 0;
	for (; i < len; i++) {
		if (!seg[i]) {
			continue;
		}
		s = seg[i].split('=');
		ret[s[0]] = decodeURIComponent(s[1]);
	}
	return ret;
}
module.exports = exports['default'];