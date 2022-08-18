const skillMap = require('../skills.js');

const setupHooks = (mod, state) => {
	mod.hook('S_START_COOLTIME_SKILL', 3, { order: -999999 }, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}

		Object.keys(skillMap).forEach(skillName => {
			const skill = skillMap[skillName];
			if (event.id !== skill.id) {
				return;
			}
			skill.startCooldown(event.cooldown);
		});
	});
};

module.exports = setupHooks;
