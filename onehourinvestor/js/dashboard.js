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
    getStatus(1, '/images/avatars/woman1.gif', 'Amy', 1021.21, 12019.89, -13.90),
    getStatus(2, '/images/avatars/man1.gif', 'John', 10.01, 11013.89, 12.10),
    getStatus(0, '/images/avatars/man2.gif', 'Jimmy', 9000.00, 10738.12, 3.13),
    getStatus(3, '/images/avatars/woman2.gif', 'Malia', 214.96, 8951.88, -198.27),
    getStatus(4, '/images/avatars/woman3.gif', 'Veronica', 1.31, 7619.12, -13.02),
    getStatus(5, '/images/avatars/man3.gif', 'Thad', 59.93, 6203.31, 5.12),
    getStatus(6, '/images/avatars/man4.gif', 'Robert', 1021.75, 5213.55, -0.12),
    getStatus(7, '/images/avatars/woman4.gif', 'Joanna', 0.31, 5209.02, -1391.61)
  ]);

  function getPerformance(name, symbol, change) {
    var temp = {
      name: ko.observable(name),
      symbol: ko.observable(symbol),
      change: ko.observable(change)
    }
    temp.isNegative = ko.computed(function() {
      return temp.change() < 0;
    });
    return temp;
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
