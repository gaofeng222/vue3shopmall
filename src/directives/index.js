import vHighlight from "./modules/v-highlight";
import vLazy from "./modules/v-lazy";

const directives = [vHighlight, vLazy];

function createDirectives(app) {
  for (const directive of directives) {
    app.directive(directive.name, directive);
  }
}

export default createDirectives;
