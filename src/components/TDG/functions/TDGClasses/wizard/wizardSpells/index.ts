import defensiveCharms from "./defensiveCharms";
import defensiveRunes from "./defensiveRunes";
import flyingCharms from "./flyingCharms";
import fireball from "./fireball";
import magicBolt from "./magicBolt";
import golem from "./golem";
import teleport from "./teleport";
import functionsTDG from '../../..';
const { createTDGClassAbilities } = functionsTDG;

const wizardSpells = createTDGClassAbilities(
    null, null,
    defensiveCharms, defensiveRunes,
    magicBolt, fireball,
    flyingCharms,
    golem, teleport
);

export default wizardSpells;