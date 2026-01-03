/**
 * RegExp that matches any whitespace
 */
export const WHITESPACE_REGEXP: RegExp = /^\s$/;

/**
 * RegExp that is used to match javascript identifier start symbol
 */

export const IDENTIFIER_START_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$]$/;

/**
 * RegExp thatt is used to match javascript identifier symbols after the first symbol
 */

export const IDENTIFIER_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$0-9]$/;
