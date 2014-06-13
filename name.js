/*grunt-m2r*/
/*
 * Copyright(c) 2014 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

'use strict';

var CLIENT_CLASSES = 'ApplicationCache,ArrayBuffer,ArrayBufferView,Attr,' +
  'Audio,BeforeUploadEvent,Blob,BlobBuilder,Button,Canvas,CanvasGradient,' +
  'CanvasPattern,CanvasRenderingContext2D,ClientRect,CloseEvent,Comment,' +
  'Console,ConsoleCommandLine,CSSRule,CSSStyleDeclaration,CSSStyleSheet,' +
  'DataTransfer,DataView,Document,DocumentFragment,DocumentType,' +
  'DOMException,DOMImplementation,DOMSettableTokenList,DOMTokenList,' +
  'Element,ErrorEvent,Event,EventSource,EventTarget,FieldSet,File,' +
  'FileError,FileReader,FileReaderSync,Form,FormControl,FormData,' +
  'FormValidity,Geocoordinates,Gelocation,GeolocationError,Geoposition,' +
  'HashChangeEvent,Histroy,HTMLCollection,HTMLFormControlsCollection,' +
  'HTMLOptionsCollection,IFrame,Image,ImageData,Input,jQuery,Label,Link,' +
  'Location,MediaElement,MediaError,MessageChannel,MessageEvent,' +
  'MessagePort,Meter,Navigator,Node,NodeList,Option,Output,' +
  'PageTransitionEvent,PopStateEvent,ProcessingInstruction,' +
  'XMLHttpRequestUpload,ProgressEvent,Screen,Script,Select,Storage,' +
  'StorageEvent,Style,Table,TableCell,TableRow,TableSection,Text,TextArea,' +
  'TextMetrics,TimeRanges,TypedArray,URL,Video,WebSocket,Window,Worker,' +
  'WorkerGlobalScope,WorkerLocation,WorkerNavigator,XMLHttpRequest,';

var CLIENT_OBJECT = 'document,window,alert,console,';

var CORE_CLASSES = 'Arguments,Array,Boolean,Date,Error,EvalError,Function,' +
  'Global,JSON,Math,Number,Object,RangeError,ReferenceError,RegExp,String,' +
  'SyntaxError,TypeError,URIError,';

var GLOBAL_FUNCTIONS = 'decodeURI,decodeURIComponent,encodeURI,' +
  'encodeURIComponent,escape,eval,isFinite,isNaN,parseFloat,' +
  'parseInt,unescape,';

var RESERVED = 'break,case,catch,continue,debugger,default,delete,' +
  'do,else,finally,for,function,if,in,instanceof,new,return,switch,this,' +
  'throw,throws,try,typeof,var,void,while,with,';

var STRICT_WORD = 'class,enum,export,extends,import,super,';

var ES5 = 'const,implements,interface,let,package,private,protected,' +
  'public,static,yield,';

var ES6_OVER = 'abstract,boolean,byte,char,double,final,float,goto,' +
  'int,long,native,short,synchronized,transient,volatile,';

var LITERALS = 'arguments,null,true,false,undefined,NaN,Infinity,';

var NODE_JS = 'exports,require,module,__filename,__dirname,' +
  'DTRACE_NET_SERVER_CONNECTION,DTRACE_NET_STREAM_END,' +
  'DTRACE_NET_SOCKET_READ,DTRACE_NET_SOCKET_WRITE,' +
  'DTRACE_HTTP_SERVER_REQUEST,DTRACE_HTTP_SERVER_RESPONSE,' +
  'DTRACE_HTTP_CLIENT_REQUEST,DTRACE_HTTP_CLIENT_RESPONSE,' +
  'global,process,GLOBAL,root,Buffer,' +
  'setTimeout,setInterval,clearTimeout,clearInterval,setImmediate,' +
  'clearImmediate,';

var EVENTEMITTER = '_events,domain,_maxListeners,setMaxListeners,emit,' +
  'addListener,on,once,removeListener,removeAllListeners,listeners,';

var PLUGINS = '$,_,requirejs,define';

// 予約語の為にフィールド名、プロパティ名、
var KEYWORDS = (CLIENT_CLASSES + CLIENT_OBJECT +
                CORE_CLASSES + GLOBAL_FUNCTIONS + RESERVED +
                STRICT_WORD + ES5 + ES6_OVER + LITERALS +
                NODE_JS + EVENTEMITTER + PLUGINS
                ).split(',').sort();

// 重複チェック
// console.log(KEYWORDS.filter(function(x,i,a){return a.indexOf(x) !== i;}));
// 数
// console.log(KEYWORDS.length);
// 全表示 README用
// KEYWORDS.forEach(function(x){console.log('  + ' + x);});

/**
 * 名称系のルール
 * @property {RegExp} REG_NAME
 */
var REG_NAME = /^[a-z]([_0-9a-z]{0,30}[0-9a-z])?$/i;


/**
 * 予約語かどうかを検証します
 * 検証に失敗した場合は例外が発生します
 * @method nameCheck
 * @param  {String}   value
 * @param  {Boolean}  output   例外のかわりにfalseを出力します
 * @param  {String}   errName  ※隠し引数 エラーメッセージでの値の種類の名称を指定
 * @param  {Regexp}   reg      ※隠し引数 個別に使用する正規表現
 * @param  {Function} regCall  ※隠し引数 正規表現をパスした際にマッチさせた配列を検証する関数
 * @param  {Array}    invalids ※隠し引数 個別に予約後とする配列
 * @return {Boolean}  result
 */
function nameCheck (name, output) {

  var err;
  var errName = arguments[2] || '入力値';

  // 未設定
  if (name === void 0) {
    if (output) {return false;}
    err = new TypeError(errName + 'が未設定です');
    err.hint = 'undefined';
    throw err;
  }

  // 文字列違反
  if (typeof name !== 'string') {
    if (output) {return false;}
    err = new TypeError(name + 'は文字列ではありません');
    err.hint = 'type';
    throw err;
  }

  // 正規表現
  var reg = arguments[3] || REG_NAME;
  var matches = name.match(reg);
  if (!matches) {
    if (output) {return false;}
    err = new Error(name + 'は' + errName + 'に使用出来ない名称です');
    err.hint = 'regexp';
    throw err;
  }

  // 正規表現の結果をコールバック関数で検証
  var regCall = arguments[4];
  if (regCall && !regCall(matches)) {
    if (output) {return false;}
    err = new Error(name + 'は' + errName + 'に使用出来ない名称です');
    err.hint = 'regcall';
    throw err;
  }

  // 無効な名称
  var invalids = arguments[5];
  if (invalids && ~invalids.indexOf(name)) {
    if (output) {return false;}
    err = new Error(name + 'は' + errName + 'に使用出来ない名称です');
    err.hint = 'invalids';
    throw err;
  }

  // 予約語
  if (~KEYWORDS.indexOf(name)) {
    if (output) {return false;}
    err = new Error('予約語です');
    err.hint = 'keywords';
    throw err;
  }

  return true;
}

/**
 * データソース名の検証
 * @method datasource
 * @param  {String}   value
 */
nameCheck.datasource = datasourceNameCheck;
function datasourceNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : false;
  nameCheck(name, output, 'データソース名');
}

/**
 * ダイアグラムの拡張メソッドやプロパティ名の検証
 * @method diagramExtend
 * @param  {String}   name
 */
nameCheck.diagramExtend = diagramExtendNameCheck;
function diagramExtendNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : false;
  nameCheck(name, output, 'ダイアグラム拡張機能名');
}

/**
 * フィールド名の検証
 * @method field
 * @param  {String}  name
 */
nameCheck.field = fieldNameCheck;
function fieldNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : false;
  nameCheck(name, output, 'フィールド名');
}

/**
 * バインディングルール
 * @property {RegExp} REG_BINDING
 */
var REG_BINDING = /^(\$)?[a-z]([_0-9a-z]{0,30}[0-9a-z])?(\$[a-z]{1,32})?$/i;

/**
 * バインディングルール２
 * @method bindingRegCall
 * @param  {Array}   matches
 * @return {Boolean} result
 */
function bindingRegCall (matches) {
  return !(matches[1] && matches[3]);
}

/**
 * ダイアグラムスコープでthisを追加するかどうかを確認
 * @method vmDiagram
 * @param  {String}  name
 * @return {Boolean} result
 */
nameCheck.vmDiagram = vmDiagramNameCheck;
var DIA_SCOPE = ['$vm'];
function vmDiagramNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : true;
  return nameCheck(name, output, null, REG_BINDING, bindingRegCall, DIA_SCOPE);
}

/**
 * データソーススコープでthisを追加するかどうかを確認
 * @method vmDatasource
 * @param  {String}  name
 * @return {Boolean} result
 */
nameCheck.vmDatasource = vmDatasourceNameCheck;
var DS_SCOPE = ['$diagram', '$vm'];
function vmDatasourceNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : true;
  return nameCheck(name, output, null, REG_BINDING, bindingRegCall, DS_SCOPE);
}

/**
 * 行スコープでthisを追加するかどうかを確認
 * @method vmRow
 * @param  {String}  name
 * @return {Boolean} result
 */
nameCheck.vmRow = vmRowNameCheck;
var ROW_SCOPE = ['$diagram', '$vm'];
function vmRowNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : true;
  return nameCheck(name, output, null, REG_BINDING, bindingRegCall, ROW_SCOPE);
}

/**
 * アイテムスコープでthisを追加するかどうかを確認
 * @method vmItem
 * @param  {String}  name
 * @return {Boolean} result
 */
nameCheck.vmItem = vmItemNameCheck;
var ITEM_SCOPE = ['$diagram', '$vm'];
function vmItemNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : true;
  return nameCheck(name, output, null, REG_BINDING, bindingRegCall, ITEM_SCOPE);
}

/**
 * フィールドスコープでthisを追加するかどうかを確認
 * @method vmField
 * @param  {String}  name
 * @return {Boolean} result
 */
nameCheck.vmField = vmFieldNameCheck;
var FIELD_SCOPE = ['$diagram', '$vm'];
function vmFieldNameCheck (name) {
  var output = 2 <= arguments.length ? arguments[1] : true;
  return nameCheck(name, output, null, REG_BINDING, bindingRegCall, FIELD_SCOPE);
}

module.exports = exports = nameCheck;
