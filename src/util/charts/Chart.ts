// charts.ts
import ApexCharts, { ApexOptions } from 'apexcharts';

export const renderChart1 = (revenueData: number[], investmentData: number[], categories: string[]) => {
    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'area',
            stacked: false,
            foreColor: '#4e4e4e',
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: false,
                opacity: 0.1,
                blur: 3,
                left: -7,
                top: 22,
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: false,
            formatter: function (val: number) {
                return parseInt(val.toString());
            },
            offsetY: -20,
            style: {
                fontSize: '14px',
                colors: ["#304758"]
            }
        },
        stroke: {
            show: true,
            width: [4, 4],
            dashArray: [0, 3],
            curve: 'smooth'
        },
        grid: {
            show: true,
            borderColor: 'rgba(0, 0, 0, 0.10)',
        },
        series: [{
            name: 'Revenue',
            type: 'area',
            data: revenueData
        }, {
            name: 'Investment',
            type: 'line',
            data: investmentData
        }],
        xaxis: {
            categories: categories,
        },
        colors: ["#02ba5a", '#e72e7a'],
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function (val: number) {
                    return " " + val + "$";
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 330,
                    stacked: true,
                },
                legend: {
                    show: true,
                    position: "bottom",
                    horizontalAlign: "center",
                    offsetX: -20,
                    fontSize: "10px",
                    markers: {
                        radius: 50,
                        width: 10,
                        height: 10
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '30%'
                    }
                }
            }
        }]
    };

    const chart = new ApexCharts(
        document.querySelector("#chart1") as HTMLElement,
        options
    );

    chart.render();
};

export const renderChart2 = (completeData: number[], inProgressData: number[], startedData: number[], categories: string[]) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 320,
        },
        series: [completeData.reduce((a, b) => a + b, 0), inProgressData.reduce((a, b) => a + b, 0), startedData.reduce((a, b) => a + b, 0)],
        plotOptions: {
            radialBar: {
                // hollow: {
                //     size: '70%',
                // },
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            const total = w.globals.series.reduce((acc: any, curr: any) => acc + curr, 0);
                            return total.toString();
                        }
                    }
                },
                track: {
                    margin: 10
                }
            }
        },
        labels: categories,
        colors: ['#3461ff', '#ff6632d9', '#32bfffd9'],
    };

    const chart = new ApexCharts(
        document.querySelector("#chart2") as HTMLElement,
        options
    );

    chart.render();
};

export const renderChart3 = (value: number) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 250,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        series: [value],
        labels: ['Orders'],
        colors: ['#0d6efd'],
    };

    const chart = new ApexCharts(document.querySelector("#chart3") as HTMLElement, options);
    chart.render();
};

export const renderChart4 = (value: number) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 250,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        series: [value],
        labels: ['Unique Visitors'],
        colors: ['#ffc107'],
    };

    const chart = new ApexCharts(document.querySelector("#chart4") as HTMLElement, options);
    chart.render();
};

export const renderChart5 = (value: number) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 250,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        series: [value],
        labels: ['Impressions'],
        colors: ['#17a2b8'],
    };

    const chart = new ApexCharts(document.querySelector("#chart5") as HTMLElement, options);
    chart.render();
};

export const renderChart6 = (value: number) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            height: 250,
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        series: [value],
        labels: ['Followers'],
        colors: ['#28a745'],
    };

    const chart = new ApexCharts(document.querySelector("#chart6") as HTMLElement, options);
    chart.render();
};

export const renderChart7 = (data: number[]) => {
    const options: ApexOptions = {
        chart: {
            type: 'area',
            height: 90,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 1,
                type: 'vertical',
                opacityFrom: 0.8,
                opacityTo: 0.4,
                stops: [0, 100, 100, 100]
            },
        },
        colors: ["#3b5998"],
        series: [{
            name: 'Facebook Followers',
            data: data
        }],
        stroke: {
            width: 2.5,
            curve: 'smooth',
            dashArray: [0]
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart7") as HTMLElement, options);
    chart.render();
};

export const renderChart8 = (data: number[]) => {
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 90,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
                borderRadius: 9,
                borderRadiusApplication: 'end',
                dataLabels: {
                    position: 'top',
                },
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 1,
                type: 'vertical',
                opacityFrom: 0.8,
                opacityTo: 0.4,
                stops: [0, 100, 100, 100]
            }
        },
        colors: ["#55acee"],
        series: [{
            name: 'Twitter Followers',
            data: data
        }],
        stroke: {
            width: 2.5,
            curve: 'smooth',
            dashArray: [0]
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart8") as HTMLElement, options);
    chart.render();
};

export const renderChart9 = (data: number[]) => {
    const options: ApexOptions = {
        chart: {
            type: 'line',
            height: 90,
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#e52d27"],
        series: [{
            name: 'Youtube Subscribers',
            data: data
        }],
        stroke: {
            width: 2.5,
            curve: 'smooth',
            dashArray: [0]
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart9") as HTMLElement, options);
    chart.render();
};