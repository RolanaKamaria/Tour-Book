import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";


function WeatherLineChart(props){

    const date=props.weatherData.map(data=>data.dt_txt.slice(0,10)).filter((_, index) => index % 4 === 0);
    const labels = props.weatherData.map(data=>data.weather[0].description).filter((_, index) => index % 4 === 0);
    const temprature = props.weatherData.map(data=>data.main.temp).filter((_, index) => index % 4 === 0);
    const wind = props.weatherData.map(data=>data.wind.speed).filter((_, index) => index % 4 === 0);
    console.log(date)
    const chartConfig = {
      type: "line",
      height: 240,
      series: [
        {
          name: "Weather",
          data: temprature,
        },
        {
          name:"Wind",
          data: wind
        }
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#024932"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 5,
          color:'#09855E'
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#024932",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: [
           ...date
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#024932",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#6E8085",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };
    return(
        <div>

<Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
      
        <div className="text-title-light xl:text-2xl lg:text-xl md:text-lg font-['Georgia'] pl-10">
           Weather Prediction for next 10 days
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
     
        </div>
    )
}

export default WeatherLineChart