var nameCheck = require('..');

// テスト用関数を返す 
function helper (testFn) {
  if (!arguments.length) {
    testFn = nameCheck;
  }
  if (typeof testFn !== 'function') {
    throw new Error('対象のメソッドが見つかりません');
  }

  // 例外のタイプ
  var _hint = null;
 
  return function test(value, hint) {

    if (2 <= arguments.length) {
      _hint = hint;
    }

    var msg;

    // 成功を期待
    if (!_hint) {
      testFn(value, false);
      return;
    }

    // 失敗を期待
    try {
      testFn(value, false);
      msg = '"' +  value + '": It was valid, but it must be invalid.';
      throw new Error(msg);
    } catch (e) {
      if (e.hint !== _hint) {
        console.log(e.hint + ' !== ' + _hint);
        throw e;
      }
    }

  };
}

module.exports = exports = helper;