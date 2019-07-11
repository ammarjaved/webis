
    $("#shp").on("change", function (e) {
        var file = $(this)[0].files[0];
        addShapefile(file);
        this.value = null;
    });
    $("#csv").on("change", function (e) {
        var file = $(this)[0].files[0];
        addCsvFile(file);
        this.value = null;
    });
    $("#kml").on("change", function (e) {
        var file = $(this)[0].files[0];
        addKml(file);
        this.value = null;
    });
    $("#geojson").on("change", function (e) {
        var file = $(this)[0].files[0];
        addGeoJson(file);
        this.value = null;
    });

    $("#gpx").on("change", function (e) {
        var file = $(this)[0].files[0];
        addGPX(file);
        this.value = null;
    });


    L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

        onAdd: function (map) {
            // Triggered when the layer is added to a map.
            //   Register a click listener, then do all the upstream WMS things
            L.TileLayer.WMS.prototype.onAdd.call(this, map);
            map.on('click', this.getFeatureInfo, this);
        },

        onRemove: function (map) {
            // Triggered when the layer is removed from a map.
            //   Unregister a click listener, then do all the upstream WMS things
            L.TileLayer.WMS.prototype.onRemove.call(this, map);
            map.off('click', this.getFeatureInfo, this);
        },

        getFeatureInfo: function (evt) {
            // Make an AJAX request to the server and hope for the best
            var url = this.getFeatureInfoUrl(evt.latlng),
                showResults = L.Util.bind(this.showGetFeatureInfo, this);
            $.ajax({
                url: url,
                crossDomain:true,
                success: function (data, status, xhr) {
                    var err = typeof data === 'string' ? null : data;
                    showResults(err, evt.latlng, data);
                },
                error: function (xhr, status, error) {
                    showResults(error);
                }
            });
        },

        getFeatureInfoUrl: function (latlng) {
            // Construct a GetFeatureInfo request URL given a point
            var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
                size = this._map.getSize(),

                params = {
                    request: 'GetFeatureInfo',
                    service: 'WMS',
                    srs: 'EPSG:4326',
                    styles: this.wmsParams.styles,
                    transparent: this.wmsParams.transparent,
                    version: this.wmsParams.version,
                    format: this.wmsParams.format,
                    bbox: this._map.getBounds().toBBoxString(),
                    height: size.y,
                    width: size.x,
                    layers: this.wmsParams.layers,
                    query_layers: this.wmsParams.layers,
                    info_format: 'application/json'
                };

            params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x,4);
            params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);

            // return this._url + L.Util.getParamString(params, this._url, true);

            var url = this._url + L.Util.getParamString(params, this._url, true);


            /**
             * CORS workaround (using a basic php proxy)
             *
             * Added 2 new options:
             *  - proxy
             *  - proxyParamName
             *
             */

            // check if "proxy" option is defined (PS: path and file name)
            if(typeof this.wmsParams.proxy !== "undefined") {


                // check if proxyParamName is defined (instead, use default value)
                if(typeof this.wmsParams.proxyParamName !== "undefined")
                    this.wmsParams.proxyParamName = 'url';

                // build proxy (es: "proxy.php?url=" )
                _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';

                url = _proxy + encodeURIComponent(url);

            }

            return url;

        },

        showGetFeatureInfo: function (err, latlng, content) {
            if (err) { console.log(err); return; } // do nothing if there's an error

            // Otherwise show the content in a popup, or something.

            temp_data =JSON.parse(content).features[0].properties;

            var key = Object.keys(temp_data)

            var html_content = "<div style='height: 400px;overflow: scroll;'><table  class='table table-striped table-hover'>"
            for(var i=0;i<key.length;i++){

                if(key[i]== 'api'){
                    html_content += "<tr><td style='font-weight: bold'> "+key[i]+"</td><td><a href='http://www.senecainfo.com/wellinfo/pdf_fe47s.asp?listPDF="+temp_data[key[i]]+"' target='_blank'>"+temp_data[key[i]]+"</a></td></tr>"

                }else{
                    html_content += "<tr><td style='font-weight: bold'> "+key[i]+"</td><td>" +temp_data[key[i]]+"</td></tr>"

                }


            }

            html_content +="</table></div>"

            L.popup({ maxWidth: 800})
                .setLatLng(latlng)
                .setContent(html_content)
                .openOn(this._map);



        }
    });

    L.tileLayer.betterWms = function (url, options) {
        return new L.TileLayer.BetterWMS(url, options);
    };

    var myLayers=[];
    var layersObj={}
    var layersSwitcher=[];

function addShapefile(file){

    // if(layerSwitch!=undefined){
    //     map.removeControl(layerSwitch);
    // }

    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
        var data = reader.result;
        //  shapefile = new L.Shapefile(data);
        //   var options={'name':file.name}
        myLayers[file.name]=new L.Shapefile(data);
        // myLayers[file.name].id=file.name
        var filename=file.name

        layersObj[filename]=myLayers[file.name];
        layersSwitcher.push(layersObj);

        map.addLayer(myLayers[file.name]);




        var str='<li id="'+file.name+'" class="list-group-item" >'+
            '<input onclick="turnLayerOnOf(this,'+"'"+file.name+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+file.name+'</span>' +
           // '<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
          //  '<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
            '<button style="margin-left: 0px;"  type="button" onclick="removeFile('+"'"+file.name+"'"+')" class="btn-subnav " data-toggle="dropdown">' +
           // '<span class="glyphicon glyphicon-minus"></span>' +
            '-'+
            '</button><br />'+
            "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
            '</li>';

        $("#layerList").append(str);
        setTimeout(function(){
            //layerIds.push(file.name)
            map.fitBounds(myLayers[file.name].getBounds());
            //    alert(ls.getLayersIds())
            //    layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));

        },300)

        //    map.addControl(L.staticLayerSwitcher(myLayers, { editable: true }));

        // readAttributesFromShapefile(data , file.name);
        // addLayerToToc(file.name , ac_shpfile);
    }
}




    function addWmsUrlHere(){
        var wms = prompt("Please enter url and layer name here", "https://geoserver.nugeo.solutions/geoserver/nugeo/wms?, nugeo:zoning_rtmpaj");

        var wmsUrls=wms.split(',');
        var name=wmsUrls[1].split(':')

        addWmsToMap(wmsUrls[0],wmsUrls[1],name[1]);

    }

    function addWmsToMap(url,layer,name){


        myLayers['wms']=L.tileLayer.betterWms(url, {
            layers: layer,
            format: 'image/png',
            transparent: true,
            version: '1.1.0',
            zIndex:100,
            proxy:'services/proxy.php',
            proxyParamName:'url'
        });



        // layerDiv = "#overlay-list";
        // var layerActive = "";
        // layerActive = "checked";
        // var i=maplayers.length-1;
        myLayers['wms'].addTo(map);

        var str='<li id="'+'wms'+'" class="list-group-item" >'+
            '<input onclick="turnLayerOnOf(this,'+"'"+'wms'+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+'wms'+'</span>' +
            // '<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
            //  '<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
            '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+'wms'+"'"+')" class="btn-subnav " data-toggle="dropdown">' +
            // '<span class="glyphicon glyphicon-minus"></span>' +
            '-'+
            '</button>'+
            // "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
            '</li>';

        $("#layerList").append(str);
        setTimeout(function(){
            //layerIds.push(file.name)
            map.fitBounds(myLayers['wms'].getBounds());
            //    alert(ls.getLayersIds())
            //    layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));

        },300)

        // $(layerDiv).append(
        //     '                    <li id="'+layer+'"><div class="row">' +
        //     '                        <div class="col-md-10" style="background: lavender;cursor: pointer;padding-left: 40px;"  >' +
        //     '                            <label style="width: fit-content" class="check ">'+name+
        //     '                                <input type="checkbox" '+layerActive+' class="lyr1"  name="is_name" id='+i+'@@'+name+'>' +
        //     '                                <span class="checkmark"></span>' +
        //     '                            </label>' +
        //     '                        </div>' +
        //     '                       <div>' +
        //     '                           <div class="col-md-10" style="display: inline;font-size: x-small;padding-left: 0px;padding-right: 0px;">' +
        //     '                               <button type="button" style="margin-left: 20px;" title="Zoom to extent" id='+i+'@'+name+' class="btn btn-link">Zoom To Extent</button>' +
        //     '                           </div>' +
        //     '                           <div class="col-md-10" style="padding-left: 40px;">' +
        //     '                               <input type="range" class="custom-range"  min="0" max="100" value="100"   id='+i+'@@@'+name+'>' +
        //     '                           </div>' +
        //     '                       </div>' +
        //     '                    </div></li>'
        // )
        // $('#overlay-list').sortable({
        //     /*connectWith: ".connectedSortable",*/
        //     update: function( event, ui ) {
        //
        //         getsorted_array()
        //
        //     }}).disableSelection();

        //var json_str='{url:'+"'"+url+"'"+',layer:'+"'"+layer+"'"+',visible:true,type:'+"'overlay'"+'}';
        // var out=JSON.parse(json_str)
        // var obj = new Object();
        // obj[name]={}
        // wms_layers[i]=obj;
        // wms_layers[i][name]={"url":url,"layer":layer,visible:true,type:'overlay'}
        //
        //
        // $('#layerList').on('click','.lyr1',function(){
        //     console.log(this.id)
        //     if(wms_layers[i][(this.id).split('@@')[1]]['visible']){
        //         console.log((this.id).split('@@'));
        //         removelayer((this.id).split('@@')[0])
        //         wms_layers[i][(this.id).split('@@')[1]]['visible']=false;
        //     }else{
        //         addlayer((this.id).split('@@')[0],(this.id).split('@@')[1])
        //         wms_layers[i][(this.id).split('@@')[1]]['visible']=true;
        //     }
        // });
    }

    function addGeoJson(file){
        // -- helper from viz.js test of geojson-vt
        // $("#dropArea").html("<br/><br/>Loading... " + file.name.toString());
        var start = new Date().getTime();
        var reader = new FileReader();

        reader.readAsText(file);
        reader.onload = function (event) {
            var elapsed = new Date().setTime(new Date().getTime() - start);
            // $("#dropArea").html($("#dropArea").html()+" " + elapsed + "ms");
            // $("#dropArea").html($("#dropArea").html()+"<br/>&nbsp;Parsing... " + humanFileSize(event.target.result.length));


            var data = JSON.parse(event.target.result);
            var filename=file.name
           // selectedLayerData={"filename":filename,"data":data};
           // selectedLayerDataArray.push(selectedLayerData);
           // attributes[file.name] = readAttributesFromGeoJson(data);
            // $("#dropArea").html($("#dropArea").html()+"<br/>&nbsp;Indexing... " + data.features.length + " features");
            var highlight;
            var clearHighlight = function() {
                if (highlight) {
                    vectorGrid.resetFeatureStyle(highlight);
                }
                highlight = null;
            };
            var vectorGrid;
            if(data.features[0].geometry.type=="Point"){
                myLayers[file.name] = L.geoJSON(data, {
                    onEachFeature: function (feature, layer) {
                        layer.on('click', function (e) {
                            drawnItems.addLayer(layer);
                            var tbl= '<table class="table_draw" id="tbl_Info"></table>' +
                                '<table><tr><td><button onclick="append_row()">Add Row</button></td><td><button onclick="save_geojson('+layer_id+')">Save</button></td><td><button onclick="get_info_window_table('+layer_id+')">get table</button></td><td><a href="#" id="export">Export Features</a></td></tr></table>';
                            layer.bindPopup(tbl, {
                                minWidth : 300
                            });
                        });
                    }
                });
                map.addLayer( myLayers[file.name]);
                setTimeout(function(){
                    //layerIds.push(file.name)
                    map.fitBounds(myLayers[file.name].getBounds());
                    //    alert(ls.getLayersIds())
                    //    layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));

                },300)
            }
            else{

                myLayers[file.name] = L.geoJSON(data, {
                    onEachFeature: function (feature, layer) {
                        layer.on('click', function (e) {
                            // e.target.editing.enable();

                            var layer_id =L.Util.stamp(layer);
                            var feature = layer.feature = layer.feature || {};
                            feature.type = feature.type || "Feature";
                            feature.properties = feature.properties||{};
                            var lyr_properties=feature.properties;
                            // feature.properties.style = feature.properties || {};
                            console.log(feature);
                            // var tbl= '<table class="table_draw" id="tbl_Info"></table>' +
                            //     '<table><tr><td><button onclick="append_row()">Add Row</button></td><td><button onclick="save_geojson('+layer_id+')">Save</button></td><td><button onclick="get_info_window_table('+layer_id+')">get table</button></td><td><a href="#" id="export">Export Features</a></td></tr></table>';
                            var tbl = '<table id="tbl_Info" class="table table-striped">'
                            $.each( lyr_properties, function( key, value ) {
                                tbl=tbl+'<tr><td>'+key+'</td><td>'+value+'</td></tr>';
                            });
                            tbl=tbl+'</table>';
                            layer.bindPopup(tbl, {
                                minWidth : 300
                            });

                            drawnItems.addLayer(layer);
                        });
                    }
                });
                map.addLayer( myLayers[file.name]);


                setTimeout(function(){
                    //layerIds.push(file.name)
                    map.fitBounds(myLayers[file.name].getBounds());
                    //    alert(ls.getLayersIds())
                    //    layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));

                },300)
                // myLayers[file.name] = L.vectorGrid.slicer(data)
                //
                // map.addLayer( myLayers[file.name]);
            }

            var str='<li onclick="dataForGeoprocessing('+"'"+file.name+"'"+',this)" id="'+file.name+'" class="list-group-item" >'+
                '<input onclick="turnLayerOnOf(this,'+"'"+file.name+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+file.name+'</span>' +
                //'<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
                //'<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
                '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+file.name+"'"+')" class="btn-subnav" data-toggle="dropdown">' +
                '-' +
                '</button><br />'+
                "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
                '</li>';
            $("#layerList").append(str);
            //  addLayerToToc(file.name , vectorGrid);

            //   map.addControl(L.staticLayerSwitcher(myLayers, { editable: true }));


        }

    }



    function addKml(file){
        //
        // if(layerSwitch!=undefined){
        //     map.removeControl(layerSwitch);
        // }
        var reader = new FileReader();
        reader.onload = function() {

            var dataUrl = this.result;

            myLayers[file.name] = new L.KML(dataUrl, {async: true});

            myLayers[file.name].on("loaded", function(e) {
                map.fitBounds(e.target.getBounds());
               // layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));
            });

            var filename=file.name;

            //  layersObj={filename:myLayers[file.name]};
            layersObj[filename]=myLayers[file.name];

            // layersSwitcher.push(layersObj)


            map.addLayer( myLayers[file.name]);

            var str='<li id="'+file.name+'" class="list-group-item" >'+
                '<input onclick="turnLayerOnOf(this,'+"'"+file.name+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+file.name+'</span>' +
               // '<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
               // '<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
                '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+file.name+"'"+')" class="btn-subnav" data-toggle="dropdown">' +
                '-' +
                '</button><br />'+
                "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
                '</li>';
            $("#layerList").append(str);
            // readAttributesFromKml(dataUrl);
            // addLayerToToc(file.name , kmlLayer);
        }
        reader.readAsDataURL(file);

        //  map.addControl(L.staticLayerSwitcher(myLayers, { editable: true }));

    }


    function addCsvFile(file){
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function (event) {
            var lines = event.target.result.split(/[\r\n]+/g);
            var columnsIndices = {};
            var geoJson = {};
            geoJson["type"] = 'FeatureCollection';
            geoJson["features"] = [];
            for(var i = 0; i < lines.length; i++) {
                if(i==0){
                    var columns = lines[i].split(",");
                    for(var j = 0; j < columns.length; j++) {
                        columnsIndices[j] = columns[j];
                    }
                    continue;
                }
                var columns = lines[i].split(",");
                var feature = {};
                feature["type"] = "Feature";
                var featureGeomatery = {};
                var featureProperties = {};
                featureGeomatery["type"] = "Point";
                featureGeomatery["coordinates"] = [0,0];
                for(var j = 0; j < columns.length; j++) {
                    if(columnsIndices[j]=="Latitude"){
                        featureGeomatery["coordinates"][1]=parseFloat(columns[j]);
                    }
                    else if(columnsIndices[j]=="Longitude"){
                        featureGeomatery["coordinates"][0]=parseFloat(columns[j]);
                    }
                    else{
                        featureProperties[columnsIndices[j]]=columns[j];
                    }
                }
                feature["geometry"] = featureGeomatery;
                feature["properties"] = featureProperties;
                geoJson["features"].push(feature);
            }
            try{
                myLayers[file.name]=L.geoJSON(geoJson, {}).addTo(map);

                map.fitBounds(myLayers[file.name].getBounds());


                var filename=file.name;

                //  layersObj={filename:myLayers[file.name]};
                layersObj[filename]=myLayers[file.name];

                // layersSwitcher.push(layersObj)


                map.addLayer( myLayers[file.name]);

                var str='<li id="'+file.name+'" class="list-group-item" >'+
                    '<input onclick="turnLayerOnOf(this,'+"'"+file.name+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+file.name+'</span>' +
                   // '<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
                   // '<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
                    '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+file.name+"'"+')" class="btn-subnav" data-toggle="dropdown">' +
                    '-' +
                    '</button><br />'+
                    "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
                    '</li>';
                $("#layerList").append(str);


            }
            catch(err){
                alert("Layer has following error \n"+err);
            }

        }


    }

    function addGPX(file){

        var reader = new FileReader();
        reader.onload = function() {

            var dataUrl = this.result;

            myLayers[file.name] = new L.GPX(dataUrl, {async: true});

            myLayers[file.name].on("loaded", function(e) {
                map.fitBounds(e.target.getBounds());
               // layerSwitch=map.addControl(L.staticLayerSwitcher(layersObj, { editable: true }));
            });

            var filename=file.name;

            //  layersObj={filename:myLayers[file.name]};
            layersObj[filename]=myLayers[file.name];

            // layersSwitcher.push(layersObj)


            map.addLayer( myLayers[file.name]);

            var str='<li id="'+file.name+'" class="list-group-item" >'+
                '<input onclick="turnLayerOnOf(this,'+"'"+file.name+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+file.name+'</span>' +
               // '<img onclick="upLayer(this , \''+file.name+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
               // '<img onclick="downLayer(this , \''+file.name+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
                '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+file.name+"'"+')" class="btn-subnav " data-toggle="dropdown">' +
                '-' +
                '</button><br />'+
                "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+file.name+"\",\""+'myLayers'+"\")'>"+
                '</li>';
            $("#layerList").append(str);
            // readAttributesFromKml(dataUrl);
            // addLayerToToc(file.name , kmlLayer);
        }
        reader.readAsDataURL(file);


    }


    function removeFile(name){

        map.removeLayer(myLayers[name]);
        // $('#'+name).remove();
        var div = document.getElementById(name);
        if(div!=null) {
            div.parentNode.removeChild(div);
        }

    }
    function turnLayerOnOf(element,name){
        if($(element).is(":checked")){
            map.addLayer(myLayers[name])
        }
        else{
            map.removeLayer(myLayers[name]);
        }
    }


