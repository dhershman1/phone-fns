const curry = (f, ...args) => f.length <= args.length ? f(...args) : (...more) => curry(f, ...args, ...more)

export default curry
