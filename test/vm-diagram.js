var check = require('..').vmDiagram;
var test = require('./test-helper')(check);

test('abca'                              , null);
test('name');
test('array');
test('a1234');
test('a_b_c');
test(String('abc'));
test('a123456789a123456789a123456789a1');
test('$after');
test('name$after');

test(void 0                               , 'undefined');

test(1                                    , 'type');
test(null);
test(new String('abc'));


test('123'                                , 'regexp');
test('abc efg');
test('_a');
test('a_');
test('');
test('name$after$aaa');
test('name$');


test('$after$aaa'                         , 'regcall');



test('Array'                              , 'keywords');
test('function');
test('Node');