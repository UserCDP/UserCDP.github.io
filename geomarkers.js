document.addEventListener("DOMContentLoaded", () => {

    function defineForms() {

        let template = document.getElementById("points-num-template");
        let templateContent = template.content;
        document.body.appendChild(templateContent);

        initMap();

        document.querySelector("#points-num").onsubmit = function() {

            let templateContent = document.getElementById("coord-input-template").content;
            document.body.appendChild(templateContent);

            for (let i = 1; i <= document.querySelector("#points").value; i ++) {
                //let div = document.createElement('div')
                let input = document.createElement('input');
                input.type = "number";
                input.step = "any";
                input.id = "coord";
                input.className = "form-control";
                input.placeholder = `P${i} latitude (x)`;
                document.querySelector("#coord-input").append(input);

                let input2 = document.createElement('input');
                input2.type = "number";
                input2.step = "any";
                input2.id = "coord";
                input2.className = "form-control";
                input2.placeholder = `P${i} longitude (y)`;
                //console.log("appended lng")
                document.querySelector("#coord-input").append(input2);
            }

            let  templateContent2 = document.getElementById("projection-settings").content;
            document.querySelector("#coord-input").appendChild(templateContent2);

            let submit = document.createElement('input');
            submit.type = "submit";
            submit.value = "Confirm";
            submit.className = "btn btn-secondary";

            document.querySelector("#coord-input").appendChild(submit);
            
            document.querySelector("#points-num").remove();

            document.querySelector("#coord-input").onsubmit = onCoordInput;
            
            return false;
        }
        
    };

    defineForms();
});


function onCoordInput() {
    console.log("Submited!");
    const coords = document.querySelectorAll("#coord");
    
    let polygonCoords = [];
    let lat_sum = 0;
    let lng_sum = 0;
    let coords_num = coords.length;
    for (let i = 0; i < coords_num; i ++) {
        if (i % 2 == 0) {
            polygonCoords.push({lat: Number(coords[i].value), lng: Number(coords[i + 1].value)});
            lat_sum += Number(coords[i].value);
        } else {
            lng_sum += Number(coords[i].value);
        }
    }

    let button = document.createElement('button');
    button.innerHTML = "Add a new area";
    button.className = "btn btn-secondary";

    const color = document.querySelector("#color").value;
    const opacity = document.querySelector("#opacity").value;
    document.querySelector("#forms-col").append(button);
    initCustomMap(polygonCoords, lat_sum/coords_num, lng_sum/coords_num, color, opacity);
    console.log("map2")

    return false;
};

function initCustomMap(polygon, center_lat, center_lng, color, opacity) {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: center_lat, lng: center_lng },
        mapTypeId: "hybrid",
    });

    //console.log(polygon);

    var MarkedArea = new google.maps.Polygon({
        paths: polygon,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: opacity,
        map: map,
    });
    const drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
          ],
        },
        //markerOptions: {
          //icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //},
      });

    drawingManager.setMap(map);
    MarkedArea.setMap(map);
}

function initMap() {

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 46, lng: 24.46 },
        mapTypeId: "hybrid",
        drawingMode: "Point",
    });
    const drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.POLYLINE,
        ],
        },
        polylineOptions: {
            fillColor: "#000000",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: true,
            editable: true,
            zIndex: 1,
        },
    
        //markerOptions: {
        //  icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //},
    });

    drawingManager.setMap(map);
}

function opacityChange() {
    document.querySelector("#op-value").innerHTML = document.querySelector("#opacity").value;
}