export function exampleFunction(input: string): string {
    const result = utilityFunction(input);
    return `Processed result: ${result}`;
}

import { utilityFunction } from './utils';