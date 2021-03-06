
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/perf              ->  index
 * POST    /api/perf              ->  create
 * GET     /api/perf/:id          ->  show
 * PUT     /api/perf/:id          ->  upsert
 * PATCH   /api/perf/:id          ->  patch
 * DELETE  /api/perf/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Perf from './perf.model';
import Approach from '../approach/approach.model';
import Problem from '../problem/problem.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Numbers
export function index(req, res) {
    return Perf.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Number from the DB
export function show(req, res) {
    return Perf.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Number in the DB
export function create(req, res) {
    return Perf.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Number in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Perf.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Number in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Perf.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Number from the DB
export function destroy(req, res) {
    return Perf.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function problemByPerf(req, res) {
    return Perf.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(response => Approach.findById(response.approach_id))
        .then(handleEntityNotFound(res))
        .then(response => Problem.findById(response.problem_id))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function approachByPerf(req, res) {
    return Perf.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(response => Approach.findById(response.approach_id))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}