$(document).ready(function() {

  var _defaultAvatar = 'http://lorempixel.com/160/160/animals/';

  // retrieve a view model for a user
  function getStatus(id, avatar, name, liquidAssets, totalAssets, lastDayMovement) {
    var temp = {
      id: id,
      avatar: ko.observable(avatar),
      name: ko.observable(name),
      liquidAssets: ko.observable(liquidAssets),
      totalAssets: ko.observable(totalAssets),
      lastDayMovement: ko.observable(lastDayMovement),
      isJimmy: ko.observable(id == 0)
    }
    temp.isNegative = ko.computed(function() {
      return temp.lastDayMovement() < 0;
    });
    return temp;
  }
  
  var friends = ko.observableArray([
    getStatus(1, _defaultAvatar, 'Amy', 1021.21, 12019.89, -13.90),
    getStatus(2, _defaultAvatar, 'John', 10.01, 11013.89, 12.10),
    getStatus(0, _defaultAvatar, 'Jimmy', 9000.00, 10738.12, 3.13),
    getStatus(3, _defaultAvatar, 'Malia', 214.96, 8951.88, -198.27),
    getStatus(4, _defaultAvatar, 'Todd', 1.31, 7619.12, 90.12)
  ]);

  function getPerformance(name, symbol, change) {
    return {
      name: ko.observable(name),
      symbol: ko.observable(symbol),
      change: ko.observable(change)
    }
  }

  var dailyPerformance = ko.observableArray([
      getPerformance('Netflix Inc.', 'NFLX', 1.31),
      getPerformance('NVIDIA Corporation', 'NVDA', 9.35),
      getPerformance('IBM', 'IBM', -0.91),
      getPerformance('Apple', 'AAPL', -3.68)
  ]);

  var dashboardViewModel = {
    friends: friends,
    performance: dailyPerformance
  };

  ko.applyBindings(dashboardViewModel);

  function testData() {
    return stream_layers(3,128,.1).map(function(data, i) {
      return { 
        key: dailyPerformance()[i].symbol(),
        values: data
      };
    });
  }


  nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();

    // chart.transitionDuration(500);
    chart.xAxis
        .tickFormat(d3.format(',f'));
    chart.x2Axis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.2f'));
    chart.y2Axis
        .tickFormat(d3.format(',.2f'));

    d3.select('#chart svg')
        .datum(testData())
        .call(chart);

    nv.utils.windowResize(chart.update);

  return chart;
});


});