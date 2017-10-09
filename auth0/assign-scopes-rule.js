function (user, context, callback) {
    var _ = require('lodash');
    var req = context.request;
    // Get requested scopes
    var scopes = (req.query && req.query.scope) || (req.body && req.body.scope);
    // Normalize scopes into an array
    scopes = (scopes && scopes.split(" ")) || [];
    // Restrict the access token scopes according to the current user
    context.accessToken.scope = restrictScopes(user, scopes);
    callback(null, user, context);

    function restrictScopes(user, requested) {
        var default_scopes = ['openid', 'profile'];
        // Full list of scopes available to user
        var user_scopes = user.app_metadata && user.app_metadata.scopes || [];
        return _.intersection(user_scopes.concat(default_scopes), requested);
    }
}