import React from "react";
import { render } from "react-dom";

// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


class Bschart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChart: []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData.bind(this),30000);
  }

   componentWillUnmount(){
	    this.setState({ dataChart: null });
  }

  getData() {
    fetch("https://bs-storage.agriculture.web.meca.in.th/v1.2/object/ino.adizom01.temperature.2019?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2byI6ImlubyIsImFjbCI6W3siYWNjZXB0Ijp0cnVlfV0sImlhdCI6MTU2Mjc3NDE2MywiZXhwIjoyMDAwMDAwMDAwfQ.trgEG0GaN2qmiKXzSxMkIgd5uyOwmMhaC64xRCRg84U")
      .then(response => response.json())
      .then(info => {
        let dataChart = []
	info.data.data.map(data =>
          dataChart.push({
            y: parseFloat(data.value),
            name: data.observeddatetime
          })
        );

        this.setState({
		dataChart: dataChart
        });
	 console.log (dataChart);
      });
  }

  onClick() {
    this.getData();
  } 
	
  render() {
    const options = {
      series: [
        {
          type: "line",
          name: "Current year",
          data: this.state.dataChart
        }
      ],
      plotOptions: {
        series: {
          pointWidth: 40
        }
      },
      xAxis: {
        type: "category",
        labels: {
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "Left",
            align: "high",
            offset: 0,
            rotation: 0,
            y: -20,
            style: {
              fontWeight: "bold"
            }
          }
        },
        {
          title: {
            text: "Right",
            align: "high",
            offset: 0,
            rotation: 0,
            y: -20,
            style: {
              fontWeight: "bold"
            }
          },
          opposite: true
        }
      ]
    };

return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <button onClick={this.onClick}>Update Series</button>
      </div>
    );
  }
}

render(<Bschart />, document.getElementById("root"));

export default Bschart;
