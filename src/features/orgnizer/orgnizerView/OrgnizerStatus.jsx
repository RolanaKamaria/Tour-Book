import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../app/config";
function OrgnizerStatus() {
    const status = useSelector(state => state.orgnizer.status)
    const orgnizer = useSelector(state => state.orgnizer)
    const tourPerMonth1 = status.toursPerMonth.map(tour => (tour.count))
    const [tourPerMonth,setTourPerMonth]=useState(tourPerMonth1)
    const porfitPerMonth1 = status.toursPerMonth.map(tour => (tour.porfit * 10))
    const [porfitPerMonth,setPorfitPerMonth]=useState(porfitPerMonth1)
    const orgnizerTourRating = status.orgnizerTourRating
    const navigate = useNavigate()
    

    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/tours/organizers/statistics`, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        var count=response.data.data.tour_per_months.map(tour => (tour.count))
        var porfit=response.data.data.tour_per_months.map(tour => (parseInt(tour.profits_per_month.substring(0, tour.profits_per_month.length - 1))))
        setTourPerMonth(count)
        setPorfitPerMonth(porfit) 
        }).catch((err)=>{
          console.log(err.message)
        }) },[])


    //to configure line chart details
    const chartConfig = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Count",
                data: tourPerMonth,
            },
            {
                name: "Porfit",
                data: porfitPerMonth
            }
        ],
        options: {
            chart: {
                toolbar: {
                    show: true,
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
                color: '#09855E'
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
                    'Jun', 'Feb', 'Mars', 'Apr', 'May', 'Aug', 'Sept'
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

    //to configure pie chart details
    const pieConfig = {
        type: "pie",
        width: 280,
        height: 280,
        series: [orgnizerTourRating,100-orgnizerTourRating],
        options: {
            chart: {
                toolbar: {
                    show: true,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: true,
            },
            colors: [ "#09855E","#ECF3FA"],
            legend: {
                show: false,
            },
        },
    };

    const handelBack = () => {
        navigate('/orgnizer-home');
    }
    
    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Status</div>
            </div>
            <div className="flex flex-row justify-center items-center pt-5 
             xl:px-28 xl:space-x-10 lg:px-24 lg:space-x-8 md:px-20 md:space-x-6">
                <div className="flex flex-col justify-center rounded-lg w-2/3 drop-shadow-[1px_1px_rgba(117,135,142)]  border-solid border-2 border-text-light mb-10
            bg-gradient-to-br from-backOpacityBgFrom-light from-3% via-post-bg-light via-40% to-backOpacityBgTo-light to-80% ">
{/* To Draw Line Chart for Tours Per Month & Porfit Per Month */}
                    <Card>
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                        >

                            <div className="bg-post-bg-light rounded-lg text-title-light xl:text-2xl lg:text-xl md:text-lg font-['Georgia'] ml-10 px-2">
                                Tour Evaluation
                            </div>
                        </CardHeader>
                        <CardBody className="px-2 pb-0">
                            <Chart {...chartConfig} />
                        </CardBody>
                    </Card>
                </div>
                <div className="flex flex-col justify-center items-center pt-5 mb-10 
                bg-gradient-to-br from-backOpacityBgFrom-light from-3% via-post-bg-light via-40% to-backOpacityBgTo-light to-80% ">
                    {/* To Draw Pie Chart for all Tours Rating */}
                    <Card>
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                        >

                            <div className="mx-10 bg-post-bg-light text-title-light  xl:text-2xl lg:text-xl md:text-lg font-['Georgia'] ml-14 px-2 rounded-lg">
                                {orgnizer.name} Rating
                            </div>
                        </CardHeader>
                        <CardBody className="mt-4 grid place-items-center px-2">
                            <Chart {...pieConfig} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default OrgnizerStatus