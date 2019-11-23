export const variable = 'Hello JS';
module.export = 'Module';

// es module

//some.module.js
module.export = 'Default some.module.js';

//Importação por padrão por caminhos absolutos
import SomeModule from "/some.module.js";
SomeModule; //Default some.module.js

//checaidade.js
module.export = 'Default checaidade.js';

import ChecaIdade from "/checaidade.js";
ChecaIdade; //Default checaidade.js