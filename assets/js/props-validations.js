export const hasProperties = (obj, ...properties) => properties.every(property => obj.hasOwnProperty(property))

export const isOneOf = (value, ...possibilities) => possibilities.some(possibility => possibility === value)

export const isMinLength = (value, minLength) => value.length >= minLength
