/*jslint node: true, es6: true,esversion: 6 */

class ModelConst {
  constructor() {
    this.Role = {
      CONTRIBUTOR: 'Contributor',
      ADMIN: "Admin"
    }
  }
}

let con = new ModelConst();
export default con;
