var test = require('./test-helper')();

test('name'                               , null);
test('array');
test('abc');
test('a1234');
test('a_b_c');
test(String('abc'));
test('a123456789a123456789a123456789a1');
test('extend');


test(void 0                               , 'undefined');

test(1                                    , 'type');
test(null);
test(new String('abc'));



test('123'                                , 'regexp');
test('abc efg');
test('_a');
test('a_');
test('');
test('a123456789a123456789a123456789a12');



test('Array'                              , 'keywords');
test('function');
test('Node');
test('extends');