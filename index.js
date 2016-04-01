var got = require('got');
var async = require('async');
var format = require('string-template');

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

function get_latest_cran_version(package, callback) {
    var url = crandb_url + '/' + package;
    got(url, function(err, body, response) {
	if (err) { return callback(err); }
	callback(null, JSON.parse(body).Version);
    })
}

function get_version(package, version, callback) {
    if (version === undefined) {
	get_latest_cran_version(package, callback);
    } else {
	callback(null, version);
    }
}

function check_url(url, callback) {
    got.head(url, function(err, body, response) {
	callback(null, !err);
    });
}

function get_cran_pkg_url(package, version, callback) {
    get_version(package, version, function(err, version) {
	if (err) { return callback(err); }
	var urls = cran_src_urls.map(
	    function(x) {
		return format(x, {
		    'mirror': cran_mirror,
		    'package': package,
		    'version': version
		})
	    }
	);
	// Return the first one that works
	async.detectSeries(
	    urls,
	    check_url,
	    function(err, result) {
		if (err) { return callback(err); }
		if (result === undefined) {
		    callback('Cannot find a working URL');
		} else {
		    callback(null, result);
		}
	    }
	)
    })
}

api = {

    crandb_url: crandb_url,

    valid_package_name:     '[a-zA-Z][a-zA-Z0-9\\.]*[a-zA-Z]',
    valid_package_version:  '([0-9]+[.-]){1,}[0-9]+',
    valid_R_system_version: '[0-9]+\\.[0-9]+\\.[0-9]+',
    valid_numeric_version:  '([0-9]+[.-])*[0-9]+',

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

module.exports = api;
