const { skillMap } = require('./src/skills.js');

const setupHooks = (mod, state) => {
	mod.hook('S_ACTION_STAGE', 9, { order: -999999 }, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}

		if (state.boss.id === event.gameId) { 
			state.boss.loc = event.loc;
			state.boss.w = event.w;
		}		

		if (event.gameId === mod.game.me.gameId && event.skill.id === skillMap.arcane_press.id && event.stage === 2) {
			mod.send('C_PRESS_SKILL', 4, {
				skill: {
					reserved: 0,
					npc: false,
					type: 1,
					huntingZoneId: 0,
					id: skillMap.arcane_press.id
				},
				press: false,
				loc: state.myPosition,
				w: state.myAngle								
			})
		}

		if(event.gameId === mod.game.me.gameId && ((Math.floor(event.skill.id / 10000)) === 39) && event.stage === 2) {
			mod.send('S_ACTION_END', 5, {
				gameId: event.gameId,
				loc: {
					x: event.loc.x,
					y: event.loc.y,
					z: event.loc.z
				},
				w: event.w,
				templateId: event.templateId,
				skill: event.skill.id,
				type: 999999,
				id: event.id
			})
			return;
		}

    if (event.gameId === mod.game.me.gameId && event.stage > 0) {
			mod.send('S_ACTION_END', 5, {
				gameId: event.gameId,
				loc: {
					x: event.loc.x,
					y: event.loc.y,
					z: event.loc.z
				},
				w: event.w,
				templateId: event.templateId,
				skill: event.skill.id,
				type: 999999,
				id: event.id
			})
		}			
	});

	mod.hook('S_ACTION_END', 5, event => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (state.boss.id == event.gameId) { 
			state.boss.loc = event.loc;
			state.boss.w = event.w;
		}
	});
};

module.exports = setupHooks;
