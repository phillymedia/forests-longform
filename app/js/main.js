// $(document).ready(function(){
// });

var Chartist = require("./chartist.js");


/**
 * A simple Chartist plugin to put labels on top of bar charts.
 *
 * Copyright (c) 2015 Yorkshire Interactive (yorkshireinteractive.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(window, document, Chartist) {
  'use strict';
  var defaultOptions = {
    // The class name so you can style the text
    labelClass: 'ct-bar-label',

    // Use this to get the text of the data and you can return your own
    // formatted text. For example, for a percentage:
    // {
    //  labelInterpolationFnc: function (text) { return text + '%' }
    // }
    labelInterpolationFnc: Chartist.noop,

    // Depending on your font size you may need to tweak these
    labelOffset: {
      x: 0,
      y: 0
    },

    // If labelOffset doesn't work for you and you need more custom positioning
    // you can use this. You can set position.x and position.y to functions and
    // instead of centering + labelOffset. This will _completely_ override the
    // built in positioning so labelOffset will no longer do anything. It will
    // pass the bar `data` back as the first param.
    //
    // Example:
    // Chartist.plugins.ctBarLabels({
    //   position: {
    //     x: function (data) {
    //       return data.x1 + 50; // align left with 50px of padding
    //     }
    //   }
    // });
    position: {
      x: null,
      y: null
    }
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctBarLabels = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    var positionX = options.position.x || function (data) {
      return ((data.x1 + data.x2) / 2) + options.labelOffset.x;
    };

    var positionY = options.position.y || function (data) {
      return ((data.y1 + data.y2) / 2) + options.labelOffset.y;
    };

    return function ctBarLabels(chart) {
      // Since it's specific to bars, verify its a bar chart
      if(chart instanceof Chartist.Bar) {
        chart.on('draw', function(data) {
          // If the data we're drawing is the actual bar, let's add the text
          // inside of it
          if(data.type === 'bar') {
            data.group.elem('text', {
              // This gets the middle point of the bars and then adds the
              // optional offset to them
              x: positionX(data),
              y: positionY(data),
              style: 'text-anchor: middle'
            }, options.labelClass)
              .text(
              options.labelInterpolationFnc(
                // If there's not x (horizontal bars) there must be a y
                data.value.x || data.value.y
              )
            );
          }
        });
      }
    };
  };

}(window, document, Chartist));


// var data = require("./data.json");
//
// var map = L.map('map').setView([39.9526, -75.1652], 15);
// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}'+ (L.Browser.retina? '@2x': '') +'.png', {
//     maxZoom: 18,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
// }).addTo(map);
//
// L.geoJson(data).addTo(map);
// // map.scrollWheelZoom.disable();


new Chartist.Bar('.ct-chart', {
  // A labels array that can contain any sort of values
  labels:["Maine","N.H.","W.Va.","Vt.","Ala.","Ga.","S.C.","Miss.","N.Y.","Va.","Pa."],
  // Our series array that contains series objects or in this case series data arrays
  series:[
    [0.828666237,0.800139448,0.776799428,0.732814478,0.689606908,0.647741935,0.630217526,0.62377556,0.599107794,0.586635733,0.581008265]
]
},{
  horizontalBars: true,
  reverseData: true,
  axisX: {
           type: Chartist.FixedScaleAxis,
           labelInterpolationFnc: function(value) {
             return (value * 100) + '%';
           },
           ticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            low: 0,
            high: 1,
            labelOffset: {
                  x: -5,
                  y: 0
                },

       },
    axisY: {
    },
    plugins: [
    Chartist.plugins.ctBarLabels({
      position: {
        x: function (data) {
          return data.x1 + 50
        }
      },
      labelOffset: {
        y: 7
      },
      labelInterpolationFnc: function (text) {
        return text + '%'
      }
    })
  ]
});
