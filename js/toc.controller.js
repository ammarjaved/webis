var selectionApp=angular.module('tocApp',['ivh.treeview']);
var mylayer=[];
var arrayOfAddedLayers=[]
var geoLayersIdForIdentifier=0;
var url=''
var geolayers=[];
var allAdminData;
var scope;
var buferValueForLine;
var tocJson=[];
var addLayerJsonArray=[];
var addLayerJson={};
var saveJsonObj={};
var ipAddress="";
var my_last_index=0

//var infoRes=[];
selectionApp.controller('tocController',['$scope','$http','$timeout' ,function($scope,$http,$timeout){

                var self=this;



                //$scope.items = [1,2,3,4,5];
                //$scope.selected = [1];
                $scope.parentArray=[];
                $scope.childArray=[];
                $scope.subchildArray=[];
                $scope.imageArray=[];
                $scope.layerIndex=[];
                $scope.finalArray=[];
                $scope.onLayers=[];
                $scope.offLayers=[];

                $scope.allAdministrativeData={};

                $scope.admin_division = [];
                $scope.admin_district = [];
                $scope.admin_mz=[];
                $scope.allGeoLevels=[];
                $scope.allSource=[];
                $scope.allYears=[];
                $scope.indicatorId='';
                $scope.levelSelect='';
                $scope.yearSelect='';
                $scope.sourceSelect='';

                //  $scope.div_boundry='Div Boundry';
                $scope.cp=1;






                self.tplFolderOpen = '<i class="fas fa-folder-open"></i>';
                self.tplFolderClose = '<i class="fas fa-folder"></i>';
                self.tplLeaf = '<span class="twistie glyphicon glyphicon-map-marker"></span>';
               // self.tplLeaf =['1','2','3','4','5','6','7','8'] ;

                self.bag=[];







                var mainUrlTocIndex=0
                $scope.mainTocUrl=[];

           function mainTocCreator(url) {
               L.esri.request(url, {},
                   function (error, response) {
                       //      console.log(response.layers);
                       var mainArray_res = response.layers;
                       $scope.createToc(mainArray_res,$scope.mainTocUrl[0],0);



                   });
           }


                 //   mainTocCreator();







                        $scope.createToc=function(mainArray,mainTocUrl,myind) {
                            setTimeout(function () {
                                //  angular.element(document.getElementById("toc")).scope().createToc(mainArray);


                               // $scope.finalArray = [];
                                for (var i = 0; i < mainArray.length; i++) {

                                    var j = 1;
                                    $scope.childArray = [];
                                    if (mainArray[i].parentLayerId == -1) {
                                        k = 0;
                                        if (mainArray[i].subLayerIds == null) {

                                            if (mainArray[i].defaultVisibility == true) {
                                                $scope.onLayers.push(i);
                                                $scope.childArray.push({
                                                    label: mainArray[i].name,
                                                    value: mainArray[i].id,
                                                    selected: true
                                                });
                                            } else {
                                                $scope.childArray.push({
                                                    label: mainArray[i].name,
                                                    value: mainArray[i].id
                                                });
                                            }

                                        } else {
                                        for (j; j < mainArray.length; j++) {


                                                if (mainArray[j].id == mainArray[i].subLayerIds[k]) {
                                                    k++
                                                    $scope.subchildArray=[];
                                                    if (mainArray[j].subLayerIds != null) {

                                                        for (var l = mainArray[j].id + 1; l < mainArray[j].id + 1 + mainArray[j].subLayerIds.length; l++) {
                                                            $scope.sub_subchildArray=[];
                                                            if (mainArray[l].subLayerIds != null) {
                                                                for (var m = mainArray[l].id+1 ; m < mainArray[l].id+1+ mainArray[l].subLayerIds.length; m++) {
                                                                    if (mainArray[m].defaultVisibility == true) {
                                                                        $scope.onLayers.push(m);
                                                                        $scope.sub_subchildArray.push({
                                                                            label: mainArray[m].name,
                                                                            value: mainArray[m].id,
                                                                            selected: true
                                                                        });
                                                                    } else {
                                                                        $scope.sub_subchildArray.push({
                                                                            label: mainArray[m].name,
                                                                            value: mainArray[m].id
                                                                        });
                                                                    }

                                                                }

                                                                l++

                                                                if (mainArray[l].defaultVisibility == true) {
                                                                    // $scope.onLayers.push(j);
                                                                    $scope.subchildArray.push({
                                                                        label: mainArray[l].name,
                                                                        value: mainArray[l].id,
                                                                        selected: true,
                                                                        children: $scope.sub_subchildArray
                                                                    });
                                                                } else {
                                                                    $scope.subchildArray.push({
                                                                        label: mainArray[l].name,
                                                                        value: mainArray[l].id,
                                                                        children: $scope.sub_subchildArray
                                                                    });
                                                                }

                                                            }else {
                                                                if (mainArray[l].defaultVisibility == true) {
                                                                    $scope.onLayers.push(l);
                                                                    $scope.subchildArray.push({
                                                                        label: mainArray[l].name,
                                                                        value: mainArray[l].id,
                                                                        selected: true
                                                                    });
                                                                } else {
                                                                    $scope.subchildArray.push({
                                                                        label: mainArray[l].name,
                                                                        value: mainArray[l].id
                                                                    });
                                                                }
                                                            }
                                                        }

                                                        if (mainArray[j].defaultVisibility == true) {
                                                            // $scope.onLayers.push(j);
                                                            $scope.childArray.push({
                                                                label: mainArray[j].name,
                                                                value: mainArray[j].id,
                                                                selected: true,
                                                                children: $scope.subchildArray
                                                            });
                                                        } else {
                                                            $scope.childArray.push({
                                                                label: mainArray[j].name,
                                                                value: mainArray[j].id,
                                                                children: $scope.subchildArray
                                                            });
                                                        }

                                                    } else {
                                                        if (mainArray[j].defaultVisibility == true) {
                                                            $scope.onLayers.push(j);
                                                            $scope.childArray.push({
                                                                label: mainArray[j].name,
                                                                value: mainArray[j].id,
                                                                selected: true

                                                            });
                                                        } else {
                                                            $scope.childArray.push({
                                                                label: mainArray[j].name,
                                                                value: mainArray[j].id

                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        //if(mainArray[i].subLayerIds==null){
                                        //    $scope.childArray=[];
                                        //    $scope.childArray.push({
                                        //        label: mainArray[i].name,
                                        //        value: mainArray[i].id
                                        //    });
                                        //
                                        //    $scope.finalArray.push({
                                        //        label: mainArray[i].name,
                                        //        value: mainArray[i].id,
                                        //        children:$scope.childArray
                                        //    });
                                        //}else {
                                        $scope.finalArray.push({
                                            label: mainArray[i].name,
                                            value: mainArray[i].id,
                                            children: $scope.childArray
                                        });
                                        //  }
                                    }

                                    geolayers[mainArray[i].name] = L.esri.dynamicMapLayer({
                                        url: mainTocUrl,
                                        opacity: 0.7,
                                        layers: [i]
                                    });
                                    if (mainArray[i].parentLayerId != -1 && mainArray[i].defaultVisibility == true) {
                                        map.addLayer(geolayers[mainArray[i].name])
                                    }


                                }








                                $scope.bag = $scope.finalArray;
                                $scope.$apply();


                                $http({

                                    method: 'GET',
                                    url: mainTocUrl+'/legend?f=pjson',
                                    header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'},
                                    params: {}
                                }).success(function (data) {
                                    for (var i = 0; i < data.layers.length; i++) {
                                        if($('[title="' + data.layers[i].layerName + '"]').length>1){
                                            var node = document.querySelectorAll('[title="' + data.layers[i].layerName + '"]')[1];

                                        }else {
                                            var node = document.querySelector('[title="' + data.layers[i].layerName + '"]');

                                        }
                                        if($("span:contains('"+data.layers[i].layerName+"')").length>1){
                                            var node1=$("span:contains('"+data.layers[i].layerName+"')")[1];
                                        }else{
                                            var node1=$("span:contains('"+data.layers[i].layerName+"')");
                                        }

                                        // if(node1.length>1){
                                        //     node2= node1[1];
                                        //     node1=node2;
                                        // }
                                        //'<span onclick="filterLayers('+"'"+data.layers[i].layerName+"'"+','+"'"+data.layers[i].layerId+"'"+')" class="glyphicon glyphicon-filter"></span>'

                                        var template = document.createElement('template');
                                        template.innerHTML = '<span onclick="filterLayers('+"'"+data.layers[i].layerName+"'"+','+"'"+data.layers[i].layerId+"'"+')" class="glyphicon glyphicon-filter"></span>';
                                        nodes = template.content.childNodes
                                    //    console.log(nodes[0]);
                                  //      console.log(node);
                                        if(node!=null) {
                                            node.appendChild(nodes[0]);
                                        }else{
                                         continue;
                                        }
                                        var siliderStr="<div style='padding-right: 10px;'><input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+data.layers[i].layerId+"\",\""+'geolayer'+"\")'></div>";
                                        var template = document.createElement('template');
                                        template.innerHTML = siliderStr;
                                        nodes = template.content.childNodes
                                        node.appendChild(nodes[0]);

                                        if(data.layers[i].legend.length>1){
                                            for(var k=0;k<data.layers[i].legend.length;k++) {
                                                // var img = document.createElement('img');
                                                // img.src = 'data:image/png;base64 , ' + data.layers[i].legend[k].imageData;
                                                // img.setAttribute("hspace", "30");
                                                // node.appendChild(img);

                                                //
                                                var src = 'data:image/png;base64 , ' + data.layers[i].legend[k].imageData;
                                                var str ='<div style="padding-left: 30px;" class="row">' +
                                                    data.layers[i].legend[k].label+'<img style="padding-left: 5px;" src="'+src+'">'+
                                                   //'<img onclick="identifyMe('+data.layers[i].layerId+','+"'"+"http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_v_02112017/MapServer"+"'"+')" width="20px" height="20px" src="images/images.png">' +
                                                   // '<img onclick="calculateStatistics('+"'"+data.layers[i].legend[k].label+"'"+')" src="images/Iris.png" width="20px" height="20px">' +
                                                    // '<span onclick="mySpQuery('+data.layers[i].layerId+','+"'"+"http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_v_02112017/MapServer"+"'"+')" class="glyphicon glyphicon-map-marker">' +
                                                    // '</span>' +
                                                    '</div>';
                                                      //   '<p>'+ data.layers[i].legend[k].label+'</p></div>';

                                           //     node1.append(str);
                                                var template = document.createElement('template');
                                                template.innerHTML = str;
                                                nodes = template.content.childNodes

                                                if(myind==1) {
                                                    node1[0].appendChild(nodes[0]);
                                                }else if(myind==0){
                                                    node1.appendChild(nodes[0]);
                                                }else if(myind==2){
                                                    if(node1.appendChild) {
                                                        node1.appendChild(nodes[0]);
                                                    }else{
                                                        node1[0].appendChild(nodes[0]);
                                                    }
                                                }

                                                //document.querySelector('[title="' + data.layers[j].layerName + '"]').appendChild(nodes[0]);

                                            }

                                        }else {
                                            var src = 'data:image/png;base64 , ' + data.layers[i].legend[0].imageData;
                                            var str ='<div style="padding-left: 30px;" class="row">' +
                                                data.layers[i].layerName+'<img  style="padding-left: 5px;" src="'+src+'">'+
                                               // '<img onclick="identifyMe('+data.layers[i].layerId+','+"'"+"http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_v_02112017/MapServer"+"'"+')" width="20px" height="20px" src="images/images.png">' +
                                                //'<img onclick="calculateStatistics('+"'"+data.layers[i].layerName+"'"+')" src="images/Iris.png" width="20px" height="20px">' +
                                                //'<span onclick="mySpQuery('+data.layers[i].layerId+','+"'"+"http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_v_02112017/MapServer"+"'"+')" class="glyphicon glyphicon-map-marker"></span>' +
                                                '</div>';
                                               // '<p>'+ data.layers[i].legend[k].label+'</p></div>';

                                            if($("span:contains('"+data.layers[i].layerName+"')").length>1){
                                                var template = document.createElement('template');
                                                template.innerHTML = str;
                                                nodes = template.content.childNodes
                                                node1.appendChild(nodes[0]);
                                            }else {
                                                node1.html(str);
                                            }
                                            // var template = document.createElement('template');
                                            // template.innerHTML = str;
                                            // nodes = template.content.childNodes
                                            // node.appendChild(nodes[0]);

                                            // var img = document.createElement('img');
                                            // img.src = 'data:image/png;base64 , ' + data.layers[i].legend[0].imageData;
                                            // img.setAttribute("hspace", "30");
                                            // node.appendChild(img);
                                        }
                                    }

                                });

                                //    console.log(JSON.stringify($scope.finalArray));
                                //    geolayers.setLayers($scope.onLayers);
                            }, 300);
                        }







                this.awesomeCallback = function(node, tree) {
                    alert("hi")
                };

                this.otherAwesomeCallback = function(node, isSelected, tree) {
                    $scope.layerIndex1=[];
                    map.off('click');
                    $scope.layerInfos=[];
                   // $scope.$apply();

                    if(node.children!=undefined) {
                        //if (node.children.length == $scope.layerIndex.length) {
                        // if(node.selected==false){
                        // //    map.addLayer(geolayers[nodes.value]);
                        // //}else{
                        //
                        //     map.removeLayer(geolayers[node.value]);
                        // }
                            for (var i = 0; i < node.children.length; i++) {
                                if (node.selected == true) {
                                    //$scope.layerIndex1.push(node.children[i].value)
                                    if(node.children[i].children!=undefined) {
                                        for (var j = 0; j < node.children[i].children.length; j++) {
                                            map.addLayer(geolayers[node.children[i].children[j].label]);
                                            tocJson.push({
                                                "layer": "geoLayers",
                                                "node": node.children[i],
                                                "value": "value"
                                            })
                                        }

                                    }else {
                                        map.addLayer(geolayers[node.children[i].label]);
                                        tocJson.push({"layer": "geoLayers", "node": node.children[i], "value": "value"})
                                    }
                                }else{
                                    for(var k=0;k<tocJson.length;k++){
                                        if(node.children[i]==tocJson[k].node){
                                            tocJson.splice(k, 1);
                                        }
                                    }
                                    if(node.children[i].children!=undefined) {
                                        for (var j = 0; j < node.children[i].children.length; j++) {
                                            map.removeLayer(geolayers[node.children[i].children[j].label]);

                                        }

                                    }else {
                                        map.removeLayer(geolayers[node.children[i].label]);
                                    }
                                }
                            }
                          //  geolayers.setLayers($scope.layerIndex1)
                      //  }
                    }else {

                        if (isSelected == true) {
                            //$scope.onLayers.push(node.value);
                            //geolayers.setLayers($scope.onLayers);

                            if(node.name=='catalog') {
                            //     mylayer=L.esri.dynamicMapLayer({
                            //    url: 'http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_13112017/MapServer',
                            //    opacity: 0.7,
                            //    layers: [node.value]
                            //})

                                map.addLayer(mylayer[node.label])
                            }else {
                                map.addLayer(geolayers[node.label]);
                                tocJson.push({"layer":"geoLayers","node":node,"value":"value"})

                            }
                        }

                        if (isSelected == false) {

                            if(node.name=='catalog') {
                                map.removeLayer(mylayer[node.value]);
                            }else {
                                map.removeLayer(geolayers[node.label]);
                            }
                            for(var k=0;k<tocJson.length;k++){
                                if(node==tocJson[k].node){
                                    tocJson.splice(k, 1);
                                }
                            }
                            //$scope.offLayers=[];
                            //for(var i=0;i<$scope.onLayers.length;i++) {
                            //    if(node.value!=$scope.onLayers[i])
                            //    $scope.offLayers.push($scope.onLayers[i])
                            //}
                            //$scope.onLayers=$scope.offLayers;
                            //geolayers.setLayers($scope.offLayers);
                        }

                    }

                }


                $scope.showAdvanced = function(ev) {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'template/addlayers.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });
                };









                var scoreIndex=1;

                $scope.createTableOfScores=function(data){

                        var per=100/data.length;
                        var allLayers=[];
                        var total=0;

                    var str='<table class="table table-striped">'+
                        '<thead>'+
                        '<tr>'+
                        '<th>Factor Name</th>'+
                        '<th>Percentage</th>'+
                        '<th>Value</th>'+
                        '<th>Score</th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody>';
                    for(var i=0;i<data.length;i++){
                        var total1=total+(per/100)*data[i][0].count;
                        total=total1;
                        if(data[i][0].count!=null) {
                            str = str + '<tr>' +
                                '<td>' + data[i][1].name + '</td>' +
                                '<td>' + parseInt(per) + '</td>' +
                                '<td>' + parseInt(data[i][0].count) + '</td>' +
                                '<td>' + parseInt((per / 100) * data[i][0].count) + '</td>' +
                                '</tr>';
                        }else{
                            str = str + '<tr>' +
                                '<td>' + data[i][1].name + '</td>' +
                                '<td>' + parseInt(per) + '</td>' +
                                '<td>' + parseInt(0) + '</td>' +
                                '<td>' + parseInt(0) + '</td>' +
                                '</tr>';
                        }

                        var layer=L.geoJSON(data[i][2].features);
                        allLayers.push(layer);

                     //   map.addLayer(layer)
                    }
                    myLayers['score_point_layer'+scoreIndex]=L.layerGroup(allLayers).addTo(map);

                    var str1='<li id="'+'score_point_layer'+scoreIndex+'" class="list-group-item" >'+
                        '<input onclick="turnLayerOnOf(this,'+"'"+'score_point_layer'+scoreIndex+"'"+')" class="leaflet-control-layers-selector" type="checkbox" checked><span>'+'score_point_layer'+scoreIndex+'</span>' +
                       // '<img onclick="upLayer(this , \''+'bufferlayer'+'\')" src="images/up.png" style="height:20px; width:20px; cursor:pointer">'+
                        //'<img onclick="downLayer(this , \''+'bufferlayer'+'\')" src="images/down.png" style="height:20px; width:20px; cursor:pointer">'+
                        '<button style="margin-left: -10px;"  type="button" onclick="removeFile('+"'"+'score_point_layer'+scoreIndex+"'"+')" class="btn-subnav dropdown-toggle" data-toggle="dropdown">' +
                        '<span class="glyphicon glyphicon-minus"></span>' +
                        '</button>'+
                        "<input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , "+'score_point_layer'+scoreIndex+","+'myLayers'+")'>"+
                        '</li>';
                    $("#userLayers").append(str1);
                    str=str+'<tr>' +
                            '<td>Total</td>'+
                            '<td>-</td>'+
                            '<td>-</td>'+
                            '<td>'+parseInt(total)+'</td>'+
                            '</tr>';
                    str=str+'</tbody>'+
                            '</table>'

                    myLayers['score_point_layer'+scoreIndex].eachLayer(function(layer){
                        layer.bindPopup(str, {
                            minWidth : 300
                        })
                    });

                    scoreIndex++;


                    $mdDialog.show({
                        controller: DialogController,
                        template: '<md-dialog id="dt_dialog" aria-label="drive time">' +
                        '<md-toolbar>'+
                        '<div class="md-toolbar-tools">'+
                        '<h2>Score Table</h2>'+
                        '<span flex></span>'+
                        '<md-button class="md-icon-button" ng-click="cancel()">'+
                        '<md-icon md-svg-src="images/ic_clear_black_24px.svg" aria-label="Close dialog">'+
                        '</md-icon>'+
                        '</md-button>'+
                        '</div>'+
                        '</md-toolbar>' +
                         '<div>'+str+'</div>'+
                        '</md-dialog>',
                        parent: angular.element(document.body),
                        //targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });

                }



                $scope.createBufferOnLineData=function(ev){
                    $mdDialog.show({
                        controller: DialogController,
                        template: '<md-dialog id="dt_dialog" aria-label="drive time"><md-toolbar>'+
                        '<div class="md-toolbar-tools">'+
                        '<h2>Plz enter value in KM</h2>'+
                        '<span flex></span>'+
                        '<md-button class="md-icon-button" ng-click="cancel()">'+
                        '<md-icon md-svg-src="images/ic_clear_black_24px.svg" aria-label="Close dialog">'+
                        '</md-icon>'+
                        '</md-button>'+
                        '</div>'+
                        '</md-toolbar>' +
                        '<div style="padding-top: 3px;" class="col-md-12">Buffer in KM: <input type="text" name="buffer" placeholder="1" value="1" id="bufferOnline"></md-dialog></div>'+
                        '<div class="col-md-4"><md-button ng-click="createBufferOnLineFunction()" class="md-primary">' +
                        '      OK' +
                        '    </md-button></div>'+
                        '<div class="col-md-4"><md-button ng-click="removeBufferfunction()" class="md-primary">' +
                        '      Stop' +
                        '    </md-button></div>',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });

                }





                $scope.spQuery = function(id,url) {
                    $mdDialog.show({
                        controller: DialogController,
                        template: '<md-dialog id="dt_dialog" aria-label="drive time"><md-toolbar>'+
                        '<div class="md-toolbar-tools">'+
                        '<h2>Plz enter value in KM</h2>'+
                        '<span flex></span>'+
                        '<md-button class="md-icon-button" ng-click="cancel()">'+
                        '<md-icon md-svg-src="images/ic_clear_black_24px.svg" aria-label="Close dialog">'+
                        '</md-icon>'+
                        '</md-button>'+
                        '</div>'+
                        '</md-toolbar>' +
                        '<div style="padding-top: 3px;" class="col-md-12">Buffer in KM: <input type="text" name="buffer" placeholder="1" value="1" id="spBufferPoint"></md-dialog></div>'+
                        '<div class="col-md-4"><md-button ng-click="createSpBufferPointFunction('+"'"+id+"'"+','+"'"+url+"'"+')" class="md-primary">' +
                        '      submit' +
                        '    </md-button></div>'+
                        '<div class="col-md-4"><md-button ng-click="removeSpBufferfunction()" class="md-primary">' +
                        '      clear' +
                        '    </md-button></div>',
                        parent: angular.element(document.body),
                     //   targetEvent: ev,
                        clickOutsideToClose:true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });
                };








                $scope.enableMapclickForIdentifier=function () {

                    map.on('click', function (e) {




                        L.esri.identifyFeatures({
                            url: url
                        })
                            .on(map)
                            .at(e.latlng)
                            .layers('visible:' + geoLayersIdForIdentifier)
                            // .layers('23')
                            .run(function (error, featureCollection, response) {
                                $scope.layerInfos = response.results[0].attributes;
                                $scope.$apply();
                            });


                    });

                }





                function DialogController($scope, $mdDialog,$compile,ivhTreeviewOptions) {


                   // $scope.catalogfinalArray=[];
                    $scope.catalogParent=[];
                    var map_catalog;
                    scope=$scope;
                    var layer2=[];
                    $scope.activeCatalogLayer=[];
                    var catalogLayers=[];
                    var tocResponseArray=[];

                    $scope.uploadFile = function (id) {
                        angular.element(document.querySelector('#'+id+'')).click();

                        $("#shpSA").on("change", function (e) {
                            var file = $(this)[0].files[0];
                            addSHPForServiceArea(file);
                            this.value = null;
                        });



                        $("#geojsonSA").on("change", function (e) {
                            var file = $(this)[0].files[0];
                            addGeoJsonForServiceArea(file)
                            this.value = null;
                        });

                        $("#bufferSHPFile").on("change", function (e) {
                            var file = $(this)[0].files[0];
                            addSHPForBuffer(file)
                            this.value = null;
                        });

                    };


                    $scope.saveJobData=function(){

                        var myjobname=$("#jobname").val();
                        saveJsonObj["toc"]=tocJson
                          saveJsonObj["addLayersData"]=addLayerJsonArray;
                        var myJsonData=encodeURIComponent(JSON.stringify(saveJsonObj));
                        console.log(myJsonData);
                        $http({

                            method: 'GET',
                            //    url: 'http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_13112017/MapServer/legend?f=pjson',
                            url:"services/save_job.php?name="+myjobname+"&data="+myJsonData,
                            //       header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'},
                            params: {}
                        }).success(function (data) {
                            alert(data);
                        })

                        $scope.cancel();

                    }







                    $scope.createBufferOnLineFunction=function(){
                        buferValueForLine=$("#bufferOnline").val();
                        createBufferOnLineFeature(buferValueForLine)
                    }

                    $scope.removegptaskfunction=function(){
                        $scope.cancel();
                        removegptask();
                    }

                    $scope.removeBufferfunction=function(){
                        $scope.cancel();
                        removegptask();
                    }

                    $scope.removeSpBufferfunction=function(){
                        $scope.cancel();
                        if(layerdrawnFrombbox){
                            map.removeLayer(layerdrawnFrombbox)
                            map.removeLayer(sBfP)

                        }

                    }

                    //for(var i=0;i<angular.element($("#toc")).scope().finalArray.length;i++){
                    //    if(angular.element($("#toc")).scope().finalArray[i].name) {
                    //        angular.element($("#toc")).scope().finalArray.splice(i, 1);
                    //        //angular.element($("#toc")).scope().$apply();
                    //    }
                    //}http://172.20.81.131:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_05032018/MapServer

                   // var tocUrls=['http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_05032018/MapServer','http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_data_imagery_misc_r_23112017/MapServer'];
                    var tocUrls=['http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_05032018/MapServer','http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_imagery_misc_r_23112017/MapServer'];
                      var arrayIndex=0;
                    setTimeout(function () {
                        map_catalog = L.map("map_catalog", {
                            zoom: 6,
                            center: [31.615965, 72.38554],
                            zoomControl: true,
                            attributionControl: false
                        });
                        L.esri.basemapLayer("Topographic").addTo(map_catalog);
                    }, 500);

                   // for(var n=0;n<tocUrls.length;n++) {



                    $scope.tocArrayIndex=0;

                    $scope.callAddLayerTocLayers=function() {
                        L.esri.request(tocUrls[$scope.tocArrayIndex], {}, function (error, response) {
                            //      console.log(response.layers);
                            //layer2 = response.layers;
                            tocResponseArray.push(response);
                            $scope.tocArrayIndex++
                            //$scope.createAddLayerToc(response);
                            //   setTimeout(function(){

                            // },300)

                            if (tocResponseArray.length == 2) {
                                $scope.addTocArrayToCreateLayerToc();
                            }else if(tocResponseArray.length <2){
                                $scope.callAddLayerTocLayers();
                            }
                        });
                    }


                    $scope.callAddLayerTocLayers();
                    $scope.analysis=[];
                    $scope.waterAnalysis=[];
                    $scope.environmentAnalysis=[];
                    $scope.pssAnalysis=[];



                    $scope.callAnalysisTocLayers=function(name,url) {
                        L.esri.request(url, {}, function (error, response) {

                            if(name=='industry') {
                                $scope.analysis = response;
                            }

                            if(name=='water') {
                                $scope.waterAnalysis = response;
                            }

                            if(name=='environment') {
                                $scope.environmentAnalysis = response;
                            }
                            if(name=='pss') {
                                $scope.pssAnalysis = response;
                            }

                        });
                    }

                    $scope.callAnalysisTocLayers('industry','http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisporta_industyl_pg31_v_15082018/MapServer');
                    $scope.callAnalysisTocLayers('water','http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_water_quality_analysis_pg138_v_07092018/MapServer');
                    $scope.callAnalysisTocLayers('environment','http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_enivormental_quality_analysis_pg138_v_25092018/MapServer');
                    $scope.callAnalysisTocLayers('pss','http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_dss_dimension_r_05122018/MapServer');




                    $scope.addTocArrayToCreateLayerToc=function(){
                        for(var i=0;i<tocResponseArray.length;i++) {
                            $scope.createAddLayerToc(tocResponseArray[i]);
                            arrayIndex++;
                        }
                    }


                    $scope.createAddLayerToc=function (response) {
                        layer2=response.layers;
                        for (var i = 0; i < response.layers.length; i++) {

                            if (layer2[i].subLayerIds != null && layer2[i].parentLayerId == -1) {
                                $scope.catalogchild = []
                                $scope.mainSubChilds=[];
                                $scope.mainSubAnalysis=[];

                                for (var k = layer2[i].subLayerIds[0]; k < layer2[i].subLayerIds[layer2[i].subLayerIds.length - 1] + 1; k++) {
                                    if (layer2[k].subLayerIds != null) {
                                        $scope.catalogchild.push($scope.crateSubChildLayers(layer2[k],layer2));
                                    }else {
                                        $scope.catalogchild.push({text: layer2[k].name, id: layer2[k].id});
                                    }
                                }

                                if(layer2[i].name=='Water Quality') {
                                    for (var k =0; k < $scope.waterAnalysis.layers.length; k++) {
                                        if(k<=my_last_index && k!=0)
                                        {
                                            catalogLayers[$scope.waterAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_water_quality_analysis_pg138_v_07092018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }else {
                                            if ($scope.waterAnalysis.layers[k].subLayerIds != null) {
                                                $scope.mainSubAnalysis.push({
                                                    text: $scope.waterAnalysis.layers[k].name,
                                                    href: '#href',
                                                    nodes: $scope.crateSubChildLayers($scope.waterAnalysis.layers[k], $scope.waterAnalysis.layers)
                                                });
                                                //    k=$scope.analysis.layers[k].subLayerIds[$scope.analysis.layers[k].subLayerIds.length-1];
                                            } else {
                                                //    $scope.mainSubAnalysis.push({text: $scope.analysis.layers[k].name, id: $scope.analysis.layers[k].id});
                                            }


                                            catalogLayers[$scope.waterAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_water_quality_analysis_pg138_v_07092018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }
                                    }
                                }

                                if(layer2[i].name=='Environment') {
                                    for (var k =0; k < $scope.environmentAnalysis.layers.length; k++) {
                                        if(k<=my_last_index && k!=0)
                                        {
                                            catalogLayers[$scope.environmentAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_enivormental_quality_analysis_pg138_v_25092018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }else {
                                            if ($scope.environmentAnalysis.layers[k].subLayerIds != null) {
                                                $scope.mainSubAnalysis.push({
                                                    text: $scope.environmentAnalysis.layers[k].name,
                                                    href: '#href',
                                                    nodes: $scope.crateSubChildLayers($scope.environmentAnalysis.layers[k], $scope.environmentAnalysis.layers)
                                                });
                                                //    k=$scope.analysis.layers[k].subLayerIds[$scope.analysis.layers[k].subLayerIds.length-1];
                                            } else {
                                                //    $scope.mainSubAnalysis.push({text: $scope.analysis.layers[k].name, id: $scope.analysis.layers[k].id});
                                            }


                                            catalogLayers[$scope.environmentAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_data_enivormental_quality_analysis_pg138_v_25092018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }
                                    }
                                }


                                $scope.mainSubChilds.push({
                                    text: "Data",
                                    href: '#href',
                                    nodes: $scope.catalogchild
                                });
                                $scope.mainSubChilds.push({
                                    text: "Analysis",
                                    href: '#href',
                                    nodes: $scope.mainSubAnalysis
                                });
                                $scope.catalogParent.push({
                                    text: layer2[i].name,
                                    href: '#href',
                                    nodes: $scope.mainSubChilds
                                });

                            } else if (layer2[i].subLayerIds == null && layer2[i].parentLayerId == -1) {

                                $scope.catalogchild = [];
                                $scope.mainSubChilds=[];
                                $scope.mainSubAnalysis=[];
                                $scope.catalogchild.push({text: layer2[i].name, id: layer2[i].id});

                                //var k=my_last_index;
                                if(layer2[i].name=='Industry') {
                                    for (var k =0; k < $scope.analysis.layers.length; k++) {
                                        if(k<=my_last_index && k!=0)
                                        {
                                            catalogLayers[$scope.analysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisporta_industyl_pg31_v_15082018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }else {
                                            if ($scope.analysis.layers[k].subLayerIds != null) {
                                                $scope.mainSubAnalysis.push({
                                                    text: $scope.analysis.layers[k].name,
                                                    href: '#href',
                                                    nodes: $scope.crateSubChildLayers($scope.analysis.layers[k], $scope.analysis.layers)
                                                });
                                                //    k=$scope.analysis.layers[k].subLayerIds[$scope.analysis.layers[k].subLayerIds.length-1];
                                            } else {
                                                if(k>my_last_index) {
                                                    $scope.mainSubAnalysis.push({
                                                        text: $scope.analysis.layers[k].name,
                                                        id: $scope.analysis.layers[k].id
                                                    });
                                                }
                                            }



                                            catalogLayers[$scope.analysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisporta_industyl_pg31_v_15082018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }
                                    }


                                    for (var k =0; k < $scope.pssAnalysis.layers.length; k++) {
                                        if(k<=my_last_index && k!=0)
                                        {
                                            catalogLayers[$scope.pssAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_dss_dimension_r_05122018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }else {
                                            if ($scope.pssAnalysis.layers[k].subLayerIds != null) {
                                                $scope.mainSubAnalysis.push({
                                                    text: $scope.pssAnalysis.layers[k].name,
                                                    href: '#href',
                                                    nodes: $scope.crateSubChildLayers($scope.pssAnalysis.layers[k], $scope.pssAnalysis.layers)
                                                });
                                                //    k=$scope.analysis.layers[k].subLayerIds[$scope.analysis.layers[k].subLayerIds.length-1];
                                            } else {
                                                if(k>my_last_index) {
                                                    $scope.mainSubAnalysis.push({
                                                        text: $scope.pssAnalysis.layers[k].name,
                                                        id: $scope.pssAnalysis.layers[k].id
                                                    });
                                                }
                                            }



                                            catalogLayers[$scope.pssAnalysis.layers[k].name] = L.esri.dynamicMapLayer({
                                                url: 'http://'+ipAddress+':6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_dss_dimension_r_05122018/MapServer',
                                                opacity: 0.7,
                                                layers: [k]
                                            })
                                        }
                                    }

                                }

                               // alert(layer2[i].name);




                                $scope.mainSubChilds.push({
                                    text: "Data",
                                    href: '#href',
                                    nodes: $scope.catalogchild
                                });
                                $scope.mainSubChilds.push({
                                    text: "Analysis",
                                    href: '#href',
                                    nodes: $scope.mainSubAnalysis
                                });

                                $scope.catalogParent.push({
                                    text: layer2[i].name,
                                    href: '#href',
                                    nodes: $scope.mainSubChilds
                                });
                            }
                            // $scope.catalogfinalArray.push($scope.catalogParent);


                            catalogLayers[layer2[i].name] = L.esri.dynamicMapLayer({
                                url: tocUrls[arrayIndex],
                                opacity: 0.7,
                                layers: [i]
                            })



                            if (catalogLayers[layer2[i].name].defaultVisibility == true) {
                                map_catalog.addLayer(catalogLayers[layer2[i].name])
                            }

                        }
                    }




                    $scope.catalogParent_new=[];
                    $scope.crateSubChildLayers=function(layer2,layer1){

                        $scope.catalogchild_new = [];
                        for (var k =0; k < layer2.subLayerIds.length; k++) {

                            if(layer1[layer2.subLayerIds[k]].subLayerIds!=null){
                                // for(var p=0;p<layer1[layer2.subLayerIds[k]].subLayerIds.length;p++){
                                //     var my_index=layer1[layer2.subLayerIds[k]].subLayerIds[p];
                                    $scope.catalogchild_new.push({text: layer1[layer2.subLayerIds[k]].name,href: '#href',
                                        nodes:$scope.crateSubChildLayers1(layer1[layer2.subLayerIds[k]],layer1)});

                                //}

                            }else{
                                $scope.catalogchild_new.push({text: layer1[layer2.subLayerIds[k]].name, id: layer1[layer2.subLayerIds[k]].id})
                                my_last_index=layer1[layer2.subLayerIds[k]].id;
                            }

                        }
                        // $scope.catalogParent_new.push({
                        //     text: layer2.name,
                        //     href: '#href',
                        //     nodes: $scope.catalogchild_new
                        // });
                        return $scope.catalogchild_new;
                    }

                    $scope.crateSubChildLayers1=function(layer2,layer1){

                        $scope.catalogchild_new1 = [];
                        // if(layer2.subLayerIds!=nul)
                        // for (var k =0; k < layer2.subLayerIds.length; k++) {
                        for(var p=0;p<layer2.subLayerIds.length;p++) {
                            var my_index = layer2.subLayerIds[p];
                            $scope.catalogchild_new1.push({text: layer1[layer2.subLayerIds[p]].name, id: layer1[layer2.subLayerIds[p]].id});
                            my_last_index=layer1[layer2.subLayerIds[p]].id;
                        }
                        // }else{
                        //     $scope.catalogchild_new1.push({text:layer2.name, id:layer2.id});
                        // }

                        // $scope.catalogParent_new.push({
                        //     text: layer2.name,
                        //     href: '#href',
                        //     nodes: $scope.catalogchild_new
                        // });
                        return $scope.catalogchild_new1;
                    }

                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                        $mdDialog.hide(answer);
                    };

                    //$(function() {
                    //    var defaultData = [
                    //        {
                    //            text: 'Parent 1',
                    //            href: '#parent1',
                    //            nodes: [
                    //                {
                    //                    text: 'Child 1',
                    //                    href: '#child1'
                    //                }
                    //                //,
                    //                //{
                    //                //    text: 'Child 2',
                    //                //    href: '#child2',
                    //                //    tags: ['0']
                    //                //}
                    //            ]
                    //        }
                            //,
                            //{
                            //    text: 'Parent 2',
                            //    href: '#parent2',
                            //    tags: ['0']
                            //}
                      //  ];
                    setTimeout(function() {
                    //
                    //    $('#treeview1').treeview({
                    //        data: defaultData
                    //    });
                    //     var opts = ivhTreeviewOptions();
                    //     opts.expandToDepth === 0;

                        adi = $('#treeview1').treeview({
                        data:$scope.catalogParent,
                        });

                        $('#treeview1').treeview('collapseAll', { silent: true });

                        // $(".list-group-item").css({'border':'none'})

                        $('#treeview1').on('nodeSelected', function(event, data) {
                            //catalogLayers.setLayers([data.id]);
                            $scope.activeCatalogLayer=[];
                            map_catalog.addLayer(catalogLayers[data.text])
                            $scope.activeCatalogLayer.push(data.text);
                            //catalogLayers[data.id].metadata(function (error, metadata) {
                            //    document.getElementById('info').innerHTML = metadata.name;
                            //    console.log(metadata)
                            //});
                        });

                        $('#treeview1').on('nodeUnselected', function(event, data) {
                            //catalogLayers.hide();

                            map_catalog.removeLayer(catalogLayers[data.text]);

                        });





                    },1000);


                 //   });



                    $scope.addCatalogLayerToMao=function(){
                         //alert("working on it");





                        $scope.childArray=[];
                        for(var i=0;i<$scope.activeCatalogLayer.length;i++) {

                            // $scope.childArray.push({
                            //     label: layer2[$scope.activeCatalogLayer[i]].name,
                            //     value: layer2[$scope.activeCatalogLayer[i]].id,
                            //     selected: true
                            // });
                           if(arrayOfAddedLayers.length >0) {
                               if (arrayOfAddedLayers.indexOf($scope.activeCatalogLayer[i])!=-1) {
                                   alert("sorry it is already added");
                                   return false;
                               }
                           }
                            arrayOfAddedLayers.push($scope.activeCatalogLayer[i])
                            addLayerJson['activeLayer']=$scope.activeCatalogLayer[i]

                            angular.element($("#toc")).scope().finalArray.unshift({
                                label: $scope.activeCatalogLayer[i],
                                value: $scope.activeCatalogLayer[i],
                                name: 'catalog',
                                // children:  $scope.childArray
                                selected: true
                            });



                            mylayer[$scope.activeCatalogLayer[i]] = L.esri.dynamicMapLayer({
                                //url: 'http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_13112017/MapServer',
                                url:catalogLayers[$scope.activeCatalogLayer[i]].options.url,
                                opacity: 0.7,
                                layers: [catalogLayers[$scope.activeCatalogLayer[i]].options.layers]
                            })


                            addLayerJson['layer']=catalogLayers[$scope.activeCatalogLayer[i]].options.layers;
                            addLayerJson['url']=catalogLayers[$scope.activeCatalogLayer[i]].options.url;
                            map.addLayer(mylayer[$scope.activeCatalogLayer[i]])
                        }


                        $scope.cancel();


                        $http({

                            method: 'GET',
                        //    url: 'http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_13112017/MapServer/legend?f=pjson',
                            url:catalogLayers[$scope.activeCatalogLayer[0]].options.url+"legend?f=pjson",
                            header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'},
                            params: {}
                        }).success(function (data) {
                            for (var i = 0; i <$scope.activeCatalogLayer.length; i++) {
                               // if(i==$scope.activeCatalogLayer[i]) {
                                var h=0;
                                for(var j=0;j<data.layers.length;j++){
                                    if(data.layers[j].layerName==$scope.activeCatalogLayer[0]) {
                                        h++;
                                        // var node = document.querySelector('[title="' + data.layers[j].layerName + '"]');
                                        if($('[title="'+ + data.layers[j].layerName + '"]').length>1){
                                            var node = document.querySelectorAll('[title="' + data.layers[j].layerName + '"]')[1];

                                        }else {
                                            var node = document.querySelector('[title="' + data.layers[j].layerName + '"]');
                                        }


                                        if($("span:contains('"+data.layers[i].layerName+"')").length>1){
                                            var node1=$("span:contains('"+data.layers[j].layerName+"')")[1];
                                        }else{
                                            var node1=$("span:contains('"+data.layers[j].layerName+"')");
                                        }

                                        addLayerJson['name']=data.layers[j].layerName;


                                        var siliderStr="<div style='padding-right: 10px;'><input  id='slide' type='range' min='0' max='1' step='0.1' value='1' onchange='updateOpacity(this.value , \""+data.layers[j].layerName+"\",\""+'mylayer'+"\")'></div>";
                                        var template = document.createElement('template');
                                        template.innerHTML = siliderStr;
                                        nodes = template.content.childNodes
                                            node.appendChild(nodes[0]);

                                        if(data.layers[j].legend.length>1){
                                            for(var k=0;k<data.layers[j].legend.length;k++) {
                                                // var img = document.createElement('img');
                                                // img.src = 'data:image/png;base64 , ' + data.layers[i].legend[k].imageData;
                                                // img.setAttribute("hspace", "30");
                                                // node.appendChild(img);

                                                var src = 'data:image/png;base64 , ' + data.layers[j].legend[k].imageData;
                                                var str ='<div style="padding-left: 30px;" class="row"><img src="'+src+'">'+data.layers[j].legend[k].label+
                                                    '<img onclick="identifyMe('+data.layers[j].layerId+','+"'"+catalogLayers[$scope.activeCatalogLayer[0]].options.url+"'"+')" width="20px" height="20px" src="images/images.png"></div>'+
                                                    '<p>'+ data.layers[j].legend[k].label+'</p></div>'+
                                                    '<img onclick="calculateStatistics('+"'"+data.layers[j].layerName+"'"+')" src="images/Iris.png" width="20px" height="20px">' +
                                                    '<span onclick="filterLayers('+"'"+data.layers[j].layerName+"'"+','+"'"+data.layers[j].layerId+"'"+","+"0"+')" class="glyphicon glyphicon-filter"></span>'+
                                                '<span onclick="mySpQuery('+data.layers[i].layerId+','+"'"+catalogLayers[$scope.activeCatalogLayer[0]].options.url+"'"+')" class="glyphicon glyphicon-map-marker">';

                                                // var template = document.createElement('template');
                                                // template.innerHTML = str;
                                                // nodes = template.content.childNodes
                                                // node.appendChild(nodes[0]);

                                                addLayerJson['imageString']=str;
                                                addLayerJsonArray.push(addLayerJson);


                                                node1.append(str);

                                                //document.querySelector('[title="' + data.layers[j].layerName + '"]').appendChild(nodes[0]);

                                            }

                                        }else {

                                            var src = 'data:image/png;base64 , ' + data.layers[j].legend[0].imageData;
                                            var str ='<div style="padding-left: 30px;" class="row">' +
                                                data.layers[j].layerName+'<img  src="'+src+'">'+
                                                '<img onclick="identifyMe('+data.layers[j].layerId+','+"'"+catalogLayers[$scope.activeCatalogLayer[0]].options.url+"'"+')" width="20px" height="20px" src="images/images.png"></div>'+
                                                '<img onclick="calculateStatistics('+"'"+data.layers[j].layerName+"'"+')" src="images/Iris.png" width="20px" height="20px">' +
                                                '<span onclick="filterLayers('+"'"+data.layers[j].layerName+"'"+','+"'"+data.layers[j].layerId+"'"+","+"0"+')" class="glyphicon glyphicon-filter"></span>'+
                                                '<span onclick="mySpQuery('+data.layers[i].layerId+','+"'"+catalogLayers[$scope.activeCatalogLayer[0]].options.url+"'"+')" class="glyphicon glyphicon-map-marker">';
                                            // '<p>'+ data.layers[i].legend[k].label+'</p></div>';


                                            // var template = document.createElement('template');
                                            // template.innerHTML = str;
                                            // nodes = template.content.childNodes
                                            // node.appendChild(nodes[0]);

                                            //node.append(str);
                                            if(node1.length>1){
                                              //  node1= $("span").filter(function() { return ($(this).text() === data.layers[j].layerName) })
                                              //    node1=$("span:contains('"+data.layers[j].layerName+"')").filter(function(){
                                              //        return $(this).text() === data.layers[j].layerName ? true : false;
                                              //    });
                                              //   node1.html(str);
                                                alert("Please Remove already added layers and add this layer again");
                                            }else{
                                                node1.html(str);
                                            }

                                            addLayerJson['imageUrl']=src;
                                            addLayerJsonArray.push(addLayerJson);


                                        // var img = document.createElement('img');
                                        // img.src = 'data:image/png;base64 , ' + data.layers[j].legend[0].imageData;
                                        // img.setAttribute("hspace", "30");
                                        // node.appendChild(img);

                                    }

                                        // var str = '<button style="margin-left: -10px;"  type="button" onclick="removeCatalogLayer('+"'"+$scope.activeCatalogLayer[0]+"'"+')" class="btn-subnav dropdown-toggle" data-toggle="dropdown">' +
                                        //     '<span class="glyphicon glyphicon-minus"></span>' +
                                        //     '</button>';
                                        //
                                        // var template = document.createElement('template');
                                        // template.innerHTML = str;
                                        // nodes = template.content.childNodes
                                        //
                                        // //  var strCompile=$compile(str)($scope);
                                        //
                                        // document.querySelector('[title="' + data.layers[j].layerName + '"]').appendChild(nodes[0]);
                                    }
                                    // else{
                                    //
                                    //  //   var node = document.querySelector('[title="' + $scope.activeCatalogLayer[0] + '"]');
                                    //     if(h==0) {
                                    //         var str = '<button style="margin-left: -10px;"  type="button" onclick="removeCatalogLayer(' + "'" + $scope.activeCatalogLayer[0] + "'" + ')" class="btn-subnav dropdown-toggle" data-toggle="dropdown">' +
                                    //             '<span class="glyphicon glyphicon-minus"></span>' +
                                    //             '</button>';
                                    //
                                    //         var template = document.createElement('template');
                                    //         template.innerHTML = str;
                                    //         nodes = template.content.childNodes
                                    //
                                    //         //  var strCompile=$compile(str)($scope);
                                    //
                                    //         document.querySelector('[title="' + $scope.activeCatalogLayer[0] + '"]').appendChild(nodes[0]);
                                    //         h++
                                    //     }
                                    // }
                                }

                                var str = '<button style="margin-left: -10px;"  type="button" onclick="removeCatalogLayer('+"'"+$scope.activeCatalogLayer[0]+"'"+')" class="btn-subnav dropdown-toggle" data-toggle="dropdown">' +
                                    '<span class="glyphicon glyphicon-minus"></span>' +
                                    '</button>';

                                var template = document.createElement('template');
                                template.innerHTML = str;
                                nodes = template.content.childNodes

                                //  var strCompile=$compile(str)($scope);

                                document.querySelector('[title="' + $scope.activeCatalogLayer[0]  + '"]').appendChild(nodes[0]);

                            }

                        });
                       // angular.element($("#toc")).scope().$apply();
                    }


                }






}]);


function removeCatalogLayer(id){
    var index = arrayOfAddedLayers.indexOf(id);
    if (index > -1) {
        arrayOfAddedLayers.splice(index, 1);
    }

    for(var i=0;i<angular.element($("#toc")).scope().finalArray.length;i++){
        if(angular.element($("#toc")).scope().finalArray[i].name && angular.element($("#toc")).scope().finalArray[i].value==id) {
            angular.element($("#toc")).scope().finalArray.splice(i, 1);
            angular.element($("#toc")).scope().$apply();

            //  map.removeLayer(geolayers[node.children[i].value]);
            map.removeLayer(mylayer[id])
            //angular.element($("#toc")).scope().$apply();
        }
    }
}

function identifyMe(id,myurl){
    geoLayersIdForIdentifier=id;
    url=myurl;

    angular.element($("#toc")).scope().enableMapclickForIdentifier();
}

function mySpQuery(id,myurl){

    angular.element($("#toc")).scope().spQuery(id,myurl);
}

