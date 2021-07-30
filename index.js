function pPipe(...functions) {
  if (functions.length === 0) {
    throw new Error('Expected at least one argument');
  }

  let context;

  async function exec(input) {
    let currentValue = input;

    for (let function_ of functions) {
      if (context) {
        function_ = function_.bind(context);
      }

      currentValue = await function_(currentValue); // eslint-disable-line no-await-in-loop
    }

    return currentValue;
  }

  exec.context = context_ => {
    context = context_;

    return exec;
  };

  return exec;
}

module.exports = pPipe;
