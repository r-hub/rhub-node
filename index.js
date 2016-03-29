
var essential_dependency_types = ['Depends', 'LinkingTo', 'Imports' ];
var optional_dependency_types =  ['Suggests', 'Enhances' ];
var dependency_types =
    essential_dependency_types.concat(optional_dependency_types);

api = {
    valid_package_name:     '[[:alpha:]][[:alnum:].]*[[:alnum:]]',
    valid_package_version:  '([[:digit:]]+[.-]){1,}[[:digit:]]+',
    valid_R_system_version: '[[:digit:]]+\\.[[:digit:]]+\\.[[:digit:]]+',
    valid_numeric_version:  '([[:digit:]]+[.-])*[[:digit:]]+',

    essential_dependency_types: essential_dependency_types,
    optional_dependency_types: optional_dependency_types,
    dependency_types: dependency_types

};

module.exports = api;
