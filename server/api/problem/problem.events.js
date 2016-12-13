/**
 * Thing model events
 */

'use strict';

import { EventEmitter } from 'events';
import Problem from './problem.model';
var ProblemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProblemEvents.setMaxListeners(0);

// Model events
var events = {
    save: 'save',
    remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
    let event = events[e];
    Problem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
    return function(doc) {
        ProblemEvents.emit(`${event}:${doc._id}`, doc);
        ProblemEvents.emit(event, doc);
    };
}

export default ProblemEvents;
