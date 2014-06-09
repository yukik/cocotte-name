cocotte-name
============

property name check

変数名が使用可能かを確認します。  
このモジュールは、viewで処理を記述する際に使用できるフィールドを指定するために使用します。

# 条件

使用可能な条件は以下の通りです

  + 後述する予約語ではない
  + 半角英数文字と_で構成される
  + 英字で始まる
  + _を最後にする事はできない
  + 1文字以上32文字以内である


# 使用方法

要件を満たさない場合は例外を発生させます

```
var nameCheck = require('cocotte-name');

nameCheck('abc');  // pass
nameCheck('123');  // throw error
nameCheck('ab_c'); // pass
nameCheck('ab_');  // throw error
nameCheck('');     // throw error
nameCheck('abcdefghijabcdefghijabcdefghijabcdefghij'); // throw error
nameCheck('if');        // throw error;
nameCheck('window');    // throw error;
nameCheck('undefined'); // throw error;
```

判定結果を例外の発生の有無ではなく真偽値で取得したい場合は、第二引数にtrueを指定してください

```
if (nameCheck('abc', true)) {
  var name = 'abc';
}
```

# 予約語

次の単語は名称に使用出来ません

  + $
  + ApplicationCache
  + Arguments
  + Array
  + ArrayBuffer
  + ArrayBufferView
  + Attr
  + Audio
  + BeforeUploadEvent
  + Blob
  + BlobBuilder
  + Boolean
  + Buffer
  + Button
  + CSSRule
  + CSSStyleDeclaration
  + CSSStyleSheet
  + Canvas
  + CanvasGradient
  + CanvasPattern
  + CanvasRenderingContext2D
  + ClientRect
  + CloseEvent
  + Comment
  + Console
  + ConsoleCommandLine
  + DOMException
  + DOMImplementation
  + DOMSettableTokenList
  + DOMTokenList
  + DTRACE_HTTP_CLIENT_REQUEST
  + DTRACE_HTTP_CLIENT_RESPONSE
  + DTRACE_HTTP_SERVER_REQUEST
  + DTRACE_HTTP_SERVER_RESPONSE
  + DTRACE_NET_SERVER_CONNECTION
  + DTRACE_NET_SOCKET_READ
  + DTRACE_NET_SOCKET_WRITE
  + DTRACE_NET_STREAM_END
  + DataTransfer
  + DataView
  + Date
  + Document
  + DocumentFragment
  + DocumentType
  + Element
  + Error
  + ErrorEvent
  + EvalError
  + Event
  + EventSource
  + EventTarget
  + FieldSet
  + File
  + FileError
  + FileReader
  + FileReaderSync
  + Form
  + FormControl
  + FormData
  + FormValidity
  + Function
  + GLOBAL
  + Gelocation
  + Geocoordinates
  + GeolocationError
  + Geoposition
  + Global
  + HTMLCollection
  + HTMLFormControlsCollection
  + HTMLOptionsCollection
  + HashChangeEvent
  + Histroy
  + IFrame
  + Image
  + ImageData
  + Infinity
  + Input
  + JSON
  + Label
  + Link
  + Location
  + Math
  + MediaElement
  + MediaError
  + MessageChannel
  + MessageEvent
  + MessagePort
  + Meter
  + NaN
  + Navigator
  + Node
  + NodeList
  + Number
  + Object
  + Option
  + Output
  + PageTransitionEvent
  + PopStateEvent
  + ProcessingInstruction
  + ProgressEvent
  + RangeError
  + ReferenceError
  + RegExp
  + Screen
  + Script
  + Select
  + Storage
  + StorageEvent
  + String
  + Style
  + SyntaxError
  + Table
  + TableCell
  + TableRow
  + TableSection
  + Text
  + TextArea
  + TextMetrics
  + TimeRanges
  + TypeError
  + TypedArray
  + URIError
  + URL
  + Video
  + WebSocket
  + Window
  + Worker
  + WorkerGlobalScope
  + WorkerLocation
  + WorkerNavigator
  + XMLHttpRequest
  + XMLHttpRequestUpload
  + _
  + __dirname
  + __filename
  + _events
  + _maxListeners
  + abstract
  + addListener
  + alert
  + arguments
  + boolean
  + break
  + byte
  + case
  + catch
  + char
  + class
  + clearImmediate
  + clearInterval
  + clearTimeout
  + console
  + const
  + continue
  + debugger
  + decodeURI
  + decodeURIComponent
  + default
  + define
  + delete
  + do
  + document
  + domain
  + double
  + else
  + emit
  + encodeURI
  + encodeURIComponent
  + enum
  + escape
  + eval
  + export
  + exports
  + extends
  + false
  + final
  + finally
  + float
  + for
  + function
  + global
  + goto
  + if
  + implements
  + import
  + in
  + instanceof
  + int
  + interface
  + isFinite
  + isNaN
  + jQuery
  + let
  + listeners
  + long
  + module
  + native
  + new
  + null
  + on
  + once
  + package
  + parseFloat
  + parseInt
  + private
  + process
  + protected
  + public
  + removeAllListeners
  + removeListener
  + require
  + requirejs
  + return
  + root
  + setImmediate
  + setInterval
  + setMaxListeners
  + setTimeout
  + short
  + static
  + super
  + switch
  + synchronized
  + this
  + throw
  + throws
  + transient
  + true
  + try
  + typeof
  + undefined
  + unescape
  + var
  + void
  + volatile
  + while
  + window
  + with
  + yield