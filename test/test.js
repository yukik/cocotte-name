var nameCheck = require('..');

var assert = require('assert');

var pass = [
  'name',
  'array',
  'abc',
  'Abc',
  'a1234',
  'a_b_c',
  String('abc'),
  'a123456789a123456789a123456789a1'
];
test(pass);

var err1 = [
  1,
  null,
  new String('abc')
];
test(err1, '文字列ではありません');

var err2 = [
  '123',
  'abc efg',
  '_a',
  'a_',
  '',
  'a123456789a123456789a123456789a12'
];
test(err2, 'フォーマットエラーです');

var err3 = [
  'Array',
  'function',
  'Node'
];
test(err3, '予約語です');


// test
function test(input, message) {
  input.forEach(function (s) {
    if (message) {
      try {
        assert(!nameCheck(s));
      } catch(e) {
        assert(e.message === message, s + ': ng');
      }
    } else {
      try {
        assert(nameCheck(s));
      } catch (e) {
        assert(false, s + ': ng');
      }
    }
  });
}

console.log('test ok');