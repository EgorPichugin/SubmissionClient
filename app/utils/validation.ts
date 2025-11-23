export interface ErrorInstance {
    fieldName: string;
    errorMessage: string;
}

function createRule(
  validationFunction: (value: string | string[]) => boolean,
  errorMessage: string
) {
  const rule = ((value: string | string[]) => validationFunction(value)) as ((value: string | string[]) => boolean) & {
    errorMessage: string;
  };

  rule.errorMessage = errorMessage;
  return rule;
}

const isEmptyString = createRule(
    (value) => typeof value === 'string' && value.trim().length === 0,
    'cannot be empty.'
);

const isNullOrUndefined = createRule(
  (value) => value === null || value === undefined || value === '',
  'cannot be null, undefined, or empty.'
);

const isCollectionEmpty = createRule(
  (value) => Array.isArray(value) && value.length === 0,
  'collection cannot be empty.'
);

export const validations = {
  isEmptyString,
  isNullOrUndefined,
  isCollectionEmpty
};
