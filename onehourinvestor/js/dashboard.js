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

  function getHolding(name, symbol, quantity, value, change, percentPortfolio) {
    var temp = {
      name: ko.observable(name),
      symbol: ko.observable(symbol),
      quantity: ko.observable(quantity),
      value: ko.observable(value),
      change: ko.observable(change),
      percentPortfolio: ko.observable(percentPortfolio)
    };
    temp.isNegative = ko.computed(function() {
      return temp.change() < 0;
    });
    temp.totalValue = ko.computed(function() {
      return (temp.value() * temp.quantity()).toFixed(2);
    });
    
    return temp;
  }

  var portfolio = ko.observableArray([
      getHolding('Netflix Inc.', 'NFLX', 18, 313.83, 1.31, 22),
      getHolding('NVIDIA Corporation', 'NVDA', 34, 15.83, 9.35, 8),
      getHolding('IBM', 'IBM',  8, 190.21, -0.91, 12),
      getHolding('Apple', 'AAPL', 8, 467.76, -3.68, 13),
      getHolding('Dell Inc.', 'DELL', 45, 13.88, 0.92, 18),
      getHolding('Alphatec Holdings Inc', 'ATEC', 102, 2.01, 0.04, 6),
      getHolding('SkyNet', 'T3K', 24, 239.12, 42.99, 21)
  ]);

  var dashboardViewModel = {
    friends: friends,
    performance: dailyPerformance,
    portfolio: portfolio
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
