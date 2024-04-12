import got from 'got';
import format from 'string-template';

var essential_dependency_types = ['Depends', 'LinkingTo', 'Imports' ];
var optional_dependency_types =  ['Suggests', 'Enhances' ];
var dependency_types =
    essential_dependency_types.concat(optional_dependency_types);

var base_packages = ['base', 'compiler', 'datasets', 'graphics',
                     'grDevices', 'grid', 'methods', 'parallel',
                     'splines', 'stats', 'stats4', 'tcltk', 'tools',
                     'utils'];

var recommended_packages = ['KernSmooth', 'Matrix', 'mgcv', 'boot',
			    'class', 'cluster', 'codetools', 'foreign',
			    'KernSmooth', 'lattice', 'MASS', 'Matrix',
			    'mgcv', 'nlme', 'nnet', 'rpart', 'spatial',
			    'survival'];

// Use the string-template package for the templated strings:
// var format = require("string-template")
// format(rhub.cran_src_urls[0], {
//   mirror: rhub.cran_mirror,
//   package: 'igraph',
//   version: '1.0.0'
// })

var cran_mirror = 'https://cran.rstudio.com';
var cran_src_urls = [
    '{mirror}/src/contrib/{package}_{version}.tar.gz',
    '{mirror}/src/contrib/Archive/{package}/{package}_{version}.tar.gz'
];

var crandb_url = 'https://crandb.r-pkg.org';

async function get_latest_cran_version(pkg) {
    var url = crandb_url + '/' + pkg;
    const resp = await got(url).json();
    return resp['Version'];
}

async function get_version(pkg, version) {
    if (version === undefined) {
	return get_latest_cran_version(pkg);
    } else {
	return version;
    }
}

async function check_url(url) {
    try {
	await got.head(url);
	return true;
    } catch (err) {
	return false;
    }
}

async function get_cran_pkg_url(pkg, version) {
    const ver = await get_version(pkg, version);
    var urls = cran_src_urls.map(
	function(x) {
	    return format(x, {
		'mirror': cran_mirror,
		'package': pkg,
		'version': ver
	    })
	}
    );

    for (var url of urls) {
	if (await check_url(url)) {
	    return url;
	}
    }
    throw 'Cannot find a working URL';
}

const api = {

    crandb_url: crandb_url,

    valid_package_name:     '[a-zA-Z][a-zA-Z0-9\\.]*[a-zA-Z0-9]',
    valid_package_version:  '(?:[0-9]+[\\.-]){1,}[0-9]+',
    valid_R_system_version: '[0-9]+\\.[0-9]+\\.[0-9]+',
    valid_numeric_version:  '(?:[0-9]+[\\.-])*[0-9]+',

    essential_dependency_types: essential_dependency_types,
    optional_dependency_types: optional_dependency_types,
    dependency_types: dependency_types,

    base_packages: base_packages,
    recommended_packages: recommended_packages,

    cran_mirror: cran_mirror,
    cran_src_urls: cran_src_urls,

    get_latest_cran_version: get_latest_cran_version,
    get_cran_pkg_url: get_cran_pkg_url
};

export default api;
