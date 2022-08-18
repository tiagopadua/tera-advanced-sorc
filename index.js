const { skillMap } = require('./src/skills.js');
const setupAbnormalityHooks = require('./src/hooks/abnormality.js');
const setupCooltimeHooks = require('./src/hooks/cooltime.js');
const setupProjectileHooks = require('./src/hooks/projectile.js');
const setupNPCHooks = require('./src/hooks/npc.js');
const setupSkillHooks = require('./src/hooks/skill.js');
const setupActionHooks = require('./src/hooks/action.js');
const setupPlayerHooks = require('./src/hooks/player.js');

// Current processed state, updated from within the hooks
const state = {
	cid: null,
	myPosition: null,
	myAngle: null,
	enabled: true,
	distance: 1000,
	dolance: false,
	replaced: false,
	fusion_enabled: false,
	implosion_enabled: false,
	MB_active: false,
	bs: false,
	hasFireBuff: false,
	hasIceBuff: false,
	hasArcaneBuff: false,
	boss: {
		id: null,
		loc: null,
		w: null,
	},
	monsters: [],
	block_hit: false,
	ids: {
		paint: 160800,
		mb_abnormality: 503061,
		fusion_category: 5036,
		implosion_category: 5039,
		arcane_press_id: 41200,
		stun_trap: 30300,
	}
};

module.exports = function supersorc(mod) {
	mod.command.add('sorc', () => {
		state.enabled = !state.enabled
		mod.command.message(`Salchy's advanced sorc mod is now ${(state.enabled) ? 'en' : 'dis'}abled.`)
	})
	
	mod.hook('S_LOGIN', 14, (event) => {
		state.cid = event.gameId
	})

	setupAbnormalityHooks(mod, state);
	setupCooltimeHooks(mod, state);
	setupNPCHooks(mod, state);
	setupProjectileHooks(mod, state);
	setupSkillHooks(mod, state);
	setupActionHooks(mod, state);
	setupPlayerHooks(mod, state);	
};
