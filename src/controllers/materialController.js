/** Material Controller Class */
module.exports = class materialController {
  /**
   *
   * @param {*} createError
   */
  constructor(createError) {
    this._createError = createError;
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*} retorna um array com as urls dos materias
   */
  async getMaterialByShortname(req, res, next) {
    try {
      console.log('a')
      return res.status(200);
    } catch (e) {
      return next(this._createError(500, e));
    }
  }
};
