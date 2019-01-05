function getColor() {

    let colors = {};
    const img = document.getElementById('image');
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    for (let x = 0; x <= img.width; x++) {
        for (let y = 0; y <= img.height; y++) {
            let pixelData = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
            if (pixelData[3] === 0)
                continue;
            let rgbValue = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

            if (rgbValue !== "#ffffff")
                if (isNaN(colors[rgbValue]))
                    colors[rgbValue] = 1
                else
                    colors[rgbValue]++;
        }
    }

    makeGraph(colors);

}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function makeGraph(colorMapData) {

    let data = {
        datasets: [{
            data: [],
            backgroundColor: []
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: []
    };

    for (var key in colorMapData) {
        var value = colorMapData[key];
        data["labels"].push(key);
        data["datasets"][0]["backgroundColor"].push(key);
        data["datasets"][0]["data"].push(value);
    }

    var ctx = document.getElementById("myChart").getContext('2d');
    ctx.width = "400px";
    ctx.height = "400px";
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

getColor();