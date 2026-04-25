// Automation hooks: exposes module-scoped symbols on window for external
// drivers (Playwright, etc.). Only active when global.settings.expose is set.
// Kept in a single file to minimize merge surface against upstream.

import { global } from './vars.js';
import { gov_tasks, govern, govActive } from './governor.js';
import {
    actions,
    addAction,
    setAction,
    removeAction,
    postBuild,
    checkAffordable,
    checkCityRequirements,
} from './actions.js';
import {
    removeFromQueue,
    removeFromRQueue,
    calcQueueMax,
    calcRQueueMax,
} from './functions.js';

export function enableAutomationHooks(){
    if (!global.settings.expose){ return; }
    window.evolve_auto = {
        // Live (not cloned) state — mutating affects the running game.
        global,
        actions,
        gov_tasks,
        // Action dispatch.
        addAction,
        setAction,
        removeAction,
        postBuild,
        // Queue manipulation.
        removeFromQueue,
        removeFromRQueue,
        calcQueueMax,
        calcRQueueMax,
        // Governor.
        govern,
        govActive,
        // Affordability / requirement checks.
        checkAffordable,
        checkCityRequirements,
    };
}
