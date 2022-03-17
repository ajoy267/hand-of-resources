const Bike = require('../models/Bike');

module.exports = class BikeService {
  static async create({ brand, model, components }) {
    const bike = await Bike.insert({
      brand,
      model,
      components,
    });
    return bike;
  }
};
