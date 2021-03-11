Entry.playground.blockMenu._generateCategoryCode = function (category) {
	const _this = this;
	if (!this._categoryData) return;
	var code = this.code;
	var blocks = this._getCategoryBlocks(category);
	if (!blocks) return;
	//this._categories.push(category);
	var index;
	if (category === 'func') {
		var threads = this.code.getThreadsByCategory('func');
		if (threads.length) {
				index = this.code.getThreadIndex(threads[0]);
		}
	}
	this._buildCategoryCodes(blocks, category).forEach(function (t) {
		if (!t || !t[0]) return;
		t[0].x = -99999;
		_this._createThread(t, index);
		if (index !== undefined) index++;
			delete t[0].x;
	});
	code.changeEvent.notify();
}
function update()
{
	Entry.playground.blockMenu.svgBlockGroup.innerHTML = "";
	Entry.playground.blockMenu.code._data = [];
	Entry.playground.blockMenu._categoryData.forEach(data => { if (data.category != "arduino")
		 Entry.playground.blockMenu._generateCategoryCode(data.category); });//왜인지 arduino는 뻗는다.
}
function change(name, data, func)
{
	data.forEach(item => {
		Entry.block[name].params[item.num] = {type: 'Block', accept: 'string'};
		Entry.block[name].def.params[item.num] = item.default;
	});
	Entry.block[name].func = func;
}

change("set_visible_answer", [{num : 0, default : "숨기기"}], (sprite, script) =>
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
update();
