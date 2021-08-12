const _os = require("os");

// Memory
exports.freemem = function () {
  return _os.freemem() / (1024 * 1024);
};

exports.totalmem = function () {
  return _os.totalmem() / (1024 * 1024);
};

exports.freememPercentage = function () {
  return _os.freemem() / _os.totalmem();
};

exports.cpuFree = function (callback) {
  getCPUUsage(callback, true);
};

exports.cpuUsage = function (callback) {
  getCPUUsage(callback, false);
};

function getCPUUsage(callback, free) {
  var stats1 = getCPUInfo();
  var startIdle = stats1.idle;
  var startTotal = stats1.total;

  setTimeout(function () {
    var stats2 = getCPUInfo();
    var endIdle = stats2.idle;
    var endTotal = stats2.total;

    var idle = endIdle - startIdle;
    var total = endTotal - startTotal;
    var perc = idle / total;

    if (free === true) callback(perc);
    else callback(1 - perc);
  }, 1000);
}

function getCPUInfo(callback) {
  var cpus = _os.cpus();

  var user = 0;
  var nice = 0;
  var sys = 0;
  var idle = 0;
  var irq = 0;
  var total = 0;

  for (var cpu in cpus) {
    if (!cpus.hasOwnProperty(cpu)) continue;
    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  var total = user + nice + sys + idle + irq;

  return {
    idle: idle,
    total: total,
  };
}
