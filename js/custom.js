var maplayers = [];



var data = [
    {id:"amazonelemation",name:"Amazon Elevation Tile",url:'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',img:"img/tile/amazonelevation.png",options:{},dark:true},
    {id:"googlestreet",name:"Google Street",url:"http://mts3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",img:"img/tile/google-street.png",options:{maxZoom: 19},dark:false},
    {id:"googleterrain",name:"Google Terrain",url:"http://mts3.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",img:"img/tile/google-street.png",options:{maxZoom: 19},dark:false},
    {id:"googlehybrid",name:"Google Hybrid",url:"http://mts2.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",img:"img/tile/google-sattalite.png",options:{maxZoom: 19},dark:true},
    {id:"osm",name:"Open Street Map",url:"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",img:"img/tile/osm.png",options:{maxZoom: 20},dark:false},
    {id:"mapnik",name:"Mapnik",url:"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",img:"img/tile/osm-mapnik.png",options:{},dark:false},
    {id:"blackwhite",name:"Black & White",url:"https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",img:"img/tile/osm-black-and-white.png",options:{maxZoom: 18},dark:false},
    {id:"de",name:"DE",url:"https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",img:"img/tile/osm-de.png",options:{maxZoom: 18},dark:false},
    {id:"france",name:"France",url:"https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",img:"img/tile/osm-france.png",options:{maxZoom: 20},dark:false},
    {id:"hot",name:"HOT",url:"https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",img:"img/tile/osm-france.png",options:{maxZoom: 19},dark:false},
    {id:"topo",name:"Topo",url:"https://a.tile.opentopomap.org/{z}/{x}/{y}.png",img:"img/tile/osm-topo.png",options:{maxZoom: 17},dark:false},
    {id:"full",name:"Full",url:"https://a.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",img:"img/tile/osm-roads.png",options:{maxZoom: 18},dark:false},
    {id:"base",name:"Base",url:"https://a.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png",img:"img/tile/osm-base.png",options:{maxZoom: 18},dark:false},
    {id:"toner",name:"Toner",url:"https://stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",img:"img/tile/osm-toner.png",options:{maxZoom: 20,subdomains: 'abcd',minZoom: 0},dark:false},
    {id:"tonerbg",name:"Toner Background",url:"https://stamen-tiles-a.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png",img:"img/tile/osm-toner-bg.png",options:{maxZoom: 20,subdomains: 'abcd',minZoom: 0},dark:false},
    {id:"tonerlite",name:"Toner Lite",url:"https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",img:"img/tile/osm-toner-lite.png",options:{maxZoom: 20,subdomains: 'abcd',minZoom: 0},dark:false},
    {id:"watercolor",name:"WaterColor",url:"https://stamen-tiles-a.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",img:"img/tile/osm-watercolor.png",options:{maxZoom: 16,subdomains: 'abcd',minZoom: 1},dark:false},
    {id:"statementerrain",name:"Statemen Terrain",url:"https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",img:"img/tile/osm-statemen-terrain.png",options:{maxZoom: 18,subdomains: 'abcd',minZoom: 0},dark:false},
    {id:"statemenbg",name:"Statemen Terrain BG",url:"https://stamen-tiles-a.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png",img:"img/tile/osm-statemen-terrain-bg.png",options:{maxZoom: 18,subdomains: 'abcd',minZoom: 0},dark:false},
    {id:"esriworldstreet",name:"ESRI World Street",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-world-street.png",options:{},dark:false},
    {id:"esriledorne",name:"ESRI De Lorme",url:"https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-le-dorme.png",options:{minZoom: 1,maxZoom: 11},dark:false},
    {id:"esriworldtopo",name:"ESRI Worl Topo",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-world-topo.png",options:{},dark:false},
    {id:"esriworldimagery",name:"ESRI Worl Imagery",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-world-imagery.png",options:{},dark:true},
    {id:"esriworldterrain",name:"ESRI Worl Terrain",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-world-terrain.png",options:{maxZoom: 13},dark:false},
    {id:"esrishaded",name:"ESRI Shaded Relief",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-shaded-relief.png",options:{maxZoom: 13},dark:false},
    {id:"esriphysical",name:"ESRI Physical",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-physical.png",options:{maxZoom: 8},dark:false},
    {id:"esriocean",name:"ESRI Ocean",url:"https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-ocean.png",options:{maxZoom: 13},dark:false},
    {id:"esrinatgeo",name:"ESRI Nat Geo",url:"https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-nat-geo-world.png",options:{maxZoom: 16},dark:false},
    {id:"esriworldgray",name:"ESRI World Gray",url:"https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",img:"img/tile/esri-world-gray-canvas.png",options:{maxZoom: 16},dark:false},
    {id:"mtbmap",name:"MTB Map",url:"http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png",img:"img/tile/mtb-map.png",options:{},dark:true},
    {id:"vartodbpositron",name:"CartoDB Positron",url:"https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",img:"img/tile/cartodb-positron.png",options:{subdomains:'abcd',maxZoom: 19},dark:false},
    {id:"cartodark",name:"CartoDB Dark",url:"https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",img:"img/tile/cartodb-dark.png",options:{subdomains:'abcd',maxZoom: 19},dark:true},
    {id:"cartovoyager",name:"CartoDB Voyager",url:"https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",img:"img/tile/cartodb-voyager.png",options:{subdomains:'abcd',maxZoom: 19},dark:false},
    {id:"hikebike",name:"Hikebike",url:"https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",img:"img/tile/hikebike.png",options:{maxZoom: 19},dark:false},
    {id:"hikebikehillshade",name:"Hikebike Hillshade",url:"https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png",img:"img/tile/hikebike-hillshade.png",options:{maxZoom: 15},dark:false},
    {id:"wikimedia",name:"Wikimedia",url:"https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",img:"img/tile/wikimedia.png",options:{minZoom: 1,maxZoom: 19,dark:false}}
];

var baselayers = [];
var map;
var basemaplayer;

$( document ).ready(function() {
    $('#toggleBaseGallery').click(function (e) {

        e.preventDefault();
        $(".sideBar").toggleClass("hidden");

    });

    $('#toggleBaseGallery_1').click(function (e) {

        e.preventDefault();
        $(".sideBar").toggleClass("hidden");

    });

    $('#layer').click(function (e) {

        e.preventDefault();
        $("#layerList-tab").click()


    });

    $('#globe').click(function (e) {

        e.preventDefault();

        $("#basemap-tab").click()

    });
    $('#search').click(function (e) {

        e.preventDefault();

        $("#ccWidget-tab").click()

    });

    map = L.map('map', {
        center: [6.642, 102.17112],
        zoom: 9,
        maxZoom: 22
    });


    //var hash = new L.Hash(map);

    basemaplayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // maxZoom: 19,
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    basemaplayer.addTo(map);

    var measureOption={
        position: 'topleft',
        primaryLengthUnit: 'feet',
        secondaryLengthUnit: 'miles',
        primaryAreaUnit: 'acres',
        secondaryAreaUnit: 'sqmeters',
        activeColor: '#e69095',
        completedColor: '#403ff2'
    }



    maplayers['mine_pit_a'] =L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:mine_pit_a',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

    maplayers['mine_tailings_area_a'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:mine_tailings_area_a',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

    maplayers['mines_a'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:mines_a',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

    maplayers['quarry_pit_a']= L.tileLayer.wms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:quarry_pit_a',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

maplayers['quarry_authorised_area'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:quarry_authorised_area',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

maplayers['Jalan_negeri'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:jalan_negeri',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });


maplayers['Kelantan_River'] =L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:kelantan_river',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

maplayers['Kelantan_geology'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:kelantan_geologi',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

maplayers['Kelantan_pekan'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:kelantan_pekan',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

maplayers['Kelantan_Daerah'] = L.tileLayer.betterWms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
        layers: 'nugeo:kelantan_daerah',
        format: 'image/png',
        transparent: true,
        proxy:'services/proxy.php',
        proxyParamName:'url'
    });

    // var ZoningRtmpaj = L.tileLayer.wms("https://geoserver.nugeo.solutions/geoserver/nugeo/wms", {
    //     layers: 'nugeo:zoning_rtmpaj',
    //     format: 'image/png',
    //     transparent: true
    // });

    var legnd="<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mine_pit_a'>mine_pit_a"+"<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mine_tailings_area_a'>mine_tailings_area_a"+"<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>Mines_A"+"<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>nugeo:quarry_pit_a"+ "<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>nugeo:quarry_authorised_area"+ "<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:jalan_negeri'>Jalan_negeri"+ "<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_river'>Kelantan_River"+"<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_geologi'>Kelantan_geology"+ "<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_pekan'>Kelantan_pekan"+"<br />"+
        "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_daerah'>Kelantan_Daerah"+"<br />";
        $("#legend_1").html(legnd);



    var myOptions = {
        container_width 	: "100%",
        group_maxHeight     : "500px",
        container_maxHeight : "1000px",
        exclusive       	: true,
        collapsed:false
    };
    var baseMaps = [

    ];


    var overlays = [
        {

            groupName : "JMG Layers ",
            expanded : true,
            layers    : {
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mine_pit_a'>mine_pit_a": maplayers['mine_pit_a'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mine_tailings_area_a'>mine_tailings_area_a": maplayers['mine_tailings_area_a'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>Mines_A": maplayers['mines_a'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>nugeo:quarry_pit_a": maplayers['quarry_pit_a'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:mines_a'>nugeo:quarry_authorised_area": maplayers['quarry_authorised_area']





            }
        }, {

            groupName : "Basemap Layers ",
            expanded : true,
            layers    : {

                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:jalan_negeri'>Jalan_negeri": maplayers['Jalan_negeri'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_river'>Kelantan_River": maplayers['Kelantan_River'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_geologi'>Kelantan_geology": maplayers['Kelantan_geology'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_pekan'>Kelantan_pekan": maplayers['Kelantan_pekan'],
                "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:kelantan_daerah'>Kelantan_Daerah": maplayers['Kelantan_Daerah'],
                //   "<img src='https://geoserver.nugeo.solutions/geoserver/nugeo/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=nugeo:zoning_rtmpaj'>ZoningRtmpaj": ZoningRtmpaj,








            }
        }
    ]

    var layernames=['mine_pit_a','mine_tailings_area_a','Mines_A','quarry_pit_a','quarry_authorised_area','Jalan_negeri','Kelantan_River','Kelantan_geology','Kelantan_pekan','Kelantan_Daerah']

        layerControl = L.Control.styledLayerControl(baseMaps, overlays, myOptions);
        layerControl.addTo(map);
        setTimeout(function () {
            layerControl._container.remove();
            document.getElementById('layerList').appendChild(layerControl.onAdd(map));

            for(var i=0;i<layernames.length;i++) {
                var siliderStr="<div style='padding-left: 20px;'><input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange=updateOpacity(this.value,"+"'"+layernames[i]+"'"+")></div><div class='row' style='padding-left: 20px;'><i onclick=zoomToLalyerExtent() class=\"fas fa-search-plus\"></i><i onclick=dynamicQuery() class=\"fas fa-filter\"></i></div>";

                var node = $("div > label:contains("+layernames[i]+")").append(siliderStr);
            }

    },1000)

    // L.control.betterscale().addTo(map);
    //  var hash = new L.Hash(map);
    map.addControl(new L.Control.Fullscreen());
    var coord_control = L.control.mouseCoordinate({utm: true, utmref: true, qth: true, nac: true}).addTo(map);
    coord_control._container.remove();



    var options = {
        modal: true,
        title: "Box area zoom",
        position: 'topleft'
    };
    // var control = L.control.zoomBox(options);


    var measureControl = new L.Control.Measure(options);
    measureControl.addTo(map);

    map.addControl(L.control.styleEditor({position: 'topleft'}))

    document.getElementById('coord').appendChild(coord_control.onAdd(map));


    var baselayers = [];


    function updateBaseLayer(url) {
        map.removeLayer(basemaplayer);
        basemaplayer = L.tileLayer(url, {
            // maxZoom: 19,
            // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    };





    function _add_basemap_tilelayer() {

        for (var i = 0; i < data.length; i++) {

            $('#basemapGallery').append(
                '<div class="shadow-sm p-2 mb-2 bg-white esriBasemapGalleryNode row" id=' + i + '>' +
                '<label class="col-md-12">'+data[i].name+'</label>'+
                '<img src="' + data[i].img + '" height="100" width="200">' +
                '</div>'

            )

        }


    }

    _add_basemap_tilelayer();

    $('#basemapGallery').on('click', '.esriBasemapGalleryNode', function () {

        updateBaseLayer(data[this.id]['url'])

    });

    $('#fullScreen').click($.proxy(function (e) {
        e.preventDefault();

        var elem = document.body; // Make the body go full screen.
        toggleFullscreen(elem);

    }, this));


    function add_toc_item() {
        $('#basemapGallery').append('<div class="shadow-sm p-4 mb-4 bg-white esriBasemapGalleryNode" id=' + i + '>' +
            '<img src="' + data[i].img + '" height="100" width="200">' +
            '</div>'
        )
    }

    toggleFullscreen = function (elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };


});

function createQueryResult(layer) {
    $.ajax({
        url: 'services/query_service.php?layer='+layer,
        crossDomain:true,
        success: function (data, status, xhr) {
            console.log(data)
                var rs=JSON.parse(data);
            var str='';
            for(var i=0;i<rs.length;i++){
                str=str+'<tr><td>'+rs[i].nam+'</td>'+
                '<td>'+rs[i].mineral+'</td>'+
                '<td>'+rs[i].mukim+'</td>'+
                '<td>'+rs[i].daerah+'</td>'+
                '<td>'+rs[i].negeri+'</td>'+
                '<td>'+rs[i].feature+'</dh>'+
                '<td>'+rs[i].Mine_Pit_A+'</td>'+
                '<td>'+rs[i].layer+'</td></tr>';
            }
            $("#tb").html(str)

        },
        error: function (xhr, status, error) {
            showResults(error);
        }
    });
}

function addEsriUrlHere(){
    var url = prompt("Please enter url and layer name here", "http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_v_02112017/MapServer");

    L.esri.request(url, {},
        function (error, response) {
            //      console.log(response.layers);
            var mainArray_res = response.layers;
            //$scope.createToc(mainArray_res,$scope.mainTocUrl[0],0);

            angular.element(document.getElementById("layerList")).scope().createToc(mainArray_res,url,0);



        });

}


function updateOpacity(value,layer,id) {
    try{

        if(id=='myLayers'){
            myLayers[layer].setOpacity(value);
        }else {
            maplayers[layer].setOpacity(value);
        }

    }

    catch(err){
        if(id=='myLayers'){
            myLayers[layer].setStyle({fillOpacity: value, opacity: value});
        }else {
            maplayers[layer].setStyle({fillOpacity: value, opacity: value});
        }
        // layersWithName[name].setFeatureStyle(undefined, {fillOpacity: 1});
    }
}


function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function defaultExtent(){
    map.setView([6.642, 102.17112],9)
}

function getGeolocation() {
    L.control.locate().addTo(map);
}

function printMap() {
    window.print();
}

var rtCtrl=false;
var routingControl='';


function  zoomToLalyerExtent() {
   alert("working on it")
}

function  dynamicQuery() {
    alert("working on it")
}


function routingApp(){

    if(rtCtrl==false) {



        routingControl=L.Routing.control({
            // waypoints: [
            //     L.latLng(57.74, 11.94),
            //     L.latLng(57.6792, 11.949)
            // ],
            geocoder: L.Control.Geocoder.nominatim(),
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
            position: 'topleft',
            altLineOptions: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9},
                    {color: 'white', opacity: 0.8, weight: 6},
                    {color: 'blue', opacity: 0.5, weight: 2}
                ]
            }
        }).addTo(map);
        rtCtrl=true;
    }else{
        map.removeControl(routingControl);
        rtCtrl=false;
    }

}