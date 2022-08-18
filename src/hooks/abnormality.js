const setupHooks = (mod, state) => {
	mod.hook('S_ABNORMALITY_BEGIN', 5, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (event.target === mod.game.me.gameId && event.id === state.ids.mb_abnormality) {
			state.MB_active = true;
		}
	});
	mod.hook('S_ABNORMALITY_END', 1, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (event.target === mod.game.me.gameId && event.id === state.ids.mb_abnormality) {
			MB_active = false;
		}		
	});
	mod.hook('S_ABNORMALITY_REFRESH', 2, (event) => {
		if (!state.enabled || mod.game.me.class !== 'sorcerer') {
			return;
		}
		if (event.target === mod.game.me.gameId && event.id === state.ids.mb_abnormality) {
			state.MB_active = true;
		}		
	});
};

module.exports = setupHooks;
