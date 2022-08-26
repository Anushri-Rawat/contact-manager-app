module.exports = (Obj, ...allowedFileds) => {
  let output = {};
  Object.keys(Obj).forEach((el) => {
    if (allowedFileds.includes(el)) output[el] = Obj[el];
  });
  return output;
};
