(async () => {
	console.log("둥긂 불러오는 중...");
	const util = await import("https://vlzi.github.io/entry/둥긂_utils.js");//await import("./둥긂_utils.js");
	const vc = Entry.variableContainer;
	const fvname = () => vc.variables_.length ? vc.variables_[0].name_ : "대상 없음";
	function getv(name) {
		const variable = vc.getVariableByName(name);
		if (variable) return variable;
		else util.raise("변수를 찾을 수 없습니다.");
	}
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
	util.change("get_variable", [{num : 0, default : fvname()}], (sprite, script) => getv(script.getValue("VARIABLE")).getValue());
	util.change("change_variable", [{num : 0, default : fvname()}], function func(sprite, script) { var value = script.getValue('VALUE', script); var fixed = 0; if (value == false && typeof value === 'boolean') { throw new Error('Type is not correct'); } var variable = getv(script.getValue("VARIABLE", script)); var isRealTime_ = variable.isRealTime_; var variableValue = variable.getValue(); var sumValue; if (Entry.Utils.isNumber(value) && variable.isNumber()) { value = Entry.parseNumber(value); variableValue = Entry.parseNumber(variableValue); fixed = Entry.getMaxFloatPoint([value, variable.getValue()]); sumValue = new BigNumber(value).plus(variableValue).toNumber().toFixed(fixed); } else { sumValue = "".concat(variableValue).concat(value); } if (!isRealTime_) { variable.setValue(sumValue); return script.callReturn(); } else { return new Promise( /*#__PURE__*/function () { var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) { return _regenerator["default"].wrap(function _callee$(_context) { while (1) { switch (_context.prev = _context.next) { case 0: _context.prev = 0; _context.next = 3; return variable.setValue(sumValue); case 3: resolve(); _context.next = 9; break; case 6: _context.prev = 6; _context.t0 = _context["catch"](0); reject(_context.t0); case 9: case "end": return _context.stop(); } } }, _callee, null, [[0, 6]]); })); return function (_x, _x2) { return _ref.apply(this, arguments); }; }()); } });
	util.change("set_variable", [{num : 0, default : fvname()}], function func(sprite, script) { var value = script.getValue('VALUE', script); var variable = getv(script.getValue("VARIABLE", script)); var isRealTime_ = variable.isRealTime_; if (!isRealTime_) { variable.setValue(value); return script.callReturn(); } else { return new Promise( /*#__PURE__*/function () { var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) { return _regenerator["default"].wrap(function _callee2$(_context2) { while (1) { switch (_context2.prev = _context2.next) { case 0: _context2.prev = 0; _context2.next = 3; return variable.setValue(value); case 3: resolve(); _context2.next = 9; break; case 6: _context2.prev = 6; _context2.t0 = _context2["catch"](0); reject(_context2.t0); case 9: case "end": return _context2.stop(); } } }, _callee2, null, [[0, 6]]); })); return function (_x3, _x4) { return _ref2.apply(this, arguments); }; }()); } });
	util.change("show_variable", [{num : 0, default : fvname()}], function func(sprite, script) { var variableId = script.getField('VARIABLE', script); var variable = getv(script.getValue("VARIABLE", script)); variable.setVisible(true); variable.updateView(); return script.callReturn(); });
	util.change("hide_variable", [{num : 0, default : fvname()}], function func(sprite, script) { var variableId = script.getField('VARIABLE', script); var variable = getv(script.getValue("VARIABLE", script)); variable.setVisible(false); return script.callReturn(); });
	util.update();
	console.log("둥긂 불러오기 완료");
	console.log(Entry.playground.blockMenu._categoryData);
})();
