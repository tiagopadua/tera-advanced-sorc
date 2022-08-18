const { skillMap, skillsByOrder, getSkillInfo, castSkill } = require('../skills.js');

const setupHooks = (mod, state) => {
	mod.hook('C_START_SKILL', 7, { order: -Infinity }, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}

		state.myPosition = event.loc;
		state.myAngle = event.w;
		state.bs = false;

		if ((event.skill.id === stun_trap || event.skill.id === state.ids.paint)) {
			state.bs = event.skill.id === state.ids.paint;

			if (state.bs && !bossloc) {
				return false;
			}
			if(!skillMap.lances.isInCooldown) {
				state.dolance = true;
			}

			const replacedSkillId = skillsByOrder.some(skill => {
				if (skill.shouldCast(state)) {
					event.skill.id = skill.id;
					if (state.bs) {
						event.dest = state.boss.loc;
					} else {
						castSkill(skill.id, distance, 0, state)
					}
					return true; // break loop (.some)
				}
				return false; // continue loop (.some)
			});

			if(!isCD_arcane && !replacedSkillId) {
				mod.send('C_PRESS_SKILL', 4, {
					skill: {
						reserved: 0,
						npc: false,
						type: 1,
						huntingZoneId: 0,
						id: skillMap.arcane_press.id,
					},
					press: true,
					loc: state.myPosition,
					w: state.myAngle,
				})
				return false;
			}

			if (state.dolance) {
				state.dolance = false
				castSkill(skillMap.lances.id, distance, 0, state);
			}

			return replacedSkillId;
		}

		if ((event.skill.id === stun_trap || event.skill.id === state.ids.paint) && !bossloc) {
			return false;
		}

		let sInfo = getSkillInfo(event.skill.id)		
		switch(sInfo.group) {
			case 4:
				state.dolance = true;
				break;
			case 30:
				state.dolance = true;
				break;
			case 33:
				state.dolance = true;
				break;
			default:
				break;
		}

		if (state.dolance) {
			state.dolance = false;
			castSkill(skillMap.lances.id, distance, 0, state);
		}		
	});

  mod.hook('S_SKILL_CATEGORY', 4, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (event.category === state.ids.fusion_category) {
			state.fusion_enabled = event.enabled;
		}
		if (event.category === implosion_category) {
			state.implosion_enabled = event.enabled;
		}				
	});

	mod.hook('C_START_INSTANCE_SKILL', 7, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		state.myPosition = event.loc;
		state.myAngle = event.w;
	});

	mod.hook('C_PRESS_SKILL', 4, { filter: { fake: false } }, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		state.myPosition = event.loc;
		state.myAngle = event.w;
		if (event.skill.id === skillMap.arcane_press.id && !event.press) {
			return false;
		}
	});
};

module.exports = setupHooks;
