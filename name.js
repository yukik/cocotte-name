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

var REG = /^[a-z]([_0-9a-z]{0,30}[0-9a-z])?$/i;

/**
 * 名称確認
 * @method nameCheck
 * @param  {String}  value
 * @param  {Boolean} output
 * @return {Boolean} result
 */
function nameCheck (value, output) {
  var err;

  // 文字列ではない
  if (typeof value !== 'string') {
    if (output) {
      return false;
    }
    err = new TypeError('文字列ではありません');
    throw err;
  }

  // フォーマットエラー
  if (!REG.test(value)) {
    if (output) {
      return false;
    }
    err = new TypeError('フォーマットエラーです');
    throw err;
  }

  // 予約語
  if (~KEYWORDS.indexOf(value)) {
    if (output) {
      return false;
    }
    err = new Error('予約語です');
    throw err;
  }

  return true;
}

module.exports = exports = nameCheck;
