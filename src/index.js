import { State } from './state/state';
import { Types } from './types/types';
import { GolguaManager } from './golgua/golgua';
import { createMaker } from './maker/maker';

const Golgua = {
  Types,
  State,
  createMaker,
  searchMaker: GolguaManager.searchMaker,
};

export default Golgua;
