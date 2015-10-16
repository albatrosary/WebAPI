var first = document.querySelector('#number1');
var second = document.querySelector('#number2');
var result = document.querySelector('.result');

if (window.Worker) { //check if Browser supports the Worker api.
// Requries script name as input
  var myWorker = new Worker("worker.js");

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]); //seding message as array to the worker
  };

  first.onkeyup = function() {
    myWorker.postMessage([first.value, second.value]); //seding message as array to the worker
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
  };

  second.onkeyup = function() {
    myWorker.postMessage([first.value, second.value]);
  };

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    localStorage.setItem('data', workerResult);
  };
}