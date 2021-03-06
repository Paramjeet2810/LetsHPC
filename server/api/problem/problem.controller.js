/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Problems              ->  index
 * POST    /api/Problems              ->  create
 * GET     /api/Problems/:id          ->  show
 * PUT     /api/Problems/:id          ->  upsert
 * PATCH   /api/Problems/:id          ->  patch
 * DELETE  /api/Problems/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Problem from './problem.model';
import Approach from '../approach/approach.model';
import Number from '../number/number.model';
import Perf from '../perf/perf.model';
import Machine from '../machine/machine.model';
import Category from '../category/category.model';
import _ from 'lodash';

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

// Gets a list of Problems
export function index(req, res) {
    return Problem.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Problem from the DB
export function show(req, res) {
    return Problem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Problem in the DB
export function create(req, res) {
    return Problem.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Problem in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Problem.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Problem in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Problem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Problem from the DB
export function destroy(req, res) {
    return Problem.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function approachesByProblem(req, res) {
    return Approach.find({ problem_id: req.params.id })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function approachesByProblemAndArchitecture(req, res) {
    return Approach.find({
            problem_id: req.params.id,
            architecture: req.params.arch
        })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function numbersByProblem(req, res) {
    return Approach.find({ problem_id: req.params.id })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Number.find()
            .where('approach_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function numbersByProblemAndArchitecture(req, res) {
    return Approach.find({
        problem_id: req.params.id,
        architecture: req.params.arch
    })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Number.find()
            .where('approach_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function perfsByProblem(req, res) {
    return Approach.find({ problem_id: req.params.id })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Perf.find()
            .where('approach_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function perfsByProblemAndArchitecture(req, res) {
    return Approach.find({
        problem_id: req.params.id,
        architecture: req.params.arch
    })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Perf.find()
            .where('approach_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function categoriesByProblem(req, res) {
    return Problem.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(response => Category.find({_id: response.category_id}))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function machinesByProblem(req, res) {
    return Approach.find({ problem_id: req.params.id })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Number.find()
            .where('approach_id')
            .in(response)
            .distinct('machine_id'))
        .then(handleEntityNotFound(res))
        .then(response => Machine.find()
            .where('_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function machinesByProblemAndArchitecture(req, res) {
    return Approach.find({
        problem_id: req.params.id,
        architecture: req.params.arch
    })
        .distinct('_id')
        .then(handleEntityNotFound(res))
        .then(response => Number.find()
            .where('approach_id')
            .in(response)
            .distinct('machine_id'))
        .then(handleEntityNotFound(res))
        .then(response => Machine.find()
            .where('_id')
            .in(response))
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
