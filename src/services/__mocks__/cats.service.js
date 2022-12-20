const catsData = [{ _id: "id-1", name: "John", age: 8 }];

exports.getAll = jest.fn().mockResolvedValue(catsData);

exports.getById = jest.fn((id) => {
    const cat = catsData.find((catItem) => catItem._id === id);
    return cat;
});

exports.create = jest.fn((name, age) => {
  const cat = {
    _id: catsData._id,
    name,
    age,
  }
  return cat;
});

exports.delete = jest.fn((id) => {
  const cat = catsData.find((catItem) => catItem._id === id);
  return cat;
});