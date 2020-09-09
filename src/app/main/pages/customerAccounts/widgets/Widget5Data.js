const widget = [
    {
        title: "Report",
        mainChart: {
            WL: {
                datasets: [
                    {
                        backgroundColor: "#C6ECFD",
                        categoryPercentage: 1,
                        data: [40, 60, 80, 100, 15, 50, 99],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [19, 32, 19, 32, 74, 28, 26],
                        hoverBackgroundColor: "#87CDF7",
                        label: "Issues",
                        type: "bar"

                    }
                ],
                labels: ["January", "February", "March", "April", "May", "June",]
            },
            LW: {
                datasets: [
                    {
                        backgroundColor: "#C6ECFD",
                        categoryPercentage: 1,
                        data: [100, 20, 50, 55, 100, 30, 40],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [19, 80, 91, 12, 72, 18, 16],
                        hoverBackgroundColor: "#87CDF7",
                        label: "Issues",
                        type: "bar"

                    }

                ],
                labels: ["January", "February", "March", "April", "May", "June", "July"]
            },
            TW: {
                datasets: [
                    {
                        backgroundColor: "#C6ECFD",
                        categoryPercentage: 1,
                        data: [95, 80, 80, 12, 78, 99, 60],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [93, 33, 49, 22, 17, 38, 46],
                        hoverBackgroundColor: "#87CDF7",
                        label: "Issues",
                        type: "bar"

                    }

                ],
                labels: ["January", "February", "March", "April", "May", "June", "July"]
            },
            options: {
                legends: { display: false },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        displaye: true, ticks: { display: false },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }, gridLiones: { display: false }, labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], stacked: true
                    }],
                    yAxes: [{ displaye: true, ticks: { display: false },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }, gridLiones: { display: false }, labels: { show: true }, stacked: true, position: "left", type: "linear" }]


                },
                tooltips: { mode: "label" }
            },
            ranges: {
                WL: "2 Weeks Ago",
                LW: "Last Week",
                TW: "This Week"

            }
        },
        ranges: {
            WL: "2 Weeks Ago",
            LW: "Last Week",
            TW: "This Week"

        },
        supporting: {
            closed: {
                chart: {
                    WL: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [100, 25, 49, 92, 17, 38, 56],
                                fill: true,
                                label: "Closed",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    LW: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [89, 25, 49, 92, 27, 81, 22],
                                fill: true,
                                label: "Closed",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    TW: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [38, 22, 34, 29, 12, 38, 22],
                                fill: true,
                                label: "Closed",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    options: {
                        legends: { display: false },
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                displaye: true, ticks: { display: false },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }],
                            yAxes: [{
                                displaye: true, ticks: { display: false },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }]


                        },
                        count: { W: 80, LW: 40, TW: 60 },
                        label: "CLOSED"
                    },
                }
            },
            created: {
                chart: {
                    WL: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [89, 15, 59, 92, 17, 8, 86],
                                fill: true,
                                label: "Created",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    LW: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [100, 50, 80, 40, 30, 28, 15],
                                fill: true,
                                label: "Created",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    TW: {
                        datasets: [
                            {
                                backgroundColor: "#42BFF7",
                                borderWidth: 0,
                                data: [80, 45, 49, 92, 17, 34, 26],
                                fill: true,
                                label: "Created",
                                pointHitRadius: 20,
                                pointRadius: 0
                            },

                        ],
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",]
                    },
                    options: {
                        legends: { display: false },
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                displaye: true, ticks: { display: false },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }],
                            yAxes: [{
                                displaye: true, ticks: { display: false },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }]


                        },
                        count: { WL: 100, LW: 80, TW: 50 },
                        label: "CREATED"
                    },
                }
            }
        }
    }
]
export default widget
