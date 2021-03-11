(async () => {
	console.log("둥긂 불러오는 중...");
	const util = await import("https://vlzi.github.io/entry/둥긂_utils.js");//await import("./둥긂_utils.js");
	const vc = Entry.variableContainer;
	util.change("set_visible_answer", [{num : 0, default : "숨기기"}], (sprite, script) => {
		const bool = script.getValue('BOOL', script);
		if (bool === '숨기기') {
		Entry.container.inputValue.setVisible(false);
		} else if (bool === '보이기'){
			Entry.container.inputValue.setVisible(true);
		}
		else util.raise("숨기기/보이기를 입력하세요.");
		return script.callReturn();
	});
	util.change("get_variable", [{num : 0, default : vc.variables_.length ? vc.variables_[0].name_ : "대상 없음"}], (sprite, script) => {
		const variable = vc.getVariableByName(script.getValue("VARIABLE"));
		if (variable) return variable.getValue();
		else util.raise("변수를 찾을 수 없습니다.");
	}
	util.update();
	console.log("둥긂 불러오기 완료");
	console.log(Entry.playground.blockMenu._categoryData);
})();
