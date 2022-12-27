const catsData = [];

exports.create = jest.fn(async ({ name, age }) => {
  const newCat = {
    _id: catsData.length.toString(),
    name,
    age,
  };

  catsData.push(newCat);

  return newCat;
});

exports.find = jest.fn().mockResolvedValue(catsData);

exports.findById = jest.fn(async (id) => {
    const cat = catsData.find((cat) => cat.id === id);

    return cat || null;
});
