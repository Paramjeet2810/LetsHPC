/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below
    app.use('/api/user', require('./api/user'));
    app.use('/api/approach', require('./api/approach'));
    app.use('/api/category', require('./api/category'));
    app.use('/api/number', require('./api/number'));
    app.use('/api/problem', require('./api/problem'));
    app.use('/api/machine', require('./api/machine'));
    app.use('/api/penv', require('./api/penv'));
    app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
