const curry = (f, ...args) => f.length <= args.length ? f(...args) : (...more) => curry(f, ...args, ...more); // eslint-disable-line

export default curry;
