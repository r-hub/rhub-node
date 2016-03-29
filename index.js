
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

api = {
    valid_package_name:     '[[:alpha:]][[:alnum:].]*[[:alnum:]]',
    valid_package_version:  '([[:digit:]]+[.-]){1,}[[:digit:]]+',
    valid_R_system_version: '[[:digit:]]+\\.[[:digit:]]+\\.[[:digit:]]+',
    valid_numeric_version:  '([[:digit:]]+[.-])*[[:digit:]]+',

    essential_dependency_types: essential_dependency_types,
    optional_dependency_types: optional_dependency_types,
    dependency_types: dependency_types,

    base_packages: base_packages,
    recommended_packages: recommended_packages

    cran_mirror: cran_mirror,
    cran_src_urls: cran_src_urls
};

module.exports = api;
