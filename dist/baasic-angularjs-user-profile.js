(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.userProfile` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @module baasic.userProfile
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.userProfile",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.userProfile', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicCompanyRouteService
     * @description Baasic Company Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCompanyRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing company properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain company subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCompanyRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('lookups/companies/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCompanyRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('lookups/companies'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCompanyRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('lookups/companies/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicCompanyRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('lookups/companies/batch'),
                    /**
                     * Parses remove route; this must be expanded with a list of company Ids which need to be removed.
                     * @method batch.remove       
                     * @example baasicCompanyRouteService.batch.remove.expand({companyIds: <companyIds>);              
                     **/
                    remove: uriTemplateService.parse('lookups/companies/batch/{companyIds}'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicCompanyRouteService.batch.create.expand({});              
                     **/
                    update: uriTemplateService.parse('lookups/companies/batch')
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicCompanyService
     * @description Baasic Company Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCompanyService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCompanyRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, companyRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create company action has been performed; this action creates a new company resource.
                 * @method        
                 * @example 
                 baasicCompanyService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(companyRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of company resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCompanyService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(companyRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the company resource.
                 * @method        
                 * @example 
                 baasicCompanyService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(companyRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a company resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(company);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // company is a resource previously fetched using get action.
                 baasicCompanyService.remove(company)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update company action has been performed; this action updates a company resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(company);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // company is a resource previously fetched using get action.
                 company.description = '<description>';
                 baasicCompanyService.update(company)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create company action has been performed; this action creates new company resources.
                     * @method batch.create       
                     * @example 
                     baasicCompanyService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApiHttp.post(companyRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the update company action has been performed; this action updates specified company resources.
                     * @method batch.update       
                     * @example 
                     baasicCompanyService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApiHttp.post(companyRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove company resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCompanyService.batch.remove(companyIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        var data = ids.join(',');
                        return baasicApiHttp.delete(companyRouteService.batch.remove.expand({
                            companyIds: data
                        }));
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicOrganizationRouteService
     * @description Baasic Organization Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicOrganizationRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing organization properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain Organization subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicOrganizationRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('lookups/organizations/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicOrganizationRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('lookups/organizations'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicOrganizationRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('lookups/organizations/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicOrganizationRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('lookups/organizations/batch'),
                    /**
                     * Parses remove route; this must be expanded with a list of organization Ids which need to be removed.
                     * @method batch.remove       
                     * @example baasicOrganizationRouteService.batch.remove.expand({organizationIds: <organizationIds>);              
                     **/
                    remove: uriTemplateService.parse('lookups/organizations/batch/{organizationIds}'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicOrganizationRouteService.batch.create.expand({});              
                     **/
                    update: uriTemplateService.parse('lookups/organizations/batch')
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicOrganizationService
     * @description Baasic Organization Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicOrganizationService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicOrganizationRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, organizationRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create organization action has been performed; this action creates a new organization resource.
                 * @method        
                 * @example 
                 baasicOrganizationService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(organizationRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of organization resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicOrganizationService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(organizationRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the organization resource.
                 * @method        
                 * @example 
                 baasicOrganizationService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(organizationRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a organization resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(organization);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // organization is a resource previously fetched using get action.
                 baasicOrganizationService.remove(organization)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update organization action has been performed; this action updates a organization resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(organization);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // organization is a resource previously fetched using get action.
                 organization.description = '<description>';
                 baasicOrganizationService.update(organization)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create organization action has been performed; this action creates new organization resources.
                     * @method batch.create       
                     * @example 
                     baasicOrganizationService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApiHttp.post(organizationRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the update organization action has been performed; this action updates specified organization resources.
                     * @method batch.update       
                     * @example 
                     baasicOrganizationService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApiHttp.post(organizationRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove organization resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicOrganizationService.batch.remove(organizationIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        var data = ids.join(',');
                        return baasicApiHttp.delete(organizationRouteService.batch.remove.expand({
                            organizationIds: data
                        }));
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicSkillRouteService
     * @description Baasic Skill Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicSkillRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing Skill properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain Skill subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicSkillRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profile/lookups/skills/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicSkillRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profile/lookups/skills'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicSkillRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profile/lookups/skills/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicSkillRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('profile/lookups/skills/batch'),
                    /**
                     * Parses remove route; this must be expanded with a list of skill Ids which need to be removed.
                     * @method batch.remove       
                     * @example baasicSkillRouteService.batch.remove.expand({skillIds: <skillIds>);              
                     **/
                    remove: uriTemplateService.parse('profile/lookups/skills/batch/{skillIds}'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicSkillRouteService.batch.create.expand({});              
                     **/
                    update: uriTemplateService.parse('profile/lookups/skills/batch')
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicSkillService
     * @description Baasic Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicSkillService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicSkillRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, skillRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create skill action has been performed; this action creates a new skill resource.
                 * @method        
                 * @example 
                 baasicSkillService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(skillRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of skill resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicSkillService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(skillRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the skill resource.
                 * @method        
                 * @example 
                 baasicSkillService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(skillRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a skill resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 baasicSkillService.remove(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update skill action has been performed; this action updates a skill resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 skill.description = '<description>';
                 baasicSkillService.update(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create skill action has been performed; this action creates new skill resources.
                     * @method batch.create       
                     * @example 
                     baasicSkillService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApiHttp.post(skillRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the update skill action has been performed; this action updates specified skill resources.
                     * @method batch.update       
                     * @example 
                     baasicSkillService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApiHttp.post(skillRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove skill resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicSkillService.batch.remove(skillIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        var data = ids.join(',');
                        return baasicApiHttp.delete(skillRouteService.batch.remove.expand({
                            skillIds: data
                        }));
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserEducationRouteService
     * @description Baasic User Education Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Education Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserEducationRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing education properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain education subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserEducationRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/educations/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserEducationRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/educations'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserEducationRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/educations/{id}/{?embed,fields}')
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserEducationService
     * @description Baasic User Education Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Education Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserEducationService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserEducationRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userEducationRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create user education action has been performed; this action creates a new user education resource.
                 * @method        
                 * @example 
                 baasicUserEducationService.create({
                 organizationName : '<organization-name>',
                 summary: '<summary>',
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(userEducationRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user education resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserEducationService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(userEducationRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user Education resource.
                 * @method        
                 * @example 
                 baasicUserEducationService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(userEducationRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user education resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserEducationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(education);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // education is a resource previously fetched using get action.
                 baasicUserEducationService.remove(education)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update user education action has been performed; this action updates a user education resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserEducationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(education);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // education is a resource previously fetched using get action.
                 education.degree = '<degree>';
                 baasicUserEducationService.update(education)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserProfileRouteService
     * @description Baasic User Profile Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Profile Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find user profile route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify user profile resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user profile subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserProfileRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserProfileRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{id}/{?embed,fields}'),
                /**
                 * Parses create user profile route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserProfileRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicUserProfileRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse,
                acl: {
                    /**
                     * Parses get user profile acl route; this URI template should be expanded with the Id of the user profile.					
                     * @method acl.get       
                     * @example 
                     baasicUserProfileRouteService.acl.get.expand(
                     {id: '<profile-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('profiles/{id}/acl/{?fields}'),
                    /**
                     * Parses update user profile acl route; this URI template should be expanded with the Id of the user profile.					
                     * @method acl.update       
                     * @example 
                     baasicUserProfileRouteService.acl.update.expand(
                     {id: '<profile-id>'}
                     );
                     **/
                    update: uriTemplateService.parse('profiles/{id}/acl/{?fields}'),
                    /**
                     * Parses deleteByUser user profile acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the user profile.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and user profile resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicUserProfileRouteService.acl.deleteByUser.expand({
                     id: '<profile-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse('profiles/{id}/acl/actions/{accessAction}/users/{user}/'),
                    /**
                     * Parses deleteByUser user profile acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the user profile.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and user profile resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicUserProfileRouteService.acl.deleteByRole.expand({
                     id: '<profile-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse('profiles/{id}/acl/actions/{accessAction}/roles/{role}/')
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserProfileService
     * @description Baasic User Profile Service provides an easy way to consume Baasic User Profile REST API end-points. In order to obtain a needed routes `baasicUserProfileService` uses `baasicUserProfileRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserProfileRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userProfileRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user profile resources matching the given criteria.
                 * @method        
                 * @example 
                 userProfileService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(userProfileRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user profile resource.
                 * @method        
                 * @example 
                 baasicUserProfileService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(userProfileRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the create user profile action has been performed; this action creates a new user profile resource.
                 * @method        
                 * @example 
                 baasicUserProfileService.create({
                 firstName : '<first-name>',
                 lastName : '<last-name>',
                 displayName: '<nick-name>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(userProfileRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update user profile action has been performed; this action updates a user profile resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(userProfile);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // userProfile is a resource previously fetched using get action.
                 userProfile.displayName = '<nick-name>';
                 baasicUserProfileService.update(userProfile)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user profile resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(userProfile);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // userProfile is a resource previously fetched using get action.
                 baasicUserProfileService.remove(userProfile)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `userProfileRouteService`.
                 * @method        
                 * @example baasicUserProfileService.routeService.get.expand(expandObject);
                 **/
                routeService: userProfileRouteService,
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified user profile resource.
                     * @method acl.get       
                     * @example 
                     baasicUserProfileService.acl.get({id: '<profile-id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.get(userProfileRouteService.acl.get.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified user profile resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<profile-id>'};
                     var aclObj =  {
                     actionId: '<action-id'>,
                     roleId: '<roleId>',
                     userId: '<userId>'
                     };
                     options[baasicConstants.modelPropertyName] = aclObj;
                     baasicUserProfileService.acl.update(options)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.put(userProfileRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and user profile resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicUserProfileService.acl.removeByUser('<profile-id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (profileId, action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and user profile resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicUserProfileService.acl.removeByRole('<profile-id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (profileId, action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByRole.expand(params));
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserSkillRouteService
     * @description Baasic User Skill Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Skill Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserSkillRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing Skill properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain Skill subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserSkillRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/skills/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserSkillRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/skills'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserSkillRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/skills/{id}/{?embed,fields}')
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserSkillService
     * @description Baasic User Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Skill Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserSkillService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserSkillRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userSkillRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create user skill action has been performed; this action creates a new user skill resource.
                 * @method        
                 * @example 
                 baasicUserSkillService.create({
                 skillName : '<skill-name>',  
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(userSkillRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user skill resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserSkillService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(userSkillRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user skill resource.
                 * @method        
                 * @example 
                 baasicUserSkillService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(userSkillRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user skill resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 baasicUserSkillService.remove(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update user skill action has been performed; this action updates a user skill resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 skill.description = '<description>';
                 baasicUserSkillService.update(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserWorkRouteService
     * @description Baasic User Work Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserWorkRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing work properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain work subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserWorkRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/work/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserWorkRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/work'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserWorkRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/work/{id}/{?embed,fields}')
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserWorkService
     * @description Baasic User Work Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserWorkService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserWorkRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userWorkRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the create user work action has been performed; this action creates a new user work resource.
                 * @method        
                 * @example 
                 baasicUserWorkService.create({
                 companyName : '<company-name>',  
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(userWorkRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user work resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserWorkService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(userWorkRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user work resource.
                 * @method        
                 * @example 
                 baasicUserWorkService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(userWorkRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user work resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(work);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // work is a resource previously fetched using get action.
                 baasicUserWorkService.remove(work)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update user work action has been performed; this action updates a user work resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(work);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // work is a resource previously fetched using get action.
                 work.companyName = '<company-name>';
                 baasicUserWorkService.update(work)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));

    /**
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

})(angular);