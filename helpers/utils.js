exports.removeItemFromArray = (arr, item) => {
  const getIndex = (element) => element.name === item;

  let i = arr.findIndex(getIndex);

  if (i !== -1) {
    arr.splice(i, 1);
    return true;
  } else {
    return false;
  }
};
