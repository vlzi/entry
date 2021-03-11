(async () => {
	console.log("둥긂 불러오는 중...");
	const util = await import("./둥긂_utils.js");
	util.change("set_visible_answer", [{num : 0, default : "숨기기"}], (sprite, script) =>
	{
		const bool = script.getValue('BOOL', script);
		if (bool === '숨기기') {
		Entry.container.inputValue.setVisible(false);
		} else if (bool === '보이기'){
			Entry.container.inputValue.setVisible(true);
		}
		else {
			Entry.toast.alert("필드 값 오류", "숨기기/보이기를 입력하세요.", true);
			throw new Error();
		}
		return script.callReturn();
	});
	util.update();
	console.log("둥긂 불러오기 완료");
	console.log(Entry.playground.blockMenu._categoryData);
})();
