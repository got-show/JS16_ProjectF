import TableData from "json!./tableData.json";
// I didn't find the matching data for "plodDistribution"
//'maleFemale'-Men-data should be negative
export default function init(){
  google.charts.setOnLoadCallback(drawDeadAndAlive);
  google.charts.setOnLoadCallback(drawDistributionPLODs);
  google.charts.setOnLoadCallback(drawDistributionNoblesPLODs);
  google.charts.setOnLoadCallback(drawDistributionPLODsAgeDistribution);
};
function drawDeadAndAlive() {
  let data = new google.visualization.arrayToDataTable(TableData.maleFemale);
  var chart = new google.visualization.BarChart(document.getElementById('dead_and_alive'));

  var options = {
    height: 400,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1f1f1f',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    },
    isStacked: true,
    bar: {
      groupWidth: '75%'
    },
    hAxis: {
      format: ';',
      title: "Number of characters",
      titleTextStyle: {
        color: '#AAAAAA'
      },
      titleFontSize: 17,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    vAxis: {
      direction: -1,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },

    }
  };


  var formatter = new google.visualization.NumberFormat({
    pattern: ';'
  });
  formatter.format(data, 1)
  chart.draw(data, options);

};
function drawDistributionPLODs() {
  var data = new google.visualization.arrayToDataTable(TableData.plodDistribution);
  var options = {
    height: 400,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1f1f1f',
    lineWidth: 3,
    pointSize: 1,
    dataOpacity: 0.9,
    hAxis: {
      title: 'Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },

    vAxis: {
      title: 'Percentage of Characters (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        min: 0,
        // max: 100
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    curveType: 'function',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    }
  };
  var chart = new google.visualization.SteppedAreaChart(document.getElementById('distribution_plods'));
  chart.draw(data, options);
};
function drawDistributionNoblesPLODs() {
  let data=new google.visualization.arrayToDataTable(TableData.plodDistributionPeasants);
  
  var options = {
    height: 400,
    lineWidth: 3,
    colors: ['#2196f3', '#f44336'],
    backgroundColor: '#1f1f1f',
    pointSize: 1,
    dataOpacity: 0.9,
    hAxis: {
      title: 'Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },

    vAxis: {
      title: 'Percentage of Characters (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        min: 0,
        // max: 100
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    curveType: 'function',
    legend: {
      position: 'top',
      maxLines: 3,
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      }

    }
  };
  var chart = new google.visualization.SteppedAreaChart(document.getElementById('distribution_nobles_plods'));
  chart.draw(data, options);
};
function drawDistributionPLODsAgeDistribution() {

  let data = new google.visualization.arrayToDataTable(TableData.plodAge);
  var options = {
    height: 400,
    colors: ['#2196f3'],
    backgroundColor: '#1f1f1f',

    legend: {
      position: 'none'
    },
    vAxis: {
      title: 'Averaged Likelihood of Death (%)',
      titleFontSize: 17,
      titleTextStyle: {
        color: '#AAAAAA'
      },
      viewWindow: {
        // max: 100,
        min: 0
      },
      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    hAxis: {
      title: 'Age Group',
      slantedText: true,
      slantedTextAngle: 60,
      titleFontSize: 15,
      titleTextStyle: {
        color: '#AAAAAA'
      },

      textStyle: {
        fontSize: 17,
        color: '#AAAAAA'
      },
    },
    bar: {
      groupWidth: '75%'
    },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('distribution_plods_age_distribution'));
  chart.draw(data, options);
};
