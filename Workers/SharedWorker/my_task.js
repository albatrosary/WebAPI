// 独自の PRIVATE 関数

function myPrivateFunc1 () {
  // 何らかの処理
}

function myPrivateFunc2 () {
  // 何らかの処理
}

// 等々...

// 独自の PUBLIC 関数 (つまり、メインページから照会可能)

var queryableFunctions = {
  // 例 1: 2 つの値の差を得る:
  getDifference: function (nMinuend, nSubtrahend) {
      reply("printSomething", nMinuend - nSubtrahend);
  },
  // 例 2: 3 秒待つ
  waitSomething: function () {
      setTimeout(function() { reply("alertSomething", 3, "seconds"); }, 3000);
  }
};

// システム関数

function defaultQuery (vMsg) {
  // メインページが queryableWorker.postMessage() メソッドを直接呼び出したときに限り実行される、デフォルトの PUBLIC 関数
  // 何らかの処理
}

function reply (/* リスナ名, 渡す引数 1, 渡す引数 2, 等々 */) {
  if (arguments.length < 1) { throw new TypeError("reply - not enough arguments"); return; }
  postMessage({ "vo42t30": arguments[0], "rnb93qh": Array.prototype.slice.call(arguments, 1) });
}

onmessage = function (oEvent) {
  if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("bk4e1h0") && oEvent.data.hasOwnProperty("ktp3fm1")) {
    queryableFunctions[oEvent.data.bk4e1h0].apply(self, oEvent.data.ktp3fm1);
  } else {
    defaultQuery(oEvent.data);
  }
};