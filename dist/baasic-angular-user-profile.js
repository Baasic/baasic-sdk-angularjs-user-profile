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
                find: uriTemplateService.parse("profiles/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserProfileRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{?embed,fields}'),
                /**
                 * Parses create user profile route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserProfileRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("profiles"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicUserProfileRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
                get: function (options) {
                    return baasicApiHttp.get(userProfileRouteService.get.expand(baasicApiService.getParams(options)));
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
                routeService: userProfileRouteService
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