const widget = [
    {
        title: "Github Issues",
        mainChart: {
            W: {
                datasets: [
                    {
                        backgroundColor: "#C6ECFD",
                        categoryPercentage: 1,
                        data: [9, 12, 9, 12, 7, 8, 16],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [9, 12, 9, 12, 7, 8, 16],
                        hoverBackgroundColor: "#87CDF7",
                        label: "Issues",
                        type: "bar"

                    }

                ],
                labels: ["January", "February", "March", "April", "May", "June", "July"]
            },
            LW: {
                datasets: [
                    {
                        backgroundColor: "#C6ECFD",
                        categoryPercentage: 1,
                        data: [9, 12, 9, 12, 7, 8, 16],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [9, 12, 9, 12, 7, 8, 16],
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
                        data: [9, 12, 9, 12, 7, 8, 16],
                        hoverBackgroundColor: "#D7EFFD",
                        label: "Closed issues",
                        type: "bar"

                    },
                    {
                        backgroundColor: "#42BFF7",
                        categoryPercentage: 1,
                        data: [9, 12, 9, 12, 7, 8, 16],
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
                    xAxes: [{ displaye: true, gridLiones: { display: false }, labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], stacked: true }],
                    yAxes: [{ displaye: true, gridLiones: { display: false }, labels: { show: true }, stacked: true, position: "left", type: "linear" }]


                },
                tooltips: { mode: "label" }
            },
            ranges: {
                W: "2 Weeks Ago",
                LW: "Last Week",
                TW: "This Week"

            }
        }
    }
]
export default widget
