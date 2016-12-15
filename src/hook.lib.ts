import * as Promise                 from 'bluebird';

/**
 * Hooks that are wrapped contain this
 */
export interface HooksWrapped<pre, actor,post> {
    pre: Array<pre>;
    actor: Array<actor>;
    post: Array<post>;
}

/**
 * Hooks that only contains actors
 */
export interface HooksActor<actor> {
    actor: Array<actor>;
}

/**
 * Builded hookable functions base
 */
export interface BaseHook extends Function {
    (...args: Array<any>): Promise<any>;
}
