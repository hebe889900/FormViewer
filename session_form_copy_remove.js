$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';


$(document)
    .ready(function () {

        $(window)
            .keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });

        var filename = getQueryVariable("name");
        var url = "";
        if (!getFormId()) {
            url = "/forms/lookup_json/" + filename + ".json";
        } else {
            url = "//dev.countingopinions.com/ws/tunnel.php?getURL=db3.informsus.com/node/api/formbuilder?formid=" + getFormId()
        }


        processJSONPayload(url);


        function getFormId() {
            var url = getQueryVariable("form_id");
            if (url) {
                //window.submitfield.form_id = "text";
                if (!$("#form_id").length) {
                    var hidden_field = '<input id="form_id" name="form_id" type="hidden" value= "1">'
                    $(hidden_field).appendTo("body");
                }
                return getQueryVariable("form_id");
            } else {
                return false;
            }
        }

        function isTest() {
            var is_test = getQueryVariable("is_test");
            if (is_test == 1) {
                window.submitfield.is_test = "text";
                if (!$("#is_test").length) {
                    var hidden_field = '<input id="is_test" name="is_test" type="hidden" value= "1">'
                    $(hidden_field).appendTo("body");
                }
                return true;
            } else {
                return false;
            }
        }

        function isVis() {
            var is_vis = getQueryVariable("session_type");

            if (is_vis == "vis") {
                //////////console.log($("#session_type"));

                $("#session_type").val("VIS")
                $("#session_type").dropdown('set selected', "VIS");

                return true
            } else {
                return false
            }
        }


        function triggerIsVis() {
            var is_vis = getQueryVariable("session_type");

            if (is_vis == "vis") {
                $("#session_type").val("").trigger("change");
                $("#session_type").val("VIS").trigger("change");
                $("#session_type").dropdown('set selected', "VIS");
                return true
            } else {
                return false
            }
        }


        function confirmEmail() {
            if (!$("#ls_id").length) {
                window.submitfield.ls_id = "text";
                var hidden_field = '<input id="ls_id" name="ls_id" type="hidden" value= "' + getQueryVariable("ls_id") + '">'
                $(hidden_field).appendTo("body");
            }
            return getQueryVariable("ls_id");
        }

        function getltype() {
            //////////////console.log($("#library_type").val())
            if ($("#library_type").val() != null && $("#library_type").val().length) {
                return $("#library_type").val();
            }
            return "";
        }

        function getLsid() {
            if (!$("#ls_id").length) {
                window.submitfield.ls_id = "text";
                var hidden_field = '<input id="ls_id" name="ls_id" type="hidden" value= "' + getQueryVariable("ls_id") + '">'
                $(hidden_field)
                    .appendTo("body");
            }
            return getQueryVariable("ls_id");
        }

        function getUserid() {
            if (!$("#user_id")
                .length) {
                window.submitfield.user_id = "text";
                var hidden_field = '<input id="user_id" name="user_id" type="hidden" value= "' + getQueryVariable("user_id") + '">'
                if (!getQueryVariable("user_id")) {
                    hidden_field = '<input id="user_id" name="user_id" type="hidden" value= 0>'
                }
                $(hidden_field)
                    .appendTo("body");
            }
            return getQueryVariable("user_id");
        }

        function getSpid() {
            if (!$("#sp_id")
                .length) {
                window.submitfield.sp_id = "text";
                var hidden_field = '<input id="sp_id" name="sp_id" type="hidden" value= "' + getQueryVariable("sp_id") + '">'
                $(hidden_field)
                    .appendTo("body");
            }
            return getQueryVariable("sp_id");
        }

        function getEmail() {
            if (!$("#email")
                .length) {
                window.submitfield.sp_id = "text";
                var hidden_field = '<input id="email" name="email" type="hidden" value= "' + getQueryVariable("email") + '">'
                $(hidden_field)
                    .appendTo("body");
            }
            return getQueryVariable("email");
        }

        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        } //Get the query variable on the url


        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
                , results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        } //Get the query string value with url

        function processJSONPayload(url) {
            $.ajax({
                dataType: "json"
                , url: url
                , data: ""
                , success: function (result) {
                    ////////////////////console.log(result);
                    processResult(result);
                } //End of success method
            }) //End of ajax
        } //Main method

        function processResult(array) {
            var form_id;
            var ls_id;
            window.submitfield = {}
            for (var key in array) {
                if (array.hasOwnProperty(key)) {
                    if (array[key][0].filters_newformat != null) {
                        window.filters_newformat = array[key][0].filters_newformat;
                    }
                    if (array[key][0].form_id != null) {
                        form_id = array[key][0].form_id;
                        ls_id = array[key][0].ls_id;
                        tab_option = array[key][0].tab;
                        var form_name = array[key][0].name;
                        var tab = '<form  class = "ui form" id ="' + form_id + '" name = "' + form_name + '"method = "post"><h1 class = row>' + form_name + '</h1></form>';
                        if (tab_option) {
                            var form = '<form  class = "ui form" id ="' + form_id + '" name = "' + form_name + '"method = "post"><h1 class = row>' + form_name + '</h1></form>';
                            var tab = '<div class="ui top attached tabular menu">' + '<a class="item active" data-tab="first">Look up</a>' +
                                '<a class="item"  data-tab="second" id = "outcome_click_tab">Outcome Survey</a></div>' +
                                '<div class="ui bottom attached tab segment active" data-tab="first">' + form + '</div>' +
                                '<div class="ui bottom attached tab segment" data-tab="second" id = "outcome_master_tab"></div>'
                        } else {
                            var tab = '<form  class = "ui form" id ="' + form_id + '" name = "' + form_name + '"method = "post"><h1 class = row>' + form_name + '</h1></form>';
                        }
                        $("div.ui.container")
                            .html(tab); //Append the form to the container
                        $('.menu .item')
                            .tab();
                            //console.log(getQueryVariable("name"));
                            if(getQueryVariable("name") != false && getQueryVariable("name").indexOf("_com") > 0) {
                                $.getScript("/forms/js/outcome.js")
                                  .done(function( script, textStatus ) {
                                    //console.log( textStatus );
                                  })
                                  .fail(function( jqxhr, settings, exception ) {
                                    //console.log(exception);
                                    //console.log(settings);
                                });                         
                            }
                   
                        }

                    if (array[key][0].container != null) {
                        processContainerInfo(array[key][0].container, form_id)
                    }
                    if (array[key][0].sections) {
                        processSectionInfo(array[key][0].sections);
                        $("form#" + form_id)
                            .append(processSectionInfo(array[key][0].sections)) //Append the section to the from
                        //var collapse_panel = '<div class = "row"><a class="btn btn-secondary btn-lg btn-block" data-toggle="collapse" href="#section_filter" aria-expanded="false" aria-controls="section_filter">Click to hide/show filter</a></div>';
                        //$(collapse_panel).insertAfter($("#section_lookup"));
                        ////////////////////console.log($("#section_lookup"))
                    }
                    if (array[key][0].grids) {
                        processGridsInfo(array[key][0].grids);
                    }
                    if (array[key][0].fields) {
                        processFieldInfo(array[key][0].fields);
                    }
                    if (array[key][0].filters) {
                        processFilterInfo(array[key][0].filters); //Process filter info
                    }
                }
            }
            checkIpAddress();
            //getLocation("button_1011_2");     
            //$('form').garlic();
            ResetPeopleRegister()
            submit(form_id);
            resetForm(form_id);

            //surveyIndicate("20");
        } //Process the json payload
        

        function checkIpAddress() {
            $.get("//ipinfo.io", function (response) {
                ipAddress = response.ip;
                getCountry(ipAddress)
                return response.ip;
            }, "jsonp");
        }

        //Get country from web service
        function getCountry(ipAddress) {
            var result_json = {};
            $.ajax({
                type: "post"
                , url: "//ws.countingopinions.com/get_address.php?ip=" + ipAddress
                , data: { get_param: 'value' }
                , datatype: "json"
                , success: function (result) {
                    if (result.country == "C") {
                        $("[name='country']")
                            .val("Canada");
                        window.country = "C"; //Set the global variable and country field to Canada
                    }
                    if (result.country == "U") {
                        $("[name='country']")
                            .val("United States");
                        window.country = "U";
                    }
                    $("[name='state']")
                        .val(result.state);
                    $("[name='city']")
                        .val(result.city);
                    var result_json = result;
                    //////////console.log(result_json);
                }
            });
            return result_json.country;
        }

        //Get state from web service


        function geoFindMe() { //html geolocation
            /* Chrome need SSL! */
            var is_chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
            var is_ssl = 'https:' == document.location.protocol;
            if (is_chrome && !is_ssl) {
                return false;
            }

            /* HTML5 Geolocation */
            navigator.geolocation.getCurrentPosition(
                function (position) { // success cb

                    /* Current Coordinate */
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var google_map_pos = new google.maps.LatLng(lat, lng);


                    /* Use gisgraphy to get address */
                    var getURL = encodeURIComponent("http://services.gisgraphy.com/reversegeocoding/search?lat=" + lat + "&lng=" + lng + "&from=1&to=1&format=JSON");
                    $.ajax({
                        type: "post"
                        , url: "//libsat.countingopinions.com/redirect.php?getURL=" + getURL
                        , data: { get_param: 'getURL' }
                        , datatype: "json"
                        , success: function (result) {
                            //////////console.log("redirect...");
                            result = $.parseJSON(result); //convert into javascript array
                            //////////console.log(result.result[0].state);

                            //alert((result_string));
                            $("select[name='region'] option:contains('" + result.result[0].state + "')")
                                .prop('selected', 'selected'); //Select the state value
                            if (result.result[0].countryCode == "CA") {
                                $("select[name='country']")
                                    .val("C");
                                window.country = "C"; //Set the global variable and country field to Canada
                            }
                            if (result.result[0].countryCode == "US") {
                                $("select[name='country']")
                                    .val("U");
                                window.country = "U";
                            }
                        }
                    }); //gisgraphy reverse geocoder service


                    /* Use Google map Geocoder to get address */
                    var google_maps_geocoder = new google.maps.Geocoder();
                    google_maps_geocoder.geocode({ 'latLng': google_map_pos }
                        , function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK && results[0]) {
                                //////////console.log( results);
                                $("input[name='street-address']")
                                    .val(results[0].formatted_address);
                                if (results[0].formatted_address.includes("Canada")) {
                                    //////////console.log("Canada");
                                    $("select[name='country']")
                                        .val("C");
                                    window.country = "C"; //Set the global variable and country field to Canada
                                }
                                if (results[0].formatted_address.includes("United State")) {
                                    $("select[name='country']")
                                        .val("U");
                                    window.country = "U";
                                }
                            }
                        }
                    );
                }
                , function () { // fail cb
                }
            );
        }


        function getLocation(button_id) {
            var button = $("#" + button_id);
            ////////////////console.log(button);
            var startPos;

            var geoSuccess = function (position) {
                // hideNudgeBanner();
                // We have the location, don't display banner
                //clearTimeout(nudgeTimeoutId);

                // Do magic with location
                startPos = position;
                //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
                //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
                getAddress(startPos.coords.latitude, startPos.coords.longitude);
            };
            var geoError = function (error) {
                switch (error.code) {
                case error.TIMEOUT:
                    // The user didn't accept the callout
                    //showNudgeBanner();
                    break;
                }
            };

            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

        }

        function getAddress(lat, lon) {
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAYdIC9mHKkNsZeC1KR8QZM-4e_Fw8-kMM", function (data) {
                var items = [];
                $.each(data, function (key, val) {
                    for (var i = 0; i < data.results[0].address_components.length; i++) {
                        ////////////////console.log(i);
                        $("[type = 'address']")
                            .val(data.results[0].formatted_address);
                        $("[name = 'address-1']")
                            .val(data.results[0].formatted_address);

                        for (var j = 0; j < data.results[0].address_components[i].types.length; j++) {
                            //////////////console.log(data.results[0].address_components[i]);
                            switch (data.results[0].address_components[i].types[j]) {
                            case "country":
                                $("[name = 'country']")
                                    .val(data.results[0].address_components[i].long_name);
                                break;
                            case "street_address":
                                $("[type = 'address']")
                                    .val(data.results[0].address_components[i].long_name);
                                $("[name = 'address_1']")
                                    .val(data.results[0].address_components[i].long_name);
                                break;
                            case "postal_code":
                                $("[name = 'postal_code']")
                                    .val(data.results[0].address_components[i].long_name);
                                break;
                            case "locality":
                                $("[name = 'city']")
                                    .val(data.results[0].address_components[i].long_name);
                                break;
                            case "administrative_area_level_1":
                                $("[name = 'state']")
                                    .val(data.results[0].address_components[i].short_name);
                                //$("[name = 'address_1']").dropdown('set selected', data.results[0].address_components[i].short_name);
                                break;
                            default:


                            }
                        }


                    }
                    //$("[type = 'address']").val(data.results[0].formatted_address); 
                    //$("[name = 'address-line1']").val(data.results[0].formatted_address); 
                    //$("[name = 'address-line2']").val(data.results[0].formatted_address); 
                    //$("[name = 'address-level2']").val(data.results[7].formatted_address); 
                    //$("[name = 'address-level1']").val(data.results[8].formatted_address); 
                    //$("[name = 'country']").val(data.results[9].formatted_address); 
                    //$("[name = 'postal-code']").val(data.results[5].address_components[0].long_name); 
                    ////////////////console.log($("[type = 'address']"))
                });
            });
        }

        function processContainerInfo(sections, form_id) {
            var markup = '';
            for (var i = 0; i < sections.length; i++) {
                var section_id = sections[i].object_id;
                var object_varname = sections[i].object_varname;
                var load_status = sections[i].load_status;
                var section_content = sections[i].fieldconfig;
                var section_class = sections[i].object_class;
                var img_url = sections[i].image_url;
                var attendence_url = sections[i].attendence_url;
                var vistor_url = sections[i].vistor_url;
                //////////////////console.log(sections[i])
                if (!isVis()) {
                    if (load_status == "hide") {
                        markup += '<div style="display: none;" class = "' + section_class + '"  id = "' + object_varname + '" >' + img_url + attendence_url + '</div>';
                    } else {
                        markup += '<div class = "' + section_class + '"  id = "' + object_varname + '" >' + img_url + attendence_url + '</div>';
                    }
                }
                if (isVis()) {
                    if (load_status == "hide") {
                        markup += '<div style="display: none;" class = "' + section_class + '"  id = "' + object_varname + '" >' + img_url + vistor_url + '</div>';
                    } else {
                        markup += '<div class = "' + section_class + '"  id = "' + object_varname + '" >' + img_url + vistor_url + '</div>';
                    }
                }
                $("form#" + form_id)
                    .append(markup);
                $('body').addClass('loaded');
                for (var i = 0; i < section_content.length; i++) {
                    //////////////////console.log(section_content[i])
                    var object_type = section_content[i].object_type;
                    switch (object_type) {
                    case "field":
                        processFieldInfo(section_content[i], object_varname)
                        break;
                    case "section":
                        processSectionInfo(section_content[i], object_varname);
                        break;
                    case "fieldset":
                        processFieldsetInfo(section_content[i], object_varname);
                        break;                      
                    }
                }
            }
            ////////////////////console.log(markup);

        }

        function processGridsInfo(field_detail) {
            var markup = '';
            for (var i = 0; i < field_detail.length; i++) {
                var section_id = field_detail[i].section_id;
                //var load_status = field_detail[i].load_status; 
                var grid_id = field_detail[i].grid_id;
                var grid_class = field_detail[i].grid_class;
                markup = '<div class = "' + grid_class + '"  id = "' + grid_id + '" ></div>';
                $(markup)
                    .appendTo("#" + section_id);
            }
            ////////////////////console.log(markup);    
        }


        function processSectionInfo(sections, container_varname) {
            ////////////////////console.log(sections[0].section_id);
            var markup = '';
            var section_id = sections.object_varname;
            var load_status = sections.load_status;
            var section_content = sections.fieldconfig;
            var section_class = sections.object_class;
            var section_title = '';
            if(sections.section_content){
                var section_title = sections.section_content;            
            }
            if (load_status == "hide") {
                markup += '<section style="display: none;" class = "' + section_class + '"  id = "' + section_id + '" >' + section_title + '</section>';
            } else {
                markup += '<section class = "' + section_class + '"  id = "' + section_id + '" >' + section_title + '</section>';
            }
            //////////////////console.log(markup);
            $("#" + container_varname)
                .append(markup);
            for (var i = 0; i < section_content.length; i++) {
                //////////////////console.log(section_content[i])
                var object_type = section_content[i].object_type;
                switch (object_type) {
                case "field":
                    processFieldInfo(section_content[i], section_id)
                    break;
                case "section":
                    processSectionInfo(section_content[i], section_id);
                    break;
                }
            }

        } //Process the field section

        function processFieldsetInfo(sections, container_varname) {
            ////////////////////console.log(sections[0].section_id);
            var markup = '';
            var section_id = sections.object_varname;
            var load_status = sections.load_status;
            var section_content = sections.fieldconfig;
            var section_class = sections.object_class;
            var section_title = '';
            if(sections.section_content){
                var section_title = sections.section_content;            
            }
            if (load_status == "hide") {
                markup += '<fieldset style="display: none;" class = "' + section_class + '"  id = "' + section_id + '" ><legend>' + section_title + '</legend></fieldset>';
            } else {
                markup += '<fieldset class = "' + section_class + '"  id = "' + section_id + '" ><legend>' + section_title + '</legend></fieldset>';
            }
            //////////////////console.log(markup);
            $("#" + container_varname)
                .append(markup);
            for (var i = 0; i < section_content.length; i++) {
                //////////////////console.log(section_content[i])
                var object_type = section_content[i].object_type;
                switch (object_type) {
                case "field":
                    processFieldInfo(section_content[i], section_id)
                    break;
                case "section":
                    processSectionInfo(section_content[i], section_id);
                    break;
                }
            }

        } //Process the field section

        function processFieldInfo(fields, container_varname) {

            isTest();
            var markup = ''
            var section_id = fields.section_id;
            var grid_id = fields.grid_id;
            var field_type = fields.field_type;
            var field_label = fields.object_label;
            var field_varname = fields.object_varname;
            //////////////console.log(fields)
            if (field_type == "modal") {
                processModal(fields);
            } else if (field_type == "button") {
                processButtonField(fields, container_varname); //Process button field
                //$("#search_button").prop('disabled',true);
            } else if (field_type == "lookup") {
                window.submitfield[field_varname] = field_type;
                //////////////////console.log(window.submitfield)
                processLookupField(fields, container_varname); //Process lookup field
            } else if (field_type == "librarytypelist") {
                window.submitfield[field_varname] = "selectlist";
                processLibraryTypelistField(fields, container_varname); //Process select            
            } else if (field_type == "librarylist") {
                window.submitfield[field_varname] = "selectlist";
                processLibrarylistField(fields, container_varname); //Process select            
            } else if (field_type == "collectionlist") {
                window.submitfield[field_varname] = "selectlist";
                processCollectionlistField(fields, container_varname); //Process select     
            } else if (field_type == "selectlist" || field_type == "combobox") {
                window.submitfield[field_varname] = "selectlist";
                processSelectlistField(fields, container_varname); //Process select
            } else if (field_type == "searchlist") {
                window.submitfield[field_varname] = "selectlist";
                processSearchlistField(fields, container_varname);
            } else if (field_type == "submit" || field_type == "reset") {
                processSubmitField(fields, container_varname); //Process submit and reset
            } else if (field_type == "table") {
                window.submitfield[field_varname] = field_type;
                processTableField(fields, container_varname);
            } else if (field_type == "checkbox") {
                window.submitfield[field_varname] = field_type;
                processCheckBoxField(fields, container_varname);
            } else if (field_type == "radiobutton") {
                processRadioButtonField(fields, container_varname);
            } else if(field_type = "checkboxgroup") {
                processCheckboxGroupField(fields, container_varname);
            }else if (field_type == "radiogroup") {
                processRadioGroupField(fields, container_varname);
            } else if (field_type == "email") {
                window.submitfield[field_varname] = field_type;
                processEmailInputField(fields, container_varname); //Process normalfield        
            } else if (field_type == "date") {
                window.submitfield[field_varname] = field_type;
                processDateField(fields, container_varname); //Process normalfield          
            } else if (field_type == "check_robot") {
                processCheckRobotField(fields, container_varname);
            } else if (field_type == "textarea") {
                processTextAreaField(fields, container_varname);
            } 
            else if (field_type == "range") {
                window.submitfield[field_varname] = field_type;
                processRangeField(fields, container_varname);
            }
            else {
                window.submitfield[field_varname] = field_type;
                processNormalInputField(fields, container_varname); //Process normalfield
            }
            ////////////////////console.log(lookup_field);
            //initializeSearch(lookup_field);
            bindCalculate()
            processChange()
            //triggerMaximunRow("total_staff_involved", "16")
            if (!isVis()) {
                triggerAllDay()
            }
            //////////////console.log($("[name='start_time']").filter(":visible").val())
            triggerTotalStaff("total_staff_involved")
            window.dirtyFlag = false;
        }


        function processChange() {
            $(":input")
                .not("#session_title")
                .change(function (e) {
                    window.dirtyFlag = true;
                })
        }

        function processModal(field_detail) {
            var field_varname = field_detail.object_varname;
            var field_label = field_detail.object_label;
            var field_text = field_detail.object_prompt;
            var field_button_text = field_detail.field_button_text;
            var field_button_id = field_detail.field_button_id;
            var button = field_detail.button;
            var modal_markup = '<div class="ui modal" id = "' + field_varname + '" name = "' + field_varname + '" style = "text-align: center">' +
                '<i class="close icon"></i>' +
                '<div class="header">' + field_detail.object_label + '</div>' +
                '<div class="content">' +
                '<p>' + field_text + '</p>' +
                '</div>' +
                '<div class = "actions" id = "actions_' + field_varname + '" style = "text-align: center">' +
                '</div>' +
                '</div>'
            $(modal_markup)
                .appendTo("body");

            if (button) {
                for (var i = 0; i < button.length; i++) {
                    var field_button_text = button[i].field_button_text;
                    var field_button_id = button[i].field_button_id;
                    var field_button_class = button[i].field_button_class;
                    var button_markup = '<div class ="' + field_button_class + '" id = "' + field_button_id + '">' + field_button_text + '</div>';
                    $(button_markup)
                        .appendTo("#actions_" + field_varname);
                    $("#" + field_button_id)
                        .click(function () {
                            $('#' + field_varname)
                                .modal("hide");
                        })
                }
            }
        }


        function processButtonField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_prompt = field_detail.object_prompt;
            var button_icon = field_detail.button_icon;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var object_class = field_detail.object_class;
            var button_class = field_detail.button_class;
            var markup = '<div class="' + object_class + '" >' +
                '<button type="' + field_type + '" class="' + button_class + '" name = "' + field_varname + '">' +
                '<i class="fa ' + button_icon + '"></i>' + field_prompt + '</button>' + '</div>';
            $(markup)
                .appendTo($("#" + grid_id));
            return markup;
        } //Process Button Field

        function processLookupField(field_detail, grid_id) {
            var ls_id = getLsid();
            var sp_id = getSpid();
            var user_id = getUserid();
            var section_id = field_detail.section_id;
            var field_varname = field_detail.object_varname;
            var field_label = field_detail.object_label;
            var place_holder = field_detail.place_holder;
            var field_status = field_detail.load_status;
            var lookup_url = field_detail.ws_url + "ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100";
            var lookup_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            if (field_status == "hide") {
                lookup_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class="' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<div class="ui fluid search ' + input_class + '">' +
                    '<div class = "ui fluid icon input"  >' +
                    '<input type="text"  class="prompt" placeholder="' + place_holder + '" id =  "' + field_varname + '"  name = "' + field_varname + '" >' +
                    '<i class="search icon"></i>' +
                    '</div>' +
                    '<div class="results"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else {
                lookup_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class="' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<div class="ui fluid search ' + input_class + '">' +
                    '<div class = "ui fluid icon input"  >' +
                    '<input type="text"  class="prompt" placeholder="' + place_holder + '" id =  "' + field_varname + '"  name = "' + field_varname + '" >' +
                    '<i class="search icon"></i>' +
                    '</div>' +
                    '<div class="results"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            $(lookup_html)
                .appendTo($("#" + grid_id)); //Append to lookup section
            var is_test = $("[name=is_test]")
                .val();
            if (field_varname == "lookup") {
                var url = 'https://api.communico.co/v3/token';
                 $("[name=" + field_varname + "]").change(function(){})
                $.ajax({
                    type: "POST"
                    , url: url
                    , dataType: 'json'
                    , data: { client_id: "ZYTE0yt1WvMgCbQGcnJZ", client_secret: "F2LNepEL8HZdkJhuDx7j", scope: "", grant_type: "client_credentials" }
                    , success: function (result) {
                        //console.log(result);
                        var access_token = result.access_token;
                        var token_type = result.token_type;
                        var request_url = "https://api.communico.co/v3/attend/events?start=0&limit=10&status=published&fields=types,startDate,locationName,ages,setupTime,breakdownTime,eventContact,registration,maxAttendees&term={query}";
                        $("[name=" + field_varname + "]")
                            .closest(".ui.search")
                            .search({
                                apiSettings: {
                                    onResponse: function (results) {
                                        //console.log(results);
                                        var response = {
                                            results: []
                                        };
                                        var lookup_array = [];
                                        $.each(results.data.entries, function (index, item) {
                                            //console.log(item)
                                            //////////////console.log(JSON.parse(item.jsondata))
                                            var json_data = item;
                                            //series_title, title, date, start_time, venue  

                                            response.results.push({
                                                title: json_data.title
                                                , description: json_data.title + ", " + (json_data.eventStart || "Start time TBD") + ", " + (json_data.eventEnd || "End time TBD") + ", " + (json_data.locationName || "Location TBD")
                                                , startTime: json_data.eventStart
                                                , endTime: json_data.eventEnd
                                                , locationId: json_data.locationId
                                                , ages: json_data.ages
                                                , types: json_data.types
                                                , setupTime: json_data.setupTime
                                                , breakdownTime: json_data.breakdownTime
                                                , eventContact: json_data.eventContact
                                                , registration: json_data.registration
                                                , maxAttendees: json_data.maxAttendees
                                            });
                                        });
                                        return response;
                                    }
                                    , url: request_url
                                    , beforeXHR: function (xhr) {
                                        xhr.setRequestHeader("Authorization", token_type + " " + access_token);
                                    }
                                }
                                , onSelect: function (result, response) {
                                    //console.log(result)
                                    $("[name=library]")
                                        .dropdown('clear');
                                    $("[name=library]")
                                        .val(result.locationId)
                                        .trigger('change');
                                    $("[name=library]")
                                        .dropdown('set selected', result.locationId)
                                        .trigger('change');
                                    $("[name=eventtypes]")
                                        .dropdown('clear');
                                    $("[name=eventtypes]")
                                        .val(result.types)
                                        .trigger('change');
                                    $("[name=eventtypes]")
                                        .dropdown('set selected', result.types)
                                        .trigger('change');
                                    $("[name=agegroups]")
                                        .dropdown('clear');
                                    $("[name=agegroups]")
                                        .val(result.ages)
                                        .trigger('change');
                                    $("[name=agegroups]")
                                        .dropdown('set selected', result.ages)
                                        .trigger('change');
                                    $("[name=date]").val(result.startTime.split(" ")[0]);
                                    $("[name=start_time]").val(result.startTime.split(" ")[1]).trigger('change');
                                    $("[name=end_time]").val(result.endTime.split(" ")[1]).trigger('change');                                         
                                    var program_type = $("[name=eventtypes] option:selected")
                                        .first()
                                        .text(); //Added .first() to handle duplicates
                                    var program_name = result.title;
                                    var program_date = result.startTime.split(" ")[0];
                                    var program_time = result.startTime.split(" ")[1];
                                    var program_location = $("[name=library] option:selected")
                                        .first()
                                        .text(); //Added .first() to handle duplicates      
                                    var program_type = $("[name=eventtypes] option:selected").text();                           
                                    var program_info = program_name + ", " + program_type + ", " + program_date + ", " + program_time + ", " + program_location;
                                    $("[name=pgm_type]")
                                        .text(program_type);
                                    $("[name=pgm_type]")
                                        .data("value",program_type);    
                                    $("[name=pgm_title]")
                                        .text("Program Title: " + program_name);
                                    $("[name=welcome_header]")
                                        .text("Thanks for attending " + program_name + " at " + program_location + ". We would really appreciate you feedback!  This is really important to us and we hope that you will take the time to tell us how this program helped you and what we can do to make it better.");
                                    $("[name=pgm_date]")
                                        .text("Program Date: " + program_date);
                                    $("[name=pgm_time]")
                                        .text(program_time);
                                    $("[name=branch_id]")
                                        .text(program_location);
                                    var result_array = result;
                                    for (var key in result_array) {
                                        // skip loop if the property is from prototype
                                        if (!result_array.hasOwnProperty(key)) continue;
                                        if ($("[name=" + key + "]")
                                            .closest(".field")
                                            .parent()
                                            .css("display") != "none") {
                                            if ($("[name=" + key + "]")
                                                .filter(":visible")
                                                .is("select")) {
                                                //////////////////console.log("is true")
                                                $("[name=" + key + "]")
                                                    .filter(":visible")
                                                    .val(result_array[key])
                                                    .trigger('change');
                                                $("[name=" + key + "]")
                                                    .filter(":visible")
                                                    .dropdown('set selected', result_array[key])
                                                    .trigger('change');
                                            } else if ($("[name=" + key + "]")
                                                .is("table")) {
                                                $("[name=" + key + "]")
                                                    .jqGrid('setGridParam', { data: result_array[key] })
                                                    .trigger('reloadGrid');
                                                ajustStyleJqgrid()
                                            } else if ($("[name=" + key + "]")
                                                .is(':checkbox')) {
                                                if (result_array[key] == true) {
                                                    //////////console.log(key)
                                                    $("[name=" + key + "]")
                                                        .prop("checked", true)
                                                        .trigger('change');
                                                } else {
                                                    $("[name=" + key + "]")
                                                        .prop("checked", false)
                                                        .trigger('change');
                                                }
                                            } else if (key == "session_title" || key == "venue" || key == "series_title" || key == "duration") { //If it is an autosuggest field/duration, don't implement trigger change               
                                                $("[name=" + key + "]")
                                                    .val(result_array[key]);
                                                $("[name=" + key + "]")
                                                    .dropdown('set selected', result_array[key])
                                                    .trigger('change');
                                                //////////console.log(result_array[key])
                                            } else {
                                                ////////////console.log($("[name=" + key + "]"))
                                                $("[name=" + key + "]")
                                                    .val(result_array[key])
                                                    .trigger('change');
                                            }
                                        }
                                    }
                                },

                                minCharacters: 1
                            , })
                    }
                });
            } else if (field_varname == "venue") {
                if (is_test == 1) {
                    lookup_url = lookup_url + '&is_test=1&search=[{"' + field_varname + '":"{query}"}]'
                } else {
                    lookup_url = lookup_url + '&search=[{"' + field_varname + '":"{query}"}]'
                }

                $("[name=" + field_varname + "]")
                    .closest(".ui.search")
                    .search({
                        apiSettings: {
                            onResponse: function (results) {
                                var response = {
                                    results: []
                                };
                                var venue_array = [];
                                $.each(results, function (index, item) {
                                    //////////////console.log(item)     
                                    //////////////console.log(JSON.parse(item.jsondata))
                                    var json_data = JSON.parse(item.jsondata)
                                    //series_title, title, date, start_time, venue  
                                    if (venue_array.indexOf(json_data.venue.trim()) < 0) {
                                        response.results.push({
                                            title: json_data.venue.trim()
                                        });
                                        venue_array.push(json_data.venue.trim());
                                    } //Remove duplicates    
                                });
                                return response;
                            }
                            , url: lookup_url
                        },

                        minCharacters: 3
                    , })

            } else {
                if (is_test == 1) {
                    if (field_varname == "series_title") {
                        lookup_url = lookup_url + '&is_test=1&search=[{"option_name":"{query}"}]'
                    } else {
                        lookup_url = lookup_url + '&is_test=1&search=[{"session_title":"{query}"}]'
                    }
                } else {
                    if (field_varname == "series_title") {
                        lookup_url = lookup_url + '&search=[{"option_name":"{query}"}]'
                    } else {
                        lookup_url = lookup_url + '&search=[{"session_title":"{query}"}]'
                    }
                }
                $("[name=" + field_varname + "]")
                    .closest(".ui.search")
                    .search({
                        apiSettings: {
                            onResponse: function (results) {
                                var response = {
                                    results: []
                                };
                                $.each(results, function (index, item) {
                                    ////////////////////console.log(item)     
                                    ////////////////////console.log(JSON.parse(item.jsondata))
                                    ////////////////////console.log(JSON.parse(item.keys));
                                    ////////////////////console.log(json_data)
                                    //series_title, title, date, start_time, venue 
                                    if (field_varname == "series_title") {
                                        //var json_data = JSON.parse(item.jsondata)
                                        //var mykeys = JSON.parse(item.keys);
                                        //var session_id = mykeys.session_id;
                                        //var parent_session_id = mykeys.parent_session_id;                             
                                        var session_id = item.option_id;
                                        var parent_session_id = item.option_id;
                                        //window.session_id = session_id;
                                        //window.parent_session_id = parent_session_id;

                                        response.results.push({
                                            title: item.option_prompt
                                            , keys: { session_id: session_id, parent_session_id: parent_session_id }
                                            //url       : item.html_url
                                        });

                                    }

                                    if (field_varname == "multipart_title") {
                                        var json_data = JSON.parse(item.jsondata)
                                        var mykeys = JSON.parse(item.keys);
                                        var session_id = mykeys.session_id;
                                        var parent_session_id = mykeys.parent_session_id;
                                        //window.session_id = session_id;
                                        //window.parent_session_id = parent_session_id;

                                        if ((parent_session_id == session_id && json_data.multipart == true) || (json_data.multipart_inside_series_new == true)) {
                                            response.results.push({
                                                title: json_data.session_title
                                                , description: json_data.session_title + ", " + (json_data.date || "Date TBD") + ", " + (json_data.start_time || "Time TBD") + ", " + (json_data.venue || "Location TBD")
                                                , id: item.id
                                                , keys: item.keys
                                                , full_data: json_data
                                                //url       : item.html_url
                                            })
                                        }
                                    }

                                    if (field_varname == "session_title") {
                                        var json_data = JSON.parse(item.jsondata)
                                        var mykeys = JSON.parse(item.keys);
                                        var session_id = mykeys.session_id;
                                        var parent_session_id = mykeys.parent_session_id;
                                        //window.session_id = session_id;
                                        //window.parent_session_id = parent_session_id;


                                        response.results.push({
                                            title: json_data.session_title
                                            , description: json_data.session_title + ", " + (json_data.date || "Date TBD") + ", " + (json_data.start_time || "Time TBD") + ", " + (json_data.venue || "Location TBD")
                                            , //description: json_data.session_title + ", " + (json_data.date == "undefined" ? "-" : json_data.date) + ", " + (json_data.start_time == "undefined" ? "-" : json_data.start_time) + ", " + (json_data.venue == "undefined" ? "-" : json_data.venue),
                                            id: item.id
                                            , keys: item.keys
                                            , full_data: json_data
                                            //url       : item.html_url
                                        })
                                    }
                                });
                                //////////////////console.log(response)    
                                return response;
                            }
                            , url: lookup_url
                        },

                        minCharacters: 1
                        , onSearchQuery: function (query) {
                            $("[name=session_title]")
                                .change(function () {
                                    //////////////////console.log("this is changing")
                                    window.changedBefore = true;
                                    //window.saveMethod = null; 

                                })

                        }
                        , onResultsClose: function () {
                            //////////////////console.log(window.selectedBefore,window.saveMethod,window.changedBefore)
                            if (field_varname == "session_title" && !window.selectedBefore && window.changedBefore) {

                                if (window.dirtyFlag) {
                                    dirtyFlagModal()
                                } else {
                                    $('#confirmation_add_session')
                                        .modal("show");
                                    $('#create_title_button')
                                        .click(function () {
                                            $('#confirmation_add_session')
                                                .modal("hide");
                                        })
                                    $('#try_again_button')
                                        .click(function () {
                                            $('#confirmation_add_session')
                                                .modal("hide");
                                            $("#session_title")
                                                .val("");
                                        })

                                }
                                resetState();
                                if (!window.window.saveMethod) {
                                    window.saveMethod = "add_session";
                                }
                            }

                        }
                        , onSelect: function (result, response) {
                            if (field_varname == "session_title") {
                                var result_array = result.full_data;
                                //////////console.log(result)
                                window.keys = result.keys;
                                var mykeys = JSON.parse(result.keys)
                                //////////////////console.log(window.parent_session_id)
                                window.schedule_id = mykeys.schedule_id;
                                window.session_id = mykeys.session_id;
                                window.parent_session_id = mykeys.parent_session_id;
                                if (window.id) {
                                    if (window.id != result.id) {
                                        //////////////////console.log(window.id)
                                        //////////////////console.log(result.id)
                                        window.changedBefore = true;
                                    }
                                }
                                window.id = result.id;
                                //if(!window.dirtyFlag) {
                                for (var key in result_array) {
                                    // skip loop if the property is from prototype
                                    if (!result_array.hasOwnProperty(key)) continue;
                                    if ($("[name=" + key + "]")
                                        .closest(".field")
                                        .parent()
                                        .css("display") != "none") {
                                        if ($("[name=" + key + "]")
                                            .filter(":visible")
                                            .is("select")) {
                                            //////////////////console.log("is true")
                                            $("[name=" + key + "]")
                                                .filter(":visible")
                                                .val(result_array[key])
                                                .trigger('change');
                                            $("[name=" + key + "]")
                                                .filter(":visible")
                                                .dropdown('set selected', result_array[key])
                                                .trigger('change');
                                        } else if ($("[name=" + key + "]")
                                            .is("table")) {
                                            $("[name=" + key + "]")
                                                .jqGrid('setGridParam', { data: result_array[key] })
                                                .trigger('reloadGrid');
                                            ajustStyleJqgrid()
                                        } else if ($("[name=" + key + "]")
                                            .is(':checkbox')) {
                                            if (result_array[key] == true) {
                                                //////////console.log(key)
                                                $("[name=" + key + "]")
                                                    .prop("checked", true)
                                                    .trigger('change');
                                            } else {
                                                $("[name=" + key + "]")
                                                    .prop("checked", false)
                                                    .trigger('change');
                                            }
                                        } else if (key == "session_title" || key == "venue" || key == "series_title" || key == "duration") { //If it is an autosuggest field/duration, don't implement trigger change               
                                            $("[name=" + key + "]")
                                                .val(result_array[key]);
                                            $("[name=" + key + "]")
                                                .dropdown('set selected', result_array[key])
                                                .trigger('change');
                                            //////////console.log(result_array[key])
                                        } else {
                                            ////////////console.log($("[name=" + key + "]"))
                                            $("[name=" + key + "]")
                                                .val(result_array[key])
                                                .trigger('change');
                                        }
                                    }
                                }
                                autoCalculate();
                                //////////////////console.log(result)
                                bindStateOnSelect(result.title);
                                window.session_title_value = $("#session_title")
                                    .val();
                                //window.dirtyFlag = false;                                         
                                //}
                                //if(window.dirtyFlag == true) {
                                //dirtyFlagModal()

                                //}                                             
                            }
                            if (field_varname == "series_title") {
                                var mykeys = result.keys
                                window.series_parent_session_id = mykeys.parent_session_id;
                                window.series_session_id = mykeys.session_id;
                            }
                            if (field_varname == "multipart_title") {
                                var mykeys = JSON.parse(result.keys)
                                window.multipart_parent_sesison_id = mykeys.parent_session_id;
                                window.multipart_session_id = mykeys.session_id;
                            }


                        } //End of onSelect         
                    })


                $("#" + field_varname)
                    .keydown(function (event) {
                        if (event.keyCode === 27) {
                            event.preventDefault();
                            $("#" + field_varname)
                                .blur();
                            $("#session_type")
                                .focus();
                            return false;
                        }

                    })



                $("#session_title")
                    .on("change", function () {
                        window.session_title_value = $("#session_title")
                            .val();
                    });
            }




        } //End of processLookupField
        function resetForCreateNewExisting() {
            $("[name=instructor_details]")
                .jqGrid("clearGridData")
                .trigger('reloadGrid');
            $("[name=instructor_details]")
                .closest('section')
                .hide();
            $("[name=attendance]")
                .jqGrid("clearGridData")
                .trigger('reloadGrid');
            $("[name=attendance]")
                .closest('section')
                .hide();
            $("#venue")
                .val("");
            $("[name = date]")
                .val("")
                .trigger("change");
            triggerAllDay();
            $("#total_staff_involved")
                .val(0)
                .trigger("change");
            $("#people_registered")
                .val(0);
            //--------------------------------------$('input:checkbox').removeAttr('checked');      
        }

        function resetForCreateNew() {
            window.schedule_id = null;
            window.session_id = null;
            window.parent_session_id = null;

            $("[name=instructor_details]")
                .jqGrid("clearGridData")
                .trigger('reloadGrid');
            $("[name=instructor_details]")
                .closest('section')
                .hide();
            $("[name=attendance]")
                .jqGrid("clearGridData")
                .trigger('reloadGrid');
            $("[name=attendance]")
                .closest('section')
                .hide();
            $("#venue")
                .val("");
            $("[name = date]")
                .val("")
                .trigger("change");
            $("[name = start_time]")
                .val("")
                .trigger("change");
            $("[name = end_time]")
                .val("")
                .trigger("change");
            $("#total_staff_involved")
                .val(0)
                .trigger("change");
            $("#people_registered")
                .val(0);
            $('input:checkbox')
                .removeAttr('checked');
        }


        function dirtyFlagModal() {
            $("#dirty_flag_modal")
                .modal("show");

            $("#update_title_button")
                .click(function (e) {
                    $("#dirty_flag_modal")
                        .modal("hide");

                })

            $("#create_new_session_button")
                .click(function (e) {
                    $("#dirty_flag_modal")
                        .modal("hide");
                    resetForCreateNew();

                })

            $("#overwrite")
                .click(function () {
                    $("#dirty_flag_modal")
                        .modal("hide");
                    for (var key in result_array) {
                        // skip loop if the property is from prototype
                        if (!result_array.hasOwnProperty(key)) continue;
                        if ($("[name=" + key + "]")
                            .is("select")) {
                            //////////////////console.log("is true")
                            $("[name=" + key + "]")
                                .dropdown('set selected', result_array[key])
                                .trigger('change');
                        } else if ($("[name=" + key + "]")
                            .is("table")) {
                            $("[name=" + key + "]")
                                .jqGrid('setGridParam', { data: result_array[key] })
                                .trigger('reloadGrid');
                            ajustStyleJqgrid()
                        } else if ($("[name=" + key + "]")
                            .is(':checkbox')) {
                            if (result_array[key] == true) {
                                $("[name=" + key + "]")
                                    .prop("checked", true)
                                    .trigger('change');
                            } else {
                                $("[name=" + key + "]")
                                    .prop("checked", false)
                                    .trigger('change');
                            }
                        } else if (key == "session_title" || key == "venue" || key == "series_title" || key == "duration") { //If it is an autosuggest field/duration, don't implement trigger change               
                            $("[name=" + key + "]")
                                .val(result_array[key]);
                        } else {
                            $("[name=" + key + "]")
                                .val(result_array[key])
                                .trigger('change');
                        }
                    }
                    window.dirtyFlag = false;
                })
            $("#dont_overwrite")
                .click(function () {
                    $("#dirty_flag_modal")
                        .modal("hide");
                    window.dirtyFlag = false;
                })
        }

        function bindStateOnSelect(title) {
            if (title != window.session_title_value) {
                //////////////////console.log(window.session_title_value)
                //alert(title, window.session_title_value)
                window.changedBefore = true;
            }
            if (window.changedBefore) {
                //window.selectedBefore = true;
                window.changedBefore = false;
                $("#session_modal")
                    .modal("show");
                $("#session_modal")
                    .modal({
                        onHidden: function () {
                            //////////////////console.log("hidden");
                            if (!window.saveMethod) {
                                window.saveMethod = "update_session";
                            }
                            window.selectedBefore = false;
                        }
                    })
            }



            $("#add")
                .click(function () {

                    window.saveMethod = "add_session";
                    ////////////console.log(window.saveMethod)
                    if ($("[name='series']")
                        .prop("checked")) {
                        $("[name='attendance']")
                            .jqGrid('setGridParam', { data: [] })
                            .trigger('reloadGrid');
                    }
                    resetForCreateNewExisting();
                    $("#session_modal")
                        .modal("hide");
                })

            $("#update")
                .click(function () {
                    window.saveMethod = "update_session";
                    $("#session_modal")
                        .modal("hide");
                })



        }



        function formatRepo(repo) {
            ////////////////////console.log(repo);
            ////////////////////console.log(window.default_show);
            var markup = '<div class="clearfix">' + repo.text + '</div>';
            return markup;
        }

        function formatRepoSelection(repo) {
            ////////////////////console.log(repo);
            return repo.text;
        }


        function checkExist(stringToSplit, array) {
            if (stringToSplit == null || stringToSplit == 'All') {
                return true;
            }
            var arrayToSplit = stringToSplit.split(",");
            for (var i = 0; i < arrayToSplit.length; i++) {
                if ($.inArray(arrayToSplit[i], array) < 0) {
                    return false;
                }
            }
            return true;
        } //check if multiple string are in the array




        function processCollectionlistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var place_holder = field_detail.place_holder;
            var data_name = field_detail["data-name"];
            var place_holder = field_detail.place_holder;
            var combobox_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var field_type = field_detail.field_type;
            var ui_class = "";
            if (field_type == "combobox") {
                ui_class = "ui fluid multiple search selection dropdown "
            } else {
                ui_class = "ui fluid search selection dropdown "
            }
            if (field_status != null && field_status == "required") {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                    '<select required class = "' + ui_class + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                    '</div>';
            } else if (field_status == "hide") {
                combobox_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';


            } else {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        ////////////////////console.log(result);
                        var options = result;
                        var options_markup = "";
                        var collection_array = [];
                        var collection_string = "";
                        //Store the option list on the local storage
                        //Loop through options json array and append to the field
                        if (options[0] != null && options[0].sequence != null && options[0].sequence > 0) {
                            ////////////////console.log(options)
                            options.sort(compareOptionSequence);
                            //////////console.log(options)
                        }
                        //////////console.log(options)

                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, options);
                        } else {
                            // Sorry! No Web Storage support..
                        }

                        for (var i = 0; i < options.length; i++) {

                            if (i == 0) {
                                options_markup += '<option value="">Choose one...</option>';
                                collection_string += options[i].pi_collection_id;
                            } else {
                                collection_string += "|" + options[i].pi_collection_id;
                            }
                        }

                        options_markup += '<option value ="LSTA" data-picollectionid = ' + collection_string + '>LSTA</option>';

                        $(options_markup)
                            .appendTo($("#" + field_varname));

                        $("#" + field_varname)
                            .dropdown({ placeholder: "Choose one...", fullTextSearch: true });
                        //////////////////console.log($("#" + field_varname).parent().find(".text"))
                        $("#" + field_varname)
                            .parent()
                            .find(".text")
                            .addClass("default")
                        $("#" + field_varname)
                            .parent()
                            .find(".default.text")
                            .text("Choose one...")
                        ////////////////////console.log(result);
                        isVis()
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } else {
                var options_markup = "";
                for (var i = 0; i < options.length; i++) {
                    options_markup += '<option value ="' + options[i].option_value +
                        '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                }
                $(options_markup)
                    .appendTo($("#" + field_varname));
                $(".ui.dropdown")
                    .dropdown({ fullTextSearch: true });
                isVis()
            }
            //
            ////////////////////console.log($("#" + field_id));
            ////////////////////console.log("aaa");
            if (field_varname == "series_title") {
                $("#" + field_varname)
                    .change(function () {
                        window.series_parent_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                        //////////////////console.log(window.series_parent_session_id)
                        window.series_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                    })
            }

            if (!isVis()) {
                $("#session_type option[value= 'VIS' ]")
                    .hide();
            }
        }


        function processLibrarylistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_varname = field_detail.object_varname;
            var field_label = field_detail.object_label;
            var place_holder = field_detail.place_holder;
            var field_status = field_detail.load_status;
            var ws_url = field_detail.ws_url;
            var lookup_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            if (field_status == "required") {
                lookup_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class="' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                    '<div class="ui fluid search ' + input_class + '">' +
                    '<div class = "ui fluid icon input"  >' +
                    '<input type="text"  class="prompt" placeholder="' + place_holder + '" id =  "' + field_varname + '"  name = "' + field_varname + '" >' +
                    '<i class="search icon"></i>' +
                    '</div>' +
                    '<div class="results"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else if (field_status == "hide") {
                lookup_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class="' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<div class="ui fluid search ' + input_class + '">' +
                    '<div class = "ui fluid icon input"  >' +
                    '<input type="text"  class="prompt" placeholder="' + place_holder + '" id =  "' + field_varname + '"  name = "' + field_varname + '" >' +
                    '<i class="search icon"></i>' +
                    '</div>' +
                    '<div class="results"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else {
                lookup_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class="' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<div class="ui fluid search ' + input_class + '">' +
                    '<div class = "ui fluid icon input"  >' +
                    '<input type="text"  class="prompt" placeholder="' + place_holder + '" id =  "' + field_varname + '"  name = "' + field_varname + '" >' +
                    '<i class="search icon"></i>' +
                    '</div>' +
                    '<div class="results"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            $(lookup_html)
                .appendTo($("#" + grid_id)); //Append to lookup section
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            var ltype = getltype();
            var base_url = field_detail.ws_url + "&ls_name={query}";
            var lookup_url = base_url;
            $("#ltype")
                .change(function () {
                    if (getltype()
                        .length) {
                        lookup_url = base_url + "&ltype=" + getltype();
                    } else {
                        lookup_url = base_url;
                    }

                    $("#" + field_varname)
                        .closest(".ui.search")
                        .search({
                            placeholder: "Search/Add Library"
                            , fullTextSearch: true
                            , apiSettings: {
                                onResponse: function (results) {
                                    var response = {
                                        results: []
                                    };
                                    $.each(results, function (index, item) {
                                        response.results.push({
                                            title: item.ls_name
                                            , stprov: item.stprov
                                            , ls_id: item.ls_id
                                            //url       : item.html_url
                                        });


                                    });
                                    //////////////////console.log(response)    
                                    return response;
                                }
                                , url: lookup_url
                            }
                            , onSearchQuery: function (query) {
                                window.selected = false;
                            }
                            , onResultsClose: function () {
                                //////////////////console.log(window.selectedBefore,window.saveMethod,window.changedBefore)
                                if (!window.selected && $("#" + field_varname)
                                    .val()
                                    .length) {
                                    $("#section_address")
                                        .show();
                                    window.ls_id == 0;
                                }

                                if (!$("#" + field_varname)
                                    .val()
                                    .length) {
                                    $("#section_address")
                                        .hide();
                                }
                            }
                            , onSelect: function (result, response) {
                                ////////////console.log(result)
                                window.selected = true;
                                window.ls_id = result.ls_id;
                                $("#section_address")
                                    .hide();
                            }
                        });
                })
        }

        function processLibraryTypelistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var place_holder = field_detail.place_holder;
            var data_name = field_detail["data-name"];
            var place_holder = field_detail.place_holder;
            var combobox_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            if (field_status != null && field_status == "required") {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                    '<select required class = "ui search selection dropdown' + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                    '</div>';
            } else if (field_status == "hide") {
                combobox_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown ' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';


            } else {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        //////////////console.log(result);
                        var options = result.ltypes;
                        options = options.replace(/\(|\)/g, '')
                        options = JSON.parse(options)
                        //////////////console.log(options);
                        var options_markup = '<option value="">Choose one...</option>';
                        //Store the option list on the local storage
                        //Loop through options json array and append to the field
                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, options);
                        } else {
                            // Sorry! No Web Storage support..
                        }

                        for (var key in options) {
                            //////////////console.log(key)
                            //////////////console.log(options)
                            // skip loop if the property is from prototype
                            if (!options.hasOwnProperty(key)) continue;

                            // your code
                            options_markup += '<option value ="' + key +
                                '" data-name = "' + '">' + options[key] + '</option>';

                        }


                        $(options_markup)
                            .appendTo($("#" + field_varname));

                        $("#" + field_varname)
                            .dropdown({ placeholder: "Choose one...", fullTextSearch: true });
                        //////////////////console.log($("#" + field_varname).parent().find(".text"))
                        $("#" + field_varname)
                            .parent()
                            .find(".text")
                            .addClass("default")
                        $("#" + field_varname)
                            .parent()
                            .find(".default.text")
                            .text("Choose one...")
                        ////////////////////console.log(result);
                        isVis()
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } //
            ////////////////////console.log($("#" + field_id));
            ////////////////////console.log("aaa");

            if (!isVis()) {
                $("#session_type option[value= 'VIS' ]")
                    .hide();
            }
        }


        function processSearchlistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var place_holder = field_detail.place_holder;
            var data_name = field_detail["data-name"];
            var place_holder = field_detail.place_holder;
            var combobox_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            //console.log(field_status)
            if (field_status == "is_vis" && !isVis()) {
                return
            }
            if (field_status == "not_vis" && isVis()) {
                return
            }


            if (field_status != null && field_status == "required") {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "* ' + field_varname + '">' + field_label + '</label>' +
                    '<select required class = "ui search selection dropdown' + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                    '</div>';
            } else if (field_status == "hide") {
                combobox_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown ' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';


            } else {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                //if(isTest()) {
                //ws_options = ws_options + "&is_test=1"
                //}
                //if ('caches' in window) {
                /*
                 * Check if the service worker has already cached this option's
                 * data. If the service worker has the data, then display the cached
                 * data while the app fetches the latest data.
                 */
                //caches.match(ws_options).then(function(response) {
                //  if (response) {
                //  response.json().then(function updateFromCache(result) {
                //  //////////////////console.log("cached for " + ws_options);
                //  //////////////////console.log(result);
                //  var options = result;
                //  var options_markup = "";
                //for(var i = 0; i < options.length; i++){
                //options_markup += '<option value ="' + options[i].option_value
                //                   + '" data-name = "' + options[i]["data-name"] +'" data-value = "' +  options[i]["data-value"] +'">'+ options[i].option_prompt + '</option>';
                //}
                //$(options_markup).appendTo($("#" + field_id));                    
                //  ////////////////////console.log(result);                
                //});
                //}
                //});
                //}//If caches exists   
                //else{
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        ////////////////////console.log(result);
                        var options = result;
                        var options_markup = "";
                        //Store the option list on the local storage
                        //Loop through options json array and append to the field
                        if (options[0] != null && options[0].sequence != null && options[0].sequence > 0) {
                            ////////////////console.log(options)
                            options.sort(compareOptionSequence);
                            ////////////////console.log(options)
                        }
                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, JSON.stringify(options));

                        } else {
                            // Sorry! No Web Storage support..
                        }

                        for (var i = 0; i < options.length; i++) {
                            if (i == 0) {
                                options_markup += '<option value="">Choose one...</option>';
                            }
                            options_markup += '<option value ="' + options[i].option_value +
                                '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                        }
                        //console.log($("#" + grid_id + " #" + field_varname))
                        $("#" + grid_id + " #" + field_varname)
                            .empty();
                        //console.log($("#" + grid_id + " #" + field_varname))
                        $(options_markup)
                            .appendTo($("#" + grid_id + " #" + field_varname));

                        $("#" + grid_id + " #" + field_varname)
                            .dropdown({ placeholder: "Choose one..." });
                        //////////////////console.log($("#" + field_varname).parent().find(".text"))
                        $("#" + grid_id + " #" + field_varname)
                            .parent()
                            .find(".text")
                            .addClass("default")
                        $("#" + grid_id + " #" + field_varname)
                            .parent()
                            .find(".default.text")
                            .text("Choose one...")
                        ////////////////////console.log(result);
                        isVis()
                        triggerIsVis()
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } else {
                var options_markup = "";
                if (typeof (Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    localStorage.setItem(field_varname, JSON.stringify(options));

                } else {
                    // Sorry! No Web Storage support..
                }

                for (var i = 0; i < options.length; i++) {
                    options_markup += '<option value ="' + options[i].option_value +
                        '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                }
                $(options_markup)
                    .appendTo($("#" + field_varname));
                $(".ui.dropdown")
                    .dropdown({ fullTextSearch: true });
                isVis()
            }
            //
            ////////////////////console.log($("#" + field_id));
            ////////////////////console.log("aaa");
            if (field_varname == "series_title") {
                $("#" + field_varname)
                    .change(function () {
                        window.series_parent_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                        //////////////////console.log(window.series_parent_session_id)
                        window.series_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                    })
            }

            if (!isVis()) {
                $("#session_type option[value= 'VIS' ]")
                    .hide();
            }
        }


        function processSearchlistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var place_holder = field_detail.place_holder;
            var data_name = field_detail["data-name"];
            var place_holder = field_detail.place_holder;
            var combobox_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            if (field_status != null && field_status == "required") {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "* ' + field_varname + '">' + field_label + '</label>' +
                    '<select required class = "ui search selection dropdown' + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                    '</div>';
            } else if (field_status == "hide") {
                combobox_html = '<div class = "column" style = "display:none">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown ' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';


            } else {
                combobox_html = '<div class = "column">' +
                    '<div class = "inline field ui grid stackable">' +
                    '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select class = "ui search selection dropdown' + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                    '</div>';

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                //if(isTest()) {
                //ws_options = ws_options + "&is_test=1"
                //}
                //if ('caches' in window) {
                /*
                 * Check if the service worker has already cached this option's
                 * data. If the service worker has the data, then display the cached
                 * data while the app fetches the latest data.
                 */
                //caches.match(ws_options).then(function(response) {
                //  if (response) {
                //  response.json().then(function updateFromCache(result) {
                //  //////////////////console.log("cached for " + ws_options);
                //  //////////////////console.log(result);
                //  var options = result;
                //  var options_markup = "";
                //for(var i = 0; i < options.length; i++){
                //options_markup += '<option value ="' + options[i].option_value
                //                   + '" data-name = "' + options[i]["data-name"] +'" data-value = "' +  options[i]["data-value"] +'">'+ options[i].option_prompt + '</option>';
                //}
                //$(options_markup).appendTo($("#" + field_id));                    
                //  ////////////////////console.log(result);                
                //});
                //}
                //});
                //}//If caches exists   
                //else{
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        ////////////////////console.log(result);
                        var options = result;
                        var options_markup = "";
                        //Store the option list on the local storage
                        //Loop through options json array and append to the field
                        if (options[0] != null && options[0].sequence != null && options[0].sequence > 0) {
                            ////////////////console.log(options)
                            options.sort(compareOptionSequence);
                            ////////////////console.log(options)
                        }
                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, JSON.stringify(options));
                        } else {
                            // Sorry! No Web Storage support..
                        }

                        for (var i = 0; i < options.length; i++) {
                            if (i == 0) {
                                options_markup += '<option value="">Choose one...</option>';
                            }
                            options_markup += '<option value ="' + options[i].option_value +
                                '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                            if (typeof (Storage) !== "undefined") {
                                // Code for localStorage/sessionStorage.
                                localStorage.setItem(options[i].option_value, '<option value ="' + options[i].option_value +
                                    '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>');
                            } else {
                                // Sorry! No Web Storage support..
                            }

                        }

                        $(options_markup)
                            .appendTo($("#" + field_varname));

                        $("#" + field_varname)
                            .dropdown({ placeholder: "Choose one...", fullTextSearch: true });
                        //////////////////console.log($("#" + field_varname).parent().find(".text"))
                        $("#" + field_varname)
                            .parent()
                            .find(".text")
                            .addClass("default")
                        $("#" + field_varname)
                            .parent()
                            .find(".default.text")
                            .text("Choose one...")
                        ////////////////////console.log(result);
                        isVis()
                        triggerIsVis();
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } else {
                var options_markup = "";
                if (typeof (Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    localStorage.setItem(field_varname, JSON.stringify(options));

                } else {
                    // Sorry! No Web Storage support..
                }

                if (options) {
                    for (var i = 0; i < options.length; i++) {
                        options_markup += '<option value ="' + options[i].option_value +
                            '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                    }
                }
                $(options_markup)
                    .appendTo($("#" + field_varname));
                $(".ui.dropdown")
                    .dropdown({ fullTextSearch: true });
                isVis()
            }
            //
            ////////////////////console.log($("#" + field_id));
            ////////////////////console.log("aaa");
            if (field_varname == "series_title") {
                $("#" + field_varname)
                    .change(function () {
                        window.series_parent_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                        //////////////////console.log(window.series_parent_session_id)
                        window.series_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                    })
            }

            if (!isVis()) {
                $("#session_type option[value= 'VIS' ]")
                    .hide();
            }
        }


        function processSelectlistField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var place_holder = field_detail.place_holder;
            var data_name = field_detail["data-name"];
            var place_holder = field_detail.place_holder;
            var combobox_html = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var field_type = field_detail.field_type;
            var commnunico_url = field_detail.commnunico_url;
            //console.log(field_status)
            if (field_status == "is_vis" && !isVis()) {
                return
            }
            if (field_status == "not_vis" && isVis()) {
                return
            }
            if (field_type == "combobox") {
                ui_class = "ui fluid multiple selection dropdown "
                if (field_status != null && field_status == "required") {
                    combobox_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<select multiple required class = "' + ui_class + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                        '</div>';
                } else if (field_status == "hide") {
                    combobox_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<select multiple class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                        '</div>';


                } else {
                    combobox_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<select multiple class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                        '</div>';

                }

            } else {
                ui_class = "ui fluid selection dropdown "
                if (field_status != null && field_status == "required") {
                    combobox_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<select required class = "' + ui_class + input_class + '" id = "' + field_varname + '"   name = "' + field_varname + '"   data-name = "' + data_name + '" ><select>' +
                        '</div>';
                } else if (field_status == "hide") {
                    combobox_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<select class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                        '</div>';


                } else {
                    combobox_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<select class = "' + ui_class + input_class + '"  id = "' + field_varname + '"   name = "' + field_varname + '"  data-name = "' + data_name + '"><select>' +
                        '</div>';

                }

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                //if(isTest()) {
                //ws_options = ws_options + "&is_test=1"
                //}
                //if ('caches' in window) {
                /*
                 * Check if the service worker has already cached this option's
                 * data. If the service worker has the data, then display the cached
                 * data while the app fetches the latest data.
                 */
                //caches.match(ws_options).then(function(response) {
                //  if (response) {
                //  response.json().then(function updateFromCache(result) {
                //  //////////////////console.log("cached for " + ws_options);
                //  //////////////////console.log(result);
                //  var options = result;
                //  var options_markup = "";
                //for(var i = 0; i < options.length; i++){
                //options_markup += '<option value ="' + options[i].option_value
                //                   + '" data-name = "' + options[i]["data-name"] +'" data-value = "' +  options[i]["data-value"] +'">'+ options[i].option_prompt + '</option>';
                //}
                //$(options_markup).appendTo($("#" + field_id));                    
                //  ////////////////////console.log(result);                
                //});
                //}
                //});
                //}//If caches exists   
                //else{
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        ////////////////////console.log(result);
                        var options = result;
                        var options_markup = "";
                        //Store the option list on the local storage
                        //Loop through options json array and append to the field
                        if (options[0] != null && options[0].sequence != null && options[0].sequence > 0) {
                            ////////////////console.log(options)
                            options.sort(compareOptionSequence);
                            ////////////////console.log(options)
                        }
                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, JSON.stringify(options));
                        } else {
                            // Sorry! No Web Storage support..
                        }


                        for (var i = 0; i < options.length; i++) {
                            if (i == 0) {
                                options_markup += '<option value="">Choose one...</option>';
                            }
                            //////console.log(!isVis())
                            //////console.log(options[i].option_value != "VIS")
                            //////console.log(options[i].is_deleted != 1)

                            if (!isVis()) {
                                if (options[i].option_value != "VIS") {
                                    if (options[i].is_deleted != 1) {
                                        //////console.log(options_markup)
                                        options_markup += '<option value ="' + options[i].option_value +
                                            '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                                        if (typeof (Storage) !== "undefined") {
                                            // Code for localStorage/sessionStorage.
                                            localStorage.setItem(options[i].option_value, '<option value ="' + options[i].option_value +
                                                '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>');
                                        } else {
                                            // Sorry! No Web Storage support..
                                        }

                                    }
                                }
                            } else {
                                //console.log(field_varname,options)
                                if (options[i].is_deleted != 1) {
                                    //////console.log(options_markup)
                                    options_markup += '<option value ="' + options[i].option_value +
                                        '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                                    if (typeof (Storage) !== "undefined") {
                                        // Code for localStorage/sessionStorage.
                                        localStorage.setItem(options[i].option_value, '<option value ="' + options[i].option_value +
                                            '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>');
                                    } else {
                                        // Sorry! No Web Storage support..
                                    }

                                }
                            }
                        }
                        //console.log(options_markup)
                        $("#" + grid_id + " #" + field_varname)
                            .empty();
                        //console.log($("#" + grid_id + " #" + field_varname  + " option"))
                        $(options_markup)
                            .appendTo($("#" + grid_id + " #" + field_varname));

                        $("#" + grid_id + " #" + field_varname)
                            .dropdown({ placeholder: "Choose one..." });
                        //////////////////console.log($("#" + field_varname).parent().find(".text"))
                        $("#" + grid_id + " #" + field_varname)
                            .parent()
                            .find(".text")
                            .addClass("default")
                        $("#" + grid_id + " #" + field_varname)
                            .parent()
                            .find(".default.text")
                            .text("Choose one...")
                        ////////////////////console.log(result);
                        processFilterNewformatInfo(window.filters_newformat);
                        isVis()
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } else if (commnunico_url != null && commnunico_url.length) {
                var url = 'https://api.communico.co/v3/token';
                $.ajax({
                    type: "POST"
                    , url: url
                    , dataType: 'json'
                    , data: { client_id: "ZYTE0yt1WvMgCbQGcnJZ", client_secret: "F2LNepEL8HZdkJhuDx7j", scope: "", grant_type: "client_credentials" }
                    , success: function (result) {
                        console.log(result);
                        var access_token = result.access_token;
                        var token_type = result.token_type;
                        var request_url = "https://api.communico.co/v3/attend/events?start=0&limit=10&status=published&term={query}";
                        $.ajax({
                            dataType: "json"
                            , url: commnunico_url
                            , data: ""
                            , beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", token_type + " " + access_token);
                            }
                            , success: function (result) {
                                ////////////////////console.log(result);
                                var options = result.data.entries;
                                var options_markup = "";
                                //Store the option list on the local storage
                                //Loop through options json array and append to the field
                                if (typeof (Storage) !== "undefined") {
                                    // Code for localStorage/sessionStorage.
                                    localStorage.setItem(field_varname, JSON.stringify(options));
                                } else {
                                    // Sorry! No Web Storage support..
                                }


                                for (var i = 0; i < options.length; i++) {
                                    if (i == 0) {
                                        options_markup += '<option value="">Choose one...</option>';
                                    }
                                    //////console.log(!isVis())
                                    //////console.log(options[i].option_value != "VIS")
                                    //////console.log(options[i].is_deleted != 1)

                                    //console.log(options[i])
                                    if (options[i].name && options[i].id) {
                                        //////console.log(options_markup)
                                        options_markup += '<option value ="' + options[i].id +
                                            '">' + options[i].name + '</option>';
                                        if (typeof (Storage) !== "undefined") {
                                            // Code for localStorage/sessionStorage.
                                            localStorage.setItem(options[i].id, '<option value ="' + options[i].id +
                                                '">' + options[i].name + '</option>');
                                        } else {
                                            // Sorry! No Web Storage support..
                                        }

                                    } else if (options[i].name && !options[i].id) {
                                        //////console.log(options_markup)
                                        options_markup += '<option value ="' + options[i].name +
                                            '">' + options[i].name + '</option>';
                                        if (typeof (Storage) !== "undefined") {
                                            // Code for localStorage/sessionStorage.
                                            localStorage.setItem(options[i].name, '<option value ="' + options[i].name +
                                                '">' + options[i].name + '</option>');
                                        } else {
                                            // Sorry! No Web Storage support..
                                        }

                                    } else {
                                        options_markup += '<option value ="' + options[i] +
                                            '">' + options[i] + '</option>';
                                        if (typeof (Storage) !== "undefined") {
                                            // Code for localStorage/sessionStorage.
                                            localStorage.setItem(options[i], '<option value ="' + options[i] +
                                                '">' + options[i] + '</option>');
                                        } else {
                                            // Sorry! No Web Storage support..
                                        }

                                    }


                                }
                                //console.log(options_markup)
                                $("#" + grid_id + " #" + field_varname)
                                    .empty();
                                //console.log($("#" + grid_id + " #" + field_varname  + " option"))
                                $(options_markup)
                                    .appendTo($("#" + grid_id + " #" + field_varname));

                                $("#" + grid_id + " #" + field_varname)
                                    .dropdown({ placeholder: "Choose one..." });
                                //////////////////console.log($("#" + field_varname).parent().find(".text"))
                                $("#" + grid_id + " #" + field_varname)
                                    .parent()
                                    .find(".text")
                                    .addClass("default")
                                $("#" + grid_id + " #" + field_varname)
                                    .parent()
                                    .find(".default.text")
                                    .text("Choose one...")
                                ////////////////////console.log(result);
                                processFilterNewformatInfo(window.filters_newformat);
                                isVis()
                            } //End of success method
                        }) //End of ajax    
                        //}//Else ajax call



                    }
                });
            } else {
                var options_markup = "";
                if (typeof (Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    localStorage.setItem(field_varname, JSON.stringify(options));
                    //////////console.log(JSON.stringify(options))

                } else {
                    // Sorry! No Web Storage support..
                }

                if (options) {
                    for (var i = 0; i < options.length; i++) {
                        options_markup += '<option value ="' + options[i].option_value +
                            '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '"option-id = "' + options[i]["option_id"] + '">' + options[i].option_prompt + '</option>';
                        optgroup_markup = "";    
                        if (options[i].grouping-options) {
                            optgroup_markup = '<optgroup label="' + options[i].grouping-label + '">'
                            for (var i = 0; i < options[i].grouping - options.length; i++) {
                                optgroup_markup += '<option value ="' + options[i].grouping-options[i].option_value +
                                    '" data-name = "' + options[i].grouping - options[i]["data-name"] + '" data-value = "' + options[i].grouping-options[i]["data-value"] + '"option-id = "' + options[i].grouping-options[i]["option_id"] + '">' + options[i].grouping-options[i].option_prompt + '</option>';
                            }
                            optgroup_markup += '</optgroup>';
                        }
                        options_markup += optgroup_markup;
                    }
                }
                $(options_markup)
                    .appendTo($("#" + field_varname));
                $(".ui.dropdown")
                    .dropdown();
                isVis()
            }
            //
            ////////////////////console.log($("#" + field_id));
            ////////////////////console.log("aaa");
            if (field_varname == "series_title") {
                $("#" + field_varname)
                    .change(function () {
                        window.series_parent_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                        //////////////////console.log(window.series_parent_session_id)
                        window.series_session_id = $("#" + field_varname + " option:selected")
                            .prop("option-id");
                    })
            }



        } //Process select

        function processComboboxField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_varname = field_detail.object_varname;
            var field_class = field_detail.object_class;
            var data_name = field_detail["data-name"];
            var combobox_html = "";
            if (field_status != null && field_status == "required") {
                combobox_html = '<div class = "field">' +
                    '<label for = "' + field_varname + '">* ' + field_label + '</label>' +
                    '<select required  id = "' + field_varname + '"  class="ui fluid dropdown" name = "' + field_varname + '"  multiple = "multiple" data-name = "' + data_name + '" ><select>';
            } else {
                combobox_html = '<div class = "field">' +
                    '<label for = "' + field_varname + '">' + field_label + '</label>' +
                    '<select  id = "' + field_varname + '"  class="ui fluid dropdown" name = "' + field_varname + '"  multiple = "multiple" data-name = "' + data_name + '" ><select>';

            }
            $(combobox_html)
                .appendTo($("#" + grid_id)); //Append to lookup sections;
            var options = field_detail.options;
            var ws_options = field_detail.ws_url;
            if (ws_options != null && ws_options.length) {
                //if(isTest()) {
                //ws_options = ws_options + "&is_test=1"
                //}

                //if ('caches' in window) {
                /*
                 * Check if the service worker has already cached this option's
                 * data. If the service worker has the data, then display the cached
                 * data while the app fetches the latest data.
                 */
                //caches.match(ws_options).then(function(response) {
                //  if (response) {
                //  response.json().then(function updateFromCache(result) {
                //  //////////////////console.log("cached for " + ws_options);
                //  //////////////////console.log(result);
                //  var options = result;
                //  var options_markup = "";
                //for(var i = 0; i < options.length; i++){
                //options_markup += '<option value ="' + options[i].option_value
                //                   + '" data-name = "' + options[i]["data-name"] +'" data-value = "' +  options[i]["data-value"] +'">'+ options[i].option_prompt + '</option>';
                //}
                //$(options_markup).appendTo($("#" + field_id));                    
                //  ////////////////////console.log(result);                
                //});
                //}
                //});
                //}//If caches exists   
                //else{
                $.ajax({
                    dataType: "json"
                    , url: ws_options
                    , data: ""
                    , success: function (result) {
                        ////////////////////console.log(result);
                        var options = result;
                        var options_markup = "";
                        //Store the option list on the local storage
                        if (typeof (Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.
                            localStorage.setItem(field_varname, JSON.stringify(options));
                        } else {
                            // Sorry! No Web Storage support..
                        }
                        //Loop through options json array and apeend to the field
                        for (var i = 0; i < options.length; i++) {
                            options_markup += '<option value ="' + options[i].option_value +
                                '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '">' + options[i].option_prompt + '</option>';
                        }
                        $(options_markup)
                            .appendTo($("#" + field_varname));
                        ////////////////////console.log(result);
                    } //End of success method
                }) //End of ajax    
                //}//Else ajax call
            } else {
                var options_markup = "";
                for (var i = 0; i < options.length; i++) {
                    options_markup += '<option value ="' + options[i].option_value +
                        '" data-name = "' + options[i]["data-name"] + '" data-value = "' + options[i]["data-value"] + '">' + options[i].option_prompt + '</option>';
                }
                $(options_markup)
                    .appendTo($("#" + field_varname));
            }
            //
            ////////////////////console.log($("#" + field_id));
            //$(".ui.dropdown").dropdown();
        }


        function processTableField(field_detail, grid_id) {
            //////////////////console.log(field_detail) 
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var col_model = field_detail.col_model;
            var data = field_detail.data;
            var inline = field_detail.inline;
            var field_detail = field_detail.columns;
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var col_model = []
            ////////////////////console.log(data);
            var input_field_html = '<label  for = "' + field_varname + '">' + field_label + '</label>' +
                '<table  id = "' + field_varname + '" name = "' + field_varname + '">' +
                '<div id = "jqGridPager_' + field_id + '"></div>'
            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
            //////////////////console.log($("#" + grid_id))

            //var data = [{name:"Instructor A",BodleianDepartment:"Weston Library"},
            //{name:"Instructor B",BodleianDepartment:"Vere Harmsworth Library"}]

            //var colModel = [
            //{label: "name", name: "name", key:true , editable: true, edittype:"text", width: 300 },  
            //{label: "Bodleian department", name: "BodleianDepartment", key:true , editable: true, edittype:"text", width: 500 }]
            ////////////////////console.log(colModel)
            ////////////////////console.log(col_model)


            for (var i = 0; i < field_detail.length; i++) {
                var optionlist = ":---;";
                var row_type = field_detail[i].field_type;
                var row_label = field_detail[i].object_label;
                var row_varname = field_detail[i].object_varname;
                var ws_url = field_detail[i].ws_url;
                if (field_detail[i].options) {
                    for (var j = 0; j < field_detail[i].options.length; j++) {
                        if (field_detail[i].options[0].sequence > 0) {
                            field_detail[i].options.sort(compareOptionSequence)
                        }
                        ////////////////////console.log(division_array)
                        if (j == field_detail[i].options.length - 1) {
                            optionlist += field_detail[i].options[j].option_value + ":" + field_detail[i].options[j].option_prompt;
                        } else {
                            optionlist += field_detail[i].options[j].option_value + ":" + field_detail[i].options[j].option_prompt + ";";
                        }
                    }
                }
                if (field_detail[i].ws_url) {

                    $.ajax({
                        url: ws_url
                        , async: false
                        , success: function (data) {
                            var option_array = data;
                            //////////////////console.log(option_array)
                            if (option_array[0] != null && option_array[0].sequence != null && option_array[0].sequence > 0) {
                                option_array.sort(compareOptionSequence)
                            }

                            for (var j = 0; j < option_array.length; j++) {
                                ////////////////////console.log(division_array)
                                localStorage.setItem(row_varname, JSON.stringify(option_array))
                                if (option_array[j].is_deleted != "1" && option_array[j].option_prompt != "undefined") {
                                    //////////////console.log(option_array[j].option_value)
                                    //////////////console.log(option_array[j].option_prompt)
                                    // Code for localStorage/sessionStorage.
                                    localStorage.setItem(option_array[j].option_value, '<option value ="' + option_array[j].option_value +
                                        '"role = "option" >' + option_array[j].option_prompt + '</option>');

                                    if (j == option_array.length - 1) {
                                        optionlist += option_array[j].option_value + ":" + option_array[j].option_prompt;
                                    } else {
                                        optionlist += option_array[j].option_value + ":" + option_array[j].option_prompt + ";";
                                    }

                                }
                            }
                            //////////////console.log(optionlist)   
                            //////////////console.log(optionlist[optionlist.length-1]); 
                            if (optionlist[optionlist.length - 1] == ";") {
                                optionlist = optionlist.substring(0, optionlist.length - 1);
                                //////////////console.log(optionlist)
                            }
                        }
                    });
                }
                //////////////////console.log(optionlist)
                //////////////////console.log(row_type)
                if (row_type == "selectlist") {
                    var row = {
                        label: row_label
                        , name: row_varname
                        , search: true
                        , editable: true
                        , edittype: "select"
                        , width: 100
                        , editoptions: {
                            value: optionlist
                        }
                    }
                } else if (row_type == "combobox") {
                    var row = {
                        label: row_label
                        , name: row_varname
                        , search: true
                        , editable: true
                        , edittype: "select"
                        , width: 100
                        , editoptions: {
                            value: optionlist
                            , dataInit: function (elem) {
                                setTimeout(function () {
                                    $(elem)
                                        .multiselect({
                                            minWidth: 100, //'auto',
                                            height: "auto"
                                            , selectedList: 2
                                            , checkAllText: "all"
                                            , uncheckAllText: "no"
                                            , noneSelectedText: "Any"
                                            , open: function () {
                                                var $menu = $(".ui-multiselect-menu:visible");
                                                $menu.width("auto");
                                                return;
                                            }
                                        });
                                }, 50);
                            }
                            , multiple: true
                            , defaultValue: 'IN'
                        }
                    }
                } else {
                    var row = { label: row_label, name: row_varname, search: true, editable: true, edittype: "text", width: 100 }
                    //////////////////console.log(row)
                }
                col_model.push(row);
            }

            //////////////////console.log(col_model)
            if (inline == "true") {
                //////////////////console.log("it is inline");
                $("#" + field_varname)
                    .jqGrid({
                        datatype: "local"
                        , // we set the changes to be made at client side using predefined word clientArray
                        editurl: 'clientArray'
                        , colModel: col_model
                        , onSelectRow: editRow
                        , loadonce: true
                        , viewrecords: true
                        , height: 'auto'
                        , rowNum: 10
                        , pager: "#jqGridPager_" + field_id
                        , toppager: true,    
                        width: null,           
                        autowidth: false,  // set 'true' here
                        shrinkToFit: true // well, it's 'true' by default
                    });
                var lastSelection;

                function editRow(id) {
                    if (id && id !== lastSelection) {
                        var grid = $("#" + field_varname);
                        grid.jqGrid('restoreRow', lastSelection);
                        grid.jqGrid('editRow', id, { keys: true, focusField: 4 });
                        lastSelection = id;
                    }
                } //Inline eidting

            } else {
                $("#" + field_varname)
                    .jqGrid({
                        datatype: "local"
                        , // we set the changes to be made at client side using predefined word clientArray
                        editurl: 'clientArray'
                        , colModel: col_model
                        , loadonce: true
                        , viewrecords: true
                        , height: 200
                        , rowNum: 10
                        , pager: "#jqGridPager_" + field_id
                        , toppager: true
                    });
            }

            //////////////////console.log($("#" + field_varname))
            $("#" + field_varname)
                .navGrid("#jqGridPager_" + field_id, { cloneToTop: true }
                    , // the buttons to appear on the toolbar of the grid
                    { edit: true, add: true, del: true, search: true, refresh: false, view: false, position: "left", cloneToTop: false }
                    , // options for the Edit Dialog
                    {
                        editCaption: "The Edit Dialog"
                        , recreateForm: true
                        , checkOnUpdate: true
                        , checkOnSubmit: true
                        , closeAfterEdit: true
                        , errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    }
                    , // options for the Add Dialog
                    {
                        closeAfterAdd: true
                        , recreateForm: true
                        , errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    }
                    , // options for the Delete Dailog
                    {
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    });
            $('button.dropdownmenu')
                .prop('type', 'button');
            $("input.ui-pg-input")
                .css("width", "auto");
            $("input.ui-pg-input")
                .css("vertical-align", "baseline");
            $("#jqGridPager_" + field_id)
                .hide();
            processFilterNewformatInfo(window.filters_newformat);
            $("#add_attendance")
                .click(function () {
                    processFilterNewformatInfo(window.filters_newformat);
                    hideSelectinGrid("ssn_atndnc_fclty_dept")
                })
            $("#edit_attendance")
                .click(function () {
                    processFilterNewformatInfo(window.filters_newformat);
                    hideSelectinGrid("ssn_atndnc_fclty_dept")
                })
            $("#add_attendance_top")
                .click(function () {
                    processFilterNewformatInfo(window.filters_newformat);
                    hideSelectinGrid("ssn_atndnc_fclty_dept")
                })
            $("#edit_attendance_top")
                .click(function () {
                    processFilterNewformatInfo(window.filters_newformat);
                    hideSelectinGrid("ssn_atndnc_fclty_dept")
                })


        }

        function hideSelectinGrid(select_id) {
            //////////////console.log($("#" + select_id +  " option").not(':eq(0)'))
            $("#" + select_id + " option")
                .not(':eq(0)')
                .remove();
            var numOfVisibleRows = $("#" + select_id)
                .each(function (i) {
                    if ($(this)
                        .find("option")
                        .filter(function () { return $(this)
                                .css('display') !== 'none'; })
                        .length == 1) {
                        $(this)
                            .parents("tr")
                            .hide()
                    } else {
                        $(this)
                            .parents("tr")
                            .show()
                    }
                })

        }


        function processCheckBoxField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input  required name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">* ' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input  required name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">* ' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="checkbox" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
        }

        function processRadioGroupField(question_detail,  grid_id) {
            console.log(question_detail);
                ////console.log(question_detail.question_type);
                
                var question_type = question_detail.field_type;
                var question_id = question_detail.object_varname;
                var choice_direction = question_detail.choice_direction;
                var question_prompt = question_detail.object_label;
                var section_id = question_detail.group_id;
                var is_header = false;
                    if (choice_direction == "V") {
                        if (!$("#scalelabel-" + section_id).length) {
                            var table_markup = "<table class='ui celled table' id = table-" + section_id + "><thead class = 'hide_when_mobile'><tr id = scalelabel-" + section_id + "></tr></thead><tbody id = tbody-" + section_id + "><tr role='radiogroup' aria-labelledby = tbody-" + section_id + " scope = 'row' id = scale-" + question_id + "></tr></tbody></table>"
                            is_header = true;
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        } else {
                            var table_markup = "<tr aria-label = tbody-" + section_id + " role='radiogroup' scope = 'row' id = scale-" + question_id + "></tr>"
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        }
                    } else {
                        if (!$("#scalelabel-" + section_id).length) {
                            var table_markup = "<table class='ui celled table' id = table-" + section_id + "><thead class = 'hide_when_mobile'><tr id = scalelabel-" + section_id + "></tr></thead><tbody id = tbody-" + section_id + "><tr role='radiogroup' aria-labelledby = tbody-" + section_id + " scope = 'row' id = scale-" + question_id + "></tr></tbody></table>"
                            is_header = true;
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        } else {
                            var table_markup = "<tr aria-label = tbody-" + section_id + " role='radiogroup' scope = 'row' id = scale-" + question_id + "></tr>"
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        }

                    }
                    //console.log(low_scale_text);
                    if (is_header) {
                        $(table_markup).appendTo($("#" +  grid_id));
                        $(thead_markup).appendTo($('#scale-' + question_id));
                    } else {
                        $(table_markup).appendTo($("#tbody-" + section_id));
                        $(thead_markup).appendTo($('#scale-' + question_id));
                    }
                    for (var j = 0; j < question_detail.options.length; j++) {
                        //console.log(question_prompt,thead_markup);
                        var option_prompt = question_detail.options[j].option_prompt;
                        var option_value = question_detail.options[j].option_value;
                        var option_name = question_detail.options[j].option_name;
                        if (option_prompt == "Neither Agree Nor Disagree") {
                            option_prompt = "Neutral";
                        }
                        var head_markup = '<th class = "one wide column"  scope="col">' + option_prompt + '</th>';
                        if (is_header) {
                            var empty_markup = '<th class = "nine wide column"></th>';
                            if (j == 0) {
                                $(empty_markup).appendTo($("#scalelabel-" + section_id));
                            }
                            if (option_prompt != "N/A") {
                                $(head_markup).appendTo($("#scalelabel-" + section_id));
                            }
                        }
                        var markup = '<td class = "one wide column"><label class="form-check-label custom_radio" for = "' + question_id + '_' + option_name + '"><span class = "show_when_mobile">' + option_prompt + '</span><input class = "icheck" type="radio" id = "' + question_id + '_' + option_name + '" name = "radio_' + question_id + '"><span class="checkmark"></span></label></td>';
                        if (option_prompt != "N/A") {
                            $(markup).appendTo($("#scale-" + question_id));
                        }
                    } //End for loop        

        }

        function processCheckboxGroupField(question_detail,  grid_id) {
            console.log(question_detail);
                ////console.log(question_detail.question_type);
                
                var question_type = question_detail.field_type;
                var question_id = question_detail.object_varname;
                var choice_direction = question_detail.choice_direction;
                var question_prompt = question_detail.object_label;
                var section_id = question_detail.group_id;
                var is_header = false;
                    if (choice_direction == "V") {
                        if (!$("#scalelabel-" + section_id).length) {
                            var table_markup = "<table class='ui celled table' id = table-" + section_id + "><thead class = 'hide_when_mobile'><tr id = scalelabel-" + section_id + "></tr></thead><tbody id = tbody-" + section_id + "><tr role='radiogroup' aria-labelledby = tbody-" + section_id + " scope = 'row' id = scale-" + question_id + "></tr></tbody></table>"
                            is_header = true;
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        } else {
                            var table_markup = "<tr aria-label = tbody-" + section_id + " role='radiogroup' scope = 'row' id = scale-" + question_id + "></tr>"
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        }
                    } else {
                        if (!$("#scalelabel-" + section_id).length) {
                            var table_markup = "<table class='ui celled table' id = table-" + section_id + "><thead class = 'hide_when_mobile'><tr id = scalelabel-" + section_id + "></tr></thead><tbody id = tbody-" + section_id + "><tr role='radiogroup' aria-labelledby = tbody-" + section_id + " scope = 'row' id = scale-" + question_id + "></tr></tbody></table>"
                            is_header = true;
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        } else {
                            var table_markup = "<tr aria-label = tbody-" + section_id + " role='radiogroup' scope = 'row' id = scale-" + question_id + "></tr>"
                            var thead_markup = '<th class = "nine wide column">' + question_prompt + '</th>';
                        }

                    }
                    //console.log(low_scale_text);
                    if (is_header) {
                        $(table_markup).appendTo($("#" +  grid_id));
                        $(thead_markup).appendTo($('#scale-' + question_id));
                    } else {
                        $(table_markup).appendTo($("#tbody-" + section_id));
                        $(thead_markup).appendTo($('#scale-' + question_id));
                    }
                    for (var j = 0; j < question_detail.options.length; j++) {
                        //console.log(question_prompt,thead_markup);
                        var option_prompt = question_detail.options[j].option_prompt;
                        var option_value = question_detail.options[j].option_value;
                        var option_name = question_detail.options[j].option_name;
                        if (option_prompt == "Neither Agree Nor Disagree") {
                            option_prompt = "Neutral";
                        }
                        var head_markup = '<th class = "one wide column"  scope="col">' + option_prompt + '</th>';
                        if (is_header) {
                            var empty_markup = '<th class = "nine wide column"></th>';
                            if (j == 0) {
                                $(empty_markup).appendTo($("#scalelabel-" + section_id));
                            }
                            if (option_prompt != "N/A") {
                                $(head_markup).appendTo($("#scalelabel-" + section_id));
                            }
                        }
                        var markup = '<td class = "one wide column"><label class="form-check-label custom_checkbox" for = "' + question_id + '_' + option_name + '"><span class = "show_when_mobile">' + option_prompt + '</span><input class = "icheck" type="checkbox" id = "' + question_id + '_' + option_name + '" name = "radio_' + question_id + '"><span class="checkmark"></span></label></td>';
                        if (option_prompt != "N/A") {
                            $(markup).appendTo($("#scale-" + question_id));
                        }
                    } //End for loop        

        }        


        function processRadioButtonField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input  required name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">* ' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input  required name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">* ' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<div class="ui checkbox ' + input_class + '">' +
                        '<input name = "' + field_varname + '" id = "' + field_varname + '" type="radio" >' +
                        '<label for = "' + field_varname + '" class="' + label_class + '">' + field_label + '</label>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;

        }


        function processEmailInputField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            var validation_url = field_detail.url;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }
            var input_field_html = "";

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "ui grid stackable two column field ">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "iui grid stackable two column field ">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "ui grid stackable two column field ">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"  min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
             $('<div id="email_validation"></div>').insertAfter("#" + field_varname);  

            $("#" + field_varname)
                .change(function () {
                    var input = ($("#" + field_varname)
                        .val())
                    var invalid = true;
                    var illegalCharacters = input.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                    if (illegalCharacters == null) {
                        //////////////console.log(illegalCharacters)
                        $("#email_validation").html('<div class="ui error show message"><div class="header">Email is not valid</div><ul class="list"><li>Email format is wrong.</li></ul></div>');
                        $("#" + field_varname)
                            .parent()
                            .addClass('error');
                        //$("#" + field_varname).closest(".column").removeClass('field');

                        invalid = true
                    } else {
                        $(window.location.href.indexOf("grant") > -1)
                            .each(function () {
                                //alert("Is grant form");
                                checkExistEmail(input, illegalCharacters, invalid, field_varname)
                            });
                    }
                })

            $(":input")
                .inputmask();

        }

        function checkExistEmail(email, illegalCharacters, invalid, field_varname) {
            ////////////////console.log(illegalCharacters)
            var url = "https://ws.countingopinions.com/check_account.php?username=GRNT&email=" + email
            $.getJSON(url, function (json) {
                ////////////////console.log(json);
                if (json.username.length) {
                    window.submitfield.user_id = "text";
                    $("#user_id")
                        .val(json.account_id);
                    $("#email_validation").html('<div class="ui success show message"><div class="header">Email is valid</div><ul class="list"><li>Email is already registered in our system.</li></ul></div>');   
                    return true;
                } else {
                    if (illegalCharacters == null) {
                        //////////////console.log(illegalCharacters)
                                $("#" + field_varname)
                                    .parent()
                                    .removeClass('error');
                                $("#" + field_varname)
                                    .parent()
                                    .addClass('success');
                        $("#email_validation").html('<div class="ui error show message"><div class="header">Email is not valid</div><ul class="list"><li>Email format is right but it does not exist.</li></ul></div>');
                        //$("#" + field_varname).closest(".column").removeClass('field');

                        invalid = true
                    } else {
                        ////////////////console.log(illegalCharacters)
                        var url = "//dev.countingopinions.com/ws/tunnel.php?getURL=" + encodeURIComponent("https://api.kickbox.io/v2/verify?email=" + email + "&apikey=f0a53326529f6dc27dd933926e68e52ad3a2801c55aacccb381b5c71729a88d8")
                        $.getJSON(url, function (json) {
                            ////////////////console.log(json);
                            if (json.result != "deliverable") {
                                $("#" + field_varname)
                                    .parent()
                                    .addClass('error');
                                $("#" + field_varname)
                                    .parent()
                                    .removeClass('success');
                                $("#email_validation").html('<div class="ui error show message"><div class="header">Email is not valid</div><ul class="list"><li>Email format is right but it does not exist.</li></ul></div>');
                            } else {
                                $("#" + field_varname)
                                    .parent()
                                    .removeClass('error');
                                $("#" + field_varname)
                                    .parent()
                                    .addClass('success');
                                $("#email_validation").html('<div class="ui success show message"><div class="header">Email is valid</div></div>');
                            }
                        });
                        invalid = false;
                    }
                    invalid = false;
                }
            });
            return false;
        }

        function processDateField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }
            var input_field_html = "";

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"  min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
            $("input[type=date]")
                .flatpickr();
            ////////////console.log($('#' + field_varname))
        }


        function processCheckRobotField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }

            var input_field_html = '<div class="g-recaptcha" id="rcaptcha"></div>';
            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
            var $captcha = $('#recaptcha');
            //onloadCallback()
            //reCaptch verified

            var captchaWidgetId = grecaptcha.render('rcaptcha', {
                'sitekey': '6LfFG0QUAAAAAE9uLzVGP7ez7nxS2QXyOHlnnWCD', // required
                'theme': 'light', // optional
                'callback': 'onloadCallback' // optional
            });

            var response = grecaptcha.getResponse(captchaWidgetId);
            console.log('g-recaptcha-response: ' + response);
            var verifyCallback = function (response) {
                console.log('g-recaptcha-response: ' + response);
            };
        }

        function processTextAreaField(field_detail, grid_id) {
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            var rows = field_detail.rows;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }
            var input_field_html = "";

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<textarea  required  rows = "' + rows + '" id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"></textarea>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<textarea  rows = "' + rows + '"    id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"></textarea>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "seven wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<textarea   rows = "' + rows + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' eight wide column"></textarea>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<textarea  rows = "' + rows + '"   required id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"></textarea>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<textarea   rows = "' + rows + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"></textarea>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<textarea   rows = "' + rows + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"></textarea>' +
                        '</div>';
                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;

        }


    function processRangeField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var step = field_detail.step;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            var data_type = field_detail.data_type;
            var prefix = field_detail.prefix;
            var postfix = field_detail.postfix;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }
            var input_field_html = "";

            if (grid_class) {
                if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div>' +
                        '<label class = "six wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<div id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column" ></div><input   min = "' + min + '" max = "' + max + '" type="number" class="form-control" id="rangeInput' + field_varname + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div>' +
                        '<label class = "six wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<div id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column" ></div><input   min = "' + min + '" max = "' + max + '"type="number" class="form-control" id="rangeInput' + field_varname + '"></div>' +
                        '</div>';
                }
            } else {
                if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div>' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<div id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column" ></div><input   min = "' + min + '" max = "' + max + '"type="number" class="form-control" id="rangeInput_' + field_varname + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div>' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<div id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column" ></div><input   min = "' + min + '" max = "' + max + '"type="number" class="form-control" id="rangeInput_' + field_varname + '"></div>' +
                        '</div>';
                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;
            SetMinAndMax("rangeInput_" + field_varname);  
            var $range = $("#" + field_varname), $input = $("#rangeInput_" + field_varname),instance;
             $range.ionRangeSlider({
                min: parseFloat(min),
                max: parseFloat(max),
                step: parseFloat(step),
                grid: true,
                postfix: postfix,
                keyboard: true,
                onStart: function (data) {
                    $input.val(data.from);
                },                
                onChange: function (data) {
                    //console.log($("#rangeInput_" + field_varname),data)
                    $input.val(data.from);
                }                
              });

            instance = $range.data("ionRangeSlider");

            $input.on("change keyup", function () {
                SetMinAndMax("rangeInput_" + field_varname);
                var val = $(this).prop("value");
                instance.update({
                    from: val
                });
            });
        }

        function processNormalInputField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_id = field_detail.field_id;
            var field_label = field_detail.object_label;
            var field_status = field_detail.load_status;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var edit_check = field_detail.edit_check;
            var grid_class = field_detail.object_class;
            var min = field_detail.min;
            var max = field_detail.max;
            var input_mask = "";
            var label_class = field_detail.label_class;
            var input_class = field_detail.input_class;
            var enable = field_detail.enable;
            if (field_detail.input_mask) {
                input_mask = field_detail.input_mask;
            }
            var input_field_html = "";

            if (grid_class) {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "ui grid stackable two column field ">' +
                        '<label class = "six wide column" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "' + grid_class + '" style = "display:none">' +
                        '<div class = "ui grid stackable two column field ">' +
                        '<label class = "six wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "' + grid_class + '">' +
                        '<div class = "ui grid stackable two column field ">' +
                        '<label class = "six wide column" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + field_type + ' nine wide column"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            } else {
                if (field_status != null && field_status == "required") {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">* ' + field_label + '</label>' +
                        '<input  required  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"  min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else if (field_status == "hide") {
                    input_field_html = '<div class = "column" style = "display:none">' +
                        '<div class = "inline field ui grid stackable ">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                } else {
                    input_field_html = '<div class = "column">' +
                        '<div class = "inline field ui grid stackable">' +
                        '<label class = "' + label_class + '" for = "' + field_varname + '">' + field_label + '</label>' +
                        '<input  data-inputmask="' + "'" + "mask" + "'" + ":" + "'" + input_mask + "'" + '" type = "' + field_type + '"  id = "' + field_varname + '" name = "' + field_varname + '" class = "' + input_class + '"   min = "' + min + '" max = "' + max + '"></div>' +
                        '</div>';
                }
            }

            $(input_field_html)
                .appendTo($("#" + grid_id)); //Append to normal sections;

            if (edit_check == ">start_time") {
                $("#" + field_varname)
                    .change(function () {
                        if ($("#" + field_varname)
                            .val() < $("#start_time")
                            .val()) {
                            $("#" + field_varname)
                                .val($("#start_time")
                                    .val());
                        }
                    })
            }
            if (edit_check == "<end_time") {
                $("#" + field_varname)
                    .change(function () {
                        if ($("#end_time")
                            .val()) {
                            if ($("#" + field_varname)
                                .val() > $("#end_time")
                                .val()) {
                                $("#" + field_varname)
                                    .val($("#end_time")
                                        .val());
                            }
                        }
                    })
            }

            $(":input")
                .inputmask();
            SetMinAndMax(field_varname);
        }

        function processSubmitField(field_detail, grid_id) {
            var section_id = field_detail.section_id;
            var field_prompt = field_detail.object_prompt;
            var button_icon = field_detail.button_icon;
            var field_type = field_detail.field_type;
            var field_varname = field_detail.object_varname;
            var object_class = field_detail.object_class;
            var button_class = field_detail.button_class;
            var markup = '<div class="' + object_class + '" >' +
                '<button type="' + field_type + '" class="' + button_class + '" name = "' + field_varname + '">' +
                '<i class="fa ' + button_icon + '"></i>' + field_prompt + '</button>' + '</div>';
            $(markup)
                .appendTo($("#" + grid_id));
        }

        function SetMinAndMax(field_varname) {
            $("#" + field_varname)
                .change(function () {
                    var max = parseInt($(this)
                        .prop('max'));
                    var min = parseInt($(this)
                        .prop('min'));
                    if ($(this)
                        .val() > max) {
                        $(this)
                            .val(max);
                    } else if ($(this)
                        .val() < min) {
                        $(this)
                            .val(min);
                    }
                });
        }




        function triggerMaximunRow(trigger_name, target_id) {
            $("[name='" + trigger_name + "']")
                .change(function () {
                    var rowNumber = $("[name='" + trigger_name + "']")
                        .val();

                    ////////////////////console.log($("#" + target_id).getGridParam('rowNum'))
                    $("#" + target_id)
                        .setGridParam({ rowNum: 3 })
                        .trigger("reloadGrid");

                })

            $('button.dropdownmenu')
                .prop('type', 'button');

            $("input.ui-pg-input")
                .css("width", "auto");
            $("input.ui-pg-input")
                .css("vertical-align", "baseline");

        }



        function triggerAllDay(trigger_name) {
            if (!isVis()) {
                $("[name='start_time']")
                    .filter(":visible")
                    .defaultValue = "09:00"
                $("[name='start_time']")
                    .val("09:00")
                    .trigger("change")
                $("[name='end_time']")
                    .filter(":visible")
                    .defaultValue = "17:00"
                $("[name='end_time']")
                    .val("17:00")
                    .trigger("change")
                $("[name='duration']")
                    .val("01:00")
                //////////console.log($("[name='start_time']").val())
            }
        }

        function triggerTotalStaff(trigger_name) {
            $("[name='" + trigger_name + "']")
                .change(function () {
                    var total_staff = $("[name='" + trigger_name + "']")
                        .val();
                    var staff_array = jQuery("[name='instructor_details']")
                        .jqGrid('getGridParam', 'data');
                    //////////////////console.log(staff_array)
                    if (staff_array.length == null || staff_array.length < total_staff) {
                        var count = (staff_array.length == null) ? 0 : staff_array.length
                        while (count < total_staff) {
                            staff_array.push({ Instructor_name: "" })
                            count++;
                        }
                    }
                    if (staff_array.length > total_staff) {
                        $('#delete_row_modal')
                            .modal("show");
                        $('#delete_yes_button')
                            .click(function () {
                                staff_array.splice(-1, staff_array.length - total_staff);
                                $("[name='instructor_details']")
                                    .jqGrid('setGridParam', { data: staff_array })
                                    .trigger('reloadGrid');
                                //////////////////console.log(staff_array)
                                $('#delete_row_modal')
                                    .modal("hide");
                            })
                        $('#delete_no_button')
                            .click(function () {
                                $('#delete_row_modal')
                                    .modal("hide");
                            })
                    }
                    $("[name='instructor_details']")
                        .jqGrid('setGridParam', { data: staff_array })
                        .trigger('reloadGrid');
                    ajustStyleJqgrid()

                })
        }

        function ajustStyleJqgrid() {
            $('button.dropdownmenu')
                .prop('type', 'button');
            $("input.ui-pg-input")
                .css("width", "auto");
            $("input.ui-pg-input")
                .css("vertical-align", "baseline");
        }

        function bindCalculate() {
            $("[name='start_time']")
                .change(function () {
                    ////////////////console.log(this)
                    autoCalculate(this)
                });
            $("[name='end_time']")
                .change(function () {
                    autoCalculate(this)
                });
            $("[name='duration']")
                .change(function () {
                    if ($("[name='start_time']")
                        .val()
                        .length && $("[name='start_time']")
                        .val() != null) {
                        CalculateEnd()
                    } else {
                        CalculateStart()
                    }
                })
        }


        function autoCalculate(start_time, end_time) {
            var startElement = $("#grid_start_time [name='start_time']");
            var endElement = $("#grid_start_time [name='end_time']");
            var valuestart = startElement.val();
            var valuestop = endElement.val();
            //create date format   
            var ms = moment(valuestop, "HH:mm a")
                .diff(moment(valuestart, "HH:mm a"));
            ////////////////console.log(msToTime(ms));    
            $("[name='duration']")
                .val(msToTime(ms));
        }


        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100)
                , seconds = parseInt((duration / 1000) % 60)
                , minutes = parseInt((duration / (1000 * 60)) % 60)
                , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return hours + ":" + minutes;
        }


        function CalculateEnd() {
            var startElement = $("#grid_start_time [name='start_time']");
            var endElement = $("#grid_start_time [name='end_time']");
            var durationElement = $("[name='duration']");
            var valuestart = startElement.val();
            var valuestop = endElement.val();
            var startValue = moment(valuestart, "HH:mm a")
            var hours = durationElement.val()
                .split(":")[0];
            var minutes = durationElement.val()
                .split(":")[1];

            var endVal = startValue.add(hours, 'hours');
            var endVal = endVal.add(minutes, 'minutes')
                .format('HH:mm');
            //////////////////console.log("endval: " + endVal)
            endElement.val(endVal);
        }

        function CalculateStart() {
            var startElement = $("#grid_start_time [name='start_time']");
            var endElement = $("#grid_start_time [name='end_time']");
            var durationElement = $("[name='duration']");
            var valuestart = startElement.val();
            var valuestop = endElement.val();
            var endValue = moment(valuestop, "HH:mm a")
            var hours = durationElement.val()
                .split(":")[0];
            var minutes = durationElement.val()
                .split(":")[1];

            var startVal = endValue.subtract(hours, 'hours');
            var startVal = startVal.subtract(minutes, 'minutes')
                .format('HH:mm');
            //////////////////console.log("startVal" + startVal);
            startElement.val(startVal);
        }



        function processFilterInfo(filters) {
            for (var i = 0; i < filters.length; i++) {
                var trigger_event = filters[i].trigger_event;
                ////////////////////console.log(trigger_event); 
                if (trigger_event == "onchange") {
                    processOnChangeEvent(filters[i]);
                }
                if (trigger_event == "is_vis") {
                    processEventIsvis(filters[i]);
                }
                if (trigger_event == "onchange_is_vis" && isVis()) {
                    processOnChangeEventIsvis(filters[i]); //Process onchange event         
                }
                if (trigger_event == "onchange_not_vis" && !isVis()) {
                    processOnChangeEventNotvis(filters[i]); //Process onchange event
                }
                if (trigger_event == "onclick") {
                    processOnClickEvent(filters[i]); //Process onclick event
                }
                if (trigger_event == "onchange_conditional") {
                    processOnChangeConditionalEvent(filters[i]); //Process onchange conditional event
                }
                if (trigger_event == "onchecked") {
                    processOnCheckedEvent(filters[i]); //Process onchecked conditional event
                }
                if (trigger_event == "onselect") {
                    processOnSelectEvent(filters[i])
                }
            }
        }

        function processOnChangeEvent(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');

            if (trigger_varname.includes("&")) { //Deal with multiple trigger
                var trigger_varname_array = trigger_varname.split("&");
                for (var i = 0; i < trigger_varname_array.length; i++) {
                    $('[name="' + trigger_varname_array[i] + '"]')
                        .change(function () {

                            if (result == 'show') {
                                $("#" + target_section)
                                    .show();
                            }
                            if (result == 'hide') {
                                $("#" + target_section)
                                    .hide();
                            }
                        });
                } //End of for loop
            }

            trigger_target.change(function () {
                if (result == 'show') {
                    $("#" + target_section)
                        .show();
                }
                if (result == 'hide') {
                    $("#" + target_section)
                        .hide();
                }
            });
        } //Process on change event


        function processEventIsvis(filter_detail) {
            var result = filter_detail.result;
            var trigger_varname = filter_detail.trigger_varname;
            var trigger_target = $('[name="' + trigger_varname + '"]');
            var targert_section = filter_detail.target_section;
            if (isVis()) {
                if (result == 'show') {
                    $("#" + targert_section)
                        .show();
                }
                if (result == 'hide') {
                    $("#" + targert_section)
                        .remove();
                }
            } else {
                ////console.log($("#" + targert_section))
                if (result == 'hide') {
                    $("#" + targert_section)
                        .show();
                }
                if (result == 'show') {
                    $("#" + targert_section)
                        .remove();
                }
            }
        }


        function processFilterNewformatInfo(filter_array) {
            for (var i = 0; i < filter_array.length; i++) {
                var pattern = filter_array[i]; //[ssn_atndnc_fclty_dept].CLSCS @ [ssn_atndnc_dvsn] == 'HUMS'
                var pattern_leftpart = pattern.split("@")[0].trim(); //[ssn_atndnc_fclty_dept].CLSCS
                var pattern_rightpart = pattern.split("@")[1].trim(); //[ssn_atndnc_dvsn] == 'HUMS'
                var pattern_target_question = debracket(pattern_leftpart.split(".")[0])[0]; //ssn_atndnc_fclty_dept
                var pattern_target_option = pattern_leftpart.split(".")[1]; //CLSCS
                if (pattern_rightpart.indexOf("||") >= 0) {
                    var pattern_rightpart_subpart = pattern_rightpart.split("||");
                    for (var j = 0; j < pattern_rightpart_subpart.length; j++) {
                        if (identifyCondition(pattern_rightpart_subpart[j])) {
                            ////////console.log(pattern_rightpart_subpart[j])
                            ////////console.log(pattern_target_option)
                            if (pattern_target_option == '[HIDE]') {
                                hideSelectinGrid(pattern_target_question)
                            }
                            $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                .show();
                            if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                .length) {
                                $("#" + pattern_target_question)
                                    .append(localStorage.getItem(pattern_target_option));
                            }
                            break;
                        }
                        if (j == pattern_rightpart_subpart.length - 1) {
                            //console.log(pattern_rightpart_subpart[j])
                            ////////console.log($("#" + pattern_target_question))
                            //console.log($("#ssn_atndnc_type").val())
                            $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                .hide();
                            $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                .remove();
                            //console.log($("#ssn_atndnc_type").val())
                            ////////console.log($("#" + pattern_target_question))
                            continue;
                        }

                    }
                } else if (pattern_rightpart.indexOf("&&") >= 0) {
                    var pattern_rightpart_subpart = pattern_rightpart.split("&&");
                    var flag = "on";
                    for (var j = 0; j < pattern_rightpart_subpart.length; j++) {
                        if (!identifyCondition(pattern_rightpart_subpart[j])) {
                            flag = "off"
                        }
                    }
                    if (flag == "on") {
                        //////////////console.log(pattern_target_option)
                        if (pattern_target_option == '[HIDE]') {
                            hideSelectinGrid(pattern_target_question)
                        }

                        if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .length) {
                            $("#" + pattern_target_question)
                                .append(localStorage.getItem(pattern_target_option));
                        }

                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .show();
                    } else {
                        //////////////console.log(pattern_target_option)
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .hide();
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .remove();
                    }
                } else if (pattern_rightpart.indexOf("!==") >= 0) {
                    var pattern_trigger_question = debracket(pattern_rightpart.split("!==")[0])[0];
                    var pattern_trigger_option = dequatation(pattern_rightpart.split("!==")[1]);
                    if ($("#" + pattern_trigger_question)
                        .val() != pattern_trigger_option) {
                        if (pattern_target_option == '[HIDE]') {
                            hideSelectinGrid(pattern_target_question)
                        }

                        //////////////console.log(pattern_target_option)
                        if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .length) {
                            $("#" + pattern_target_question)
                                .append(localStorage.getItem(pattern_target_option));
                        }

                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .show();
                    } else {
                        //////////////console.log(pattern_target_option)
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .hide();
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .remove();
                    }
                } else { // == condition
                    var pattern_trigger_question = debracket(pattern_rightpart.split("==")[0])[0];
                    var pattern_trigger_option = dequatation(pattern_rightpart.split("==")[1]);
                    //////////////console.log(pattern_target_question,pattern_target_option,pattern_trigger_question,pattern_trigger_option )
                    //////////////////console.log( pattern_trigger_question == "ssn_atndnc_dvsn");
                    //////////////////console.log($("#" + pattern_trigger_question));
                    //////////////////console.log(pattern_trigger_option);
                    if ($("#" + pattern_trigger_question)
                        .val() == pattern_trigger_option) {
                        //////////////console.log(pattern_target_option)
                        if (pattern_target_option == '[HIDE]') {
                            hideSelectinGrid(pattern_target_question)
                        }

                        if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .length) {
                            $("#" + pattern_target_question)
                                .append(localStorage.getItem(pattern_target_option));
                        }

                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .show();
                    } else {
                        //////////////console.log(pattern_target_question)
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .hide();
                        $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                            .remove();
                    }
                }
            } //End loop        
            var numOfVisibleRows = $('td select')
                .each(function (i) {
                    if ($(this)
                        .find("option")
                        .filter(function () { return $(this)
                                .css('display') !== 'none'; })
                        .length == 1) {
                        $(this)
                            .parents("tr")
                            .hide()
                    } else {
                        $(this)
                            .parents("tr")
                            .show()
                    }
                })

            var sample = "[ssn_atndnc_fclty_dept].CLSCS @ [ssn_atndnc_dvsn] == 'HUMS'";
            var sample_with_no = "[ssn_atndnc_type].EXT @ ( [ssn_atndnc_dvsn] !== 'HUMS' && [ssn_atndnc_dvsn] !== 'SOCSCI' && [ssn_atndnc_dvsn] !== 'MPLS' && [ssn_atndnc_dvsn] !== 'MEDSCI' && [ssn_atndnc_dvsn] !== 'MDIV' && [ssn_atndnc_dvsn] !== 'CONTED'"
            $("select")
                .change(function () {
                    //console.log($("#ssn_atndnc_type").val())
                    var option_val_temp = $(this)
                        .val();
                    for (var i = 0; i < filter_array.length; i++) {
                        $(this)
                            .val(option_val_temp);
                        var pattern = filter_array[i]; //[ssn_atndnc_fclty_dept].CLSCS @ [ssn_atndnc_dvsn] == 'HUMS'
                        var pattern_leftpart = pattern.split("@")[0].trim(); //[ssn_atndnc_fclty_dept].CLSCS
                        var pattern_rightpart = pattern.split("@")[1].trim(); //[ssn_atndnc_dvsn] == 'HUMS'
                        var pattern_target_question = debracket(pattern_leftpart.split(".")[0])[0]; //ssn_atndnc_fclty_dept
                        var pattern_target_option = pattern_leftpart.split(".")[1]; //CLSCS
                        //console.log(pattern)
                        //console.log($("#ssn_atndnc_type").val())
                        if (pattern_rightpart.indexOf("||") >= 0) {

                            var pattern_rightpart_subpart = pattern_rightpart.split("||");
                            for (var j = 0; j < pattern_rightpart_subpart.length; j++) {
                                ////////////console.log(pattern_rightpart_subpart[j])
                                if (identifyCondition(pattern_rightpart_subpart[j])) {
                                    ////console.log(pattern_rightpart_subpart[j])
                                    if (pattern_target_option == '[HIDE]') {
                                        hideSelectinGrid(pattern_target_question)
                                    }
                                    if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                        .length) {
                                        var temp_2 = $("#" + pattern_target_question)
                                            .val();
                                        //console.log($("#ssn_atndnc_type").val())
                                        $("#" + pattern_target_question)
                                            .append(localStorage.getItem(pattern_target_option));
                                        console.log($("#ssn_atndnc_type")
                                            .val())
                                        ////console.log($("#" + pattern_target_question + " option"))
                                        var sort_list = $("#" + pattern_target_question + " option");
                                        var new_list = [sort_list[0]];
                                        var full_list = JSON.parse(localStorage.getItem(pattern_target_question));
                                        var count = 0;
                                        ////////////console.log(full_list)
                                        for (var k = 0; k < full_list.length; k++) {
                                            if (full_list[k].option_value == pattern_target_option) {
                                                new_list.push(sort_list[count])
                                            }
                                            ////////////console.log(new_list)
                                            for (var l = count; l < sort_list.length; l++) {
                                                ////////////console.log($(sort_list[l]).val())
                                                if ($(sort_list[l])
                                                    .val() == full_list[k].option_value) {
                                                    new_list.push(sort_list[l])
                                                    count++;
                                                }
                                            }
                                        }
                                        ////////////console.log(new_list)
                                        console.log($("#ssn_atndnc_type")
                                            .val())
                                        $("#" + pattern_target_question)
                                            .empty();
                                        $("#" + pattern_target_question)
                                            .append(new_list);
                                        $("#" + pattern_target_question)
                                            .val(temp_2);
                                        console.log($("#ssn_atndnc_type")
                                            .val())
                                    }
                                    //////////////console.log($(this).val())
                                    $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                        .show();
                                    //////////////console.log($(this).val())
                                    break;
                                }
                                if (j == pattern_rightpart_subpart.length - 1) {
                                    console.log(pattern_rightpart_subpart[j])
                                    ////////console.log($("#" + pattern_target_question))
                                    console.log($("#ssn_atndnc_type")
                                        .val())
                                    $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                        .hide();
                                    $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                        .remove();
                                    console.log($("#ssn_atndnc_type")
                                        .val())
                                    ////////console.log($("#" + pattern_target_question))
                                    continue;
                                }
                                console.log($("#ssn_atndnc_type")
                                    .val(), pattern)
                            }
                        } else if (pattern_rightpart.indexOf("&&") >= 0) {
                            $(this)
                                .val(option_val_temp);
                            var pattern_rightpart_subpart = pattern_rightpart.split("&&");
                            var flag = "on";
                            for (var j = 0; j < pattern_rightpart_subpart.length; j++) {
                                if (!identifyCondition(pattern_rightpart_subpart[j])) {
                                    flag = "off"
                                }
                            }
                            if (flag == "on") {
                                //////////////console.log(pattern_target_option)
                                if (pattern_target_option == '[HIDE]') {
                                    hideSelectinGrid(pattern_target_question)
                                }

                                if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .length) {
                                    $("#" + pattern_target_question)
                                        .append(localStorage.getItem(pattern_target_option));
                                    var temp_2 = $("#" + pattern_target_question)
                                        .val();

                                    var sort_list = $("#" + pattern_target_question + " option");
                                    var new_list = [sort_list[0]];
                                    var full_list = JSON.parse(localStorage.getItem(pattern_target_question));
                                    var count = 0;
                                    ////////////console.log(full_list)
                                    for (var k = 0; k < full_list.length; k++) {
                                        if (full_list[k].option_value == pattern_target_option) {
                                            new_list.push(sort_list[count])
                                        }
                                        ////////////console.log(new_list)
                                        for (var l = count; l < sort_list.length; l++) {
                                            ////////////console.log($(sort_list[l]).val())
                                            if ($(sort_list[l])
                                                .val() == full_list[k].option_value) {
                                                new_list.push(sort_list[l])
                                                count++;
                                            }
                                        }
                                    }
                                    ////////////console.log(new_list)
                                    $("#" + pattern_target_question)
                                        .empty();
                                    $("#" + pattern_target_question)
                                        .append(new_list);
                                    $("#" + pattern_target_question)
                                        .val(temp_2);
                                }

                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .show();
                            } else {
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .hide();
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .remove();
                                //////////////console.log($("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"));

                            }
                            console.log($("#ssn_atndnc_type")
                                .val())

                        } else if (pattern_rightpart.indexOf("!==") >= 0) {
                            $(this)
                                .val(option_val_temp); //////////////console.log(pattern_rightpart)
                            var pattern_trigger_question = debracket(pattern_rightpart.split("!==")[0])[0];
                            var pattern_trigger_option = dequatation(pattern_rightpart.split("!==")[1]);
                            if ($("#" + pattern_trigger_question)
                                .val() != pattern_trigger_option) {
                                //////////////console.log(pattern_target_option)
                                if (pattern_target_option == '[HIDE]') {
                                    hideSelectinGrid(pattern_target_question)
                                }

                                if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .length) {
                                    $("#" + pattern_target_question)
                                        .append(localStorage.getItem(pattern_target_option));
                                    ////////////console.log($("#" + pattern_target_question + " option"))
                                    var temp_2 = $("#" + pattern_target_question)
                                        .val();

                                    var sort_list = $("#" + pattern_target_question + " option");
                                    var new_list = [sort_list[0]];
                                    var full_list = JSON.parse(localStorage.getItem(pattern_target_question));
                                    var count = 0;
                                    ////////////console.log(full_list)
                                    for (var k = 0; k < full_list.length; k++) {
                                        if (full_list[k].option_value == pattern_target_option) {
                                            new_list.push(sort_list[count])
                                        }
                                        ////////////console.log(new_list)
                                        for (var l = count; l < sort_list.length; l++) {
                                            ////////////console.log($(sort_list[l]).val())
                                            if ($(sort_list[l])
                                                .val() == full_list[k].option_value) {
                                                new_list.push(sort_list[l])
                                                count++;
                                            }
                                        }
                                    }
                                    ////////////console.log(new_list)
                                    $("#" + pattern_target_question)
                                        .empty();
                                    $("#" + pattern_target_question)
                                        .append(new_list);
                                    $("#" + pattern_target_question)
                                        .val(temp_2);
                                }

                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .show();
                            } else {
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .hide();
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .remove();
                                //////////////console.log($("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"));

                            }
                            ////////////console.log($("#ssn_atndnc_type").val())
                            console.log($("#ssn_atndnc_type")
                                .val())
                        } else { // == condition
                            $(this)
                                .val(option_val_temp);
                            var pattern_trigger_question = debracket(pattern_rightpart.split("==")[0])[0];
                            var pattern_trigger_option = dequatation(pattern_rightpart.split("==")[1]);
                            //console.log(pattern_target_question,pattern_target_option,pattern_trigger_question,pattern_trigger_option )
                            //console.log($("#" + pattern_trigger_question).val())
                            //console.log(pattern_trigger_option)
                            //console.log(pattern_target_option)
                            ////////////////////console.log( pattern_trigger_question == "ssn_atndnc_dvsn");
                            if ($("#" + pattern_trigger_question)
                                .val() == pattern_trigger_option) {
                                if (pattern_target_option == '[HIDE]') {
                                    hideSelectinGrid(pattern_target_question)
                                }

                                if (!$("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .length) {

                                    //console.log(pattern_target_option, $("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"))
                                    $("#" + pattern_target_question)
                                        .append(localStorage.getItem(pattern_target_option));
                                    ////////////console.log($("#" + pattern_target_question + " option"))
                                    var temp_2 = $("#" + pattern_target_question)
                                        .val();

                                    var sort_list = $("#" + pattern_target_question + " option");
                                    var new_list = [sort_list[0]];
                                    var full_list = JSON.parse(localStorage.getItem(pattern_target_question));
                                    var count = 0;
                                    ////////////console.log(full_list)
                                    for (var k = 0; k < full_list.length; k++) {
                                        if (full_list[k].option_value == pattern_target_option) {
                                            new_list.push(sort_list[count])
                                        }
                                        ////////////console.log(new_list)
                                        for (var l = count; l < sort_list.length; l++) {
                                            ////////////console.log($(sort_list[l]).val())
                                            if ($(sort_list[l])
                                                .val() == full_list[k].option_value) {
                                                new_list.push(sort_list[l])
                                                count++;
                                            }
                                        }
                                    }
                                    ////////////console.log(new_list)
                                    $("#" + pattern_target_question)
                                        .empty();
                                    $("#" + pattern_target_question)
                                        .append(new_list);
                                    $("#" + pattern_target_question)
                                        .val(temp_2);

                                    //////////////console.log($("#" + pattern_target_question), $("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"))
                                }
                                //////////////console.log($("#" + pattern_target_question), $("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"))

                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .show();
                            } else {
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .hide();
                                $("#" + pattern_target_question + " option[value='" + pattern_target_option + "']")
                                    .remove();
                                //////////////console.log($("#" + pattern_target_question + " option[value='" + pattern_target_option +"']"));
                                //////////////console.log(pattern_rightpart);
                                continue;
                            }
                            ////////////console.log($("#ssn_atndnc_type").val())
                            console.log($("#ssn_atndnc_type")
                                .val())
                        }
                    } //End loop    
                    var numOfVisibleRows = $('td select')
                        .each(function (i) {
                            if ($(this)
                                .find("option")
                                .filter(function () { return $(this)
                                        .css('display') !== 'none'; })
                                .length == 1) {
                                $(this)
                                    .parents("tr")
                                    .hide()
                            } else {
                                $(this)
                                    .parents("tr")
                                    .show()
                            }
                        })
                    //console.log($("#ssn_atndnc_type").val())
                    $(this)
                        .val(option_val_temp);
                    ////////////console.log($(this).val())

                })
        }


        function identifyCondition(pattern) {
            if (pattern.indexOf("!==") > 0) {
                //////////////console.log(pattern)
                var pattern_trigger_question = debracket(pattern.split("!==")[0])[0];
                var pattern_trigger_option = dequatation(pattern.split("!==")[1]);
                if ($("#" + pattern_trigger_question)
                    .val() != pattern_trigger_option) {
                    return true;
                } else {
                    return false;
                }
            } else { // == condition
                var pattern_trigger_question = debracket(pattern.split("==")[0])[0];
                var pattern_trigger_option = dequatation(pattern.split("==")[1]);
                ////////////////////console.log(pattern_target_question,pattern_target_option,pattern_trigger_question,pattern_trigger_option )
                ////////////////////console.log( pattern_trigger_question == "ssn_atndnc_dvsn");
                //////////////////console.log($("#" + pattern_trigger_question));
                //////////////////console.log(pattern_trigger_option);
                if ($("#" + pattern_trigger_question)
                    .val() == pattern_trigger_option) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        //extract the string between two square brackets
        function debracket(s) {
            var matches = [];
            var pattern = /\[(.*?)\]/g;
            var match;
            while ((match = pattern.exec(s)) != null) {
                matches.push(match[1]);
            }
            return matches;
        }

        //extract the string between two quatation marks
        function dequatation(s) {
            var matches = [];
            var pattern = /'(.*?)'/g;
            var match;
            while ((match = pattern.exec(s)) != null) {
                matches.push(match[1]);
            }
            return matches;
        }


        function processOnSelectEvent(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var trigger_option = filter_detail.trigger_option
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');
            var target_question = filter_detail.target_varname;
            trigger_target.change(function () {
                if ($(this)
                    .val() == trigger_option) {
                    if (result == 'show') {
                        $('[name="' + target_question + '"]')
                            .closest(".field")
                            .parent()
                            .show();
                    }
                    if (result == 'hide') {
                        $('[name="' + target_question + '"]')
                            .closest(".field")
                            .parent()
                            .hide();
                    }
                } //End of condition
                else {
                    if (result == 'hide') {
                        $('[name="' + target_question + '"]')
                            .closest(".field")
                            .parent()
                            .show();
                    }
                    if (result == 'show') {
                        $('[name="' + target_question + '"]')
                            .closest(".field")
                            .parent()
                            .hide();
                    }
                }
            })

        }

        function processOnChangeConditionalEvent(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');
            var target_question = filter_detail.target_question;
            var target_varname = filter_detail.target_varname;
            var condition = filter_detail.condition;
            if (trigger_varname.indexOf("&") >= 0) { //Deal with multiple trigger
                var trigger_varname_array = trigger_varname.split("&");
                for (var i = 0; i < trigger_varname_array.length; i++) {
                    $('[name="' + trigger_varname_array[i] + '"]')
                        .change(function () {

                            if (result == 'show') {
                                $("#" + target_section)
                                    .show();
                            }
                            if (result == 'hide') {
                                $("#" + target_section)
                                    .hide();
                            }
                        });
                } //End of for loop
            }

            trigger_target.change(function () {
                if (condition == "<today" && !isVis()) {
                    var date = new Date();
                    date.yyyymmdd();
                    if ($(this)
                        .val() <= date.yyyymmdd()) {
                        if (result == 'show') {
                            $("#" + target_section)
                                .show();
                        }
                        if (result == 'hide') {
                            $("#" + target_section)
                                .hide();
                        }
                    } //End of condition
                    else {
                        if (result == 'hide') {
                            $("#" + target_section)
                                .show();
                        }
                        if (result == 'show') {
                            $("#" + target_section)
                                .hide();
                        }
                    }
                } //End of <today
                if (condition == "=Series/Multipart") {
                    if ($(this)
                        .prop("checked") == true) {
                        if (result == 'show') {
                            $('[name="' + target_question + '"]')
                                .closest(".field")
                                .parent()
                                .show();
                        }
                        if (result == 'hide') {
                            $('[name="' + target_question + '"]')
                                .closest(".field")
                                .parent()
                                .hide();
                        }
                    } //End of condition
                    else {
                        if (result == 'hide') {
                            $('[name="' + target_question + '"]')
                                .closest(".field")
                                .parent()
                                .show();
                        }
                        if (result == 'show') {
                            $('[name="' + target_question + '"]')
                                .closest(".field")
                                .parent()
                                .hide();
                        }
                    }
                } //End of =Series/Multipart



            });




        } //Process on change event

        function processOnCheckedEvent(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');
            var target_question = filter_detail.target_varname;
            var target_section = filter_detail.target_section;
            trigger_target.change(function () {
                if (target_question) {
                    if ($(this)
                        .prop("checked") == true) {
                        if (result == "modal_show") {
                            if (window.dirtyFlag == true) {
                                $('#' + target_question)
                                    .modal("show");
                            }
                        }
                        if (result == 'show') {
                            $('[name="' + target_question + '"]')
                                .parents(".field")
                                .parent()
                                .show();
                        }
                        if (result == 'hide') {
                            //////////////////console.log($("#" + target_question))
                            $('[name="' + target_question + '"]')
                                .parents(".field")
                                .parent()
                                .hide();
                            $('[name="' + target_question + '"]')
                                .parents(".search")
                                .parent()
                                .parent()
                                .hide();
                        }
                    } //End of condition
                    else {
                        if (result == 'hide') {
                            //////////////////console.log($("#" + target_question))
                            $('[name="' + target_question + '"]')
                                .parents(".field")
                                .parent()
                                .show();
                            $('[name="' + target_question + '"]')
                                .parents(".search")
                                .parent()
                                .parent()
                                .show();
                        }
                        if (result == 'show') {
                            $('[name="' + target_question + '"]')
                                .parents(".field")
                                .parent()
                                .hide();
                        }
                    }
                }
                if (target_section) {
                    if ($(this)
                        .prop("checked") == true) {
                        if (result == 'show') {
                            $("#" + target_section)
                                .show();
                        }
                        if (result == 'hide') {
                            //////////////////console.log($("#" + target_question))
                            $("#" + target_section)
                                .hide();
                        }
                    } //End of condition
                    else {
                        if (result == 'hide') {
                            //////////////////console.log($("#" + target_question))
                            $("#" + target_section)
                                .show();
                        }
                        if (result == 'show') {
                            $("#" + target_section)
                                .hide();
                        }
                    }
                }
            });
        }

        function processOnChangeEventIsvis(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');

            if (trigger_varname.indexOf("&") >= 0) { //Deal with multiple trigger
                var trigger_varname_array = trigger_varname.split("&");
                for (var i = 0; i < trigger_varname_array.length; i++) {
                    $('[name="' + trigger_varname_array[i] + '"]')
                        .change(function () {
                            //alert(trigger_varname_array[i])
                            if (result == 'show') {
                                $("#" + target_section)
                                    .show();
                            }
                            if (result == 'hide') {
                                $("#" + target_section)
                                    .hide();
                            }
                        });
                } //End of for loop
            }

            trigger_target.change(function () {
                if (result == 'show') {
                    $("#" + target_section)
                        .show();
                }
                if (result == 'hide') {
                    $("#" + target_section)
                        .hide();
                }
            });
        }

        function processOnChangeEventNotvis(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');

            if (trigger_varname.indexOf("&") >= 0) { //Deal with multiple trigger
                var trigger_varname_array = trigger_varname.split("&");
                for (var i = 0; i < trigger_varname_array.length; i++) {
                    $('[name="' + trigger_varname_array[i] + '"]')
                        .change(function () {
                            //alert(trigger_varname_array[i])
                            if (result == 'show') {
                                $("#" + target_section)
                                    .show();
                            }
                            if (result == 'hide') {
                                $("#" + target_section)
                                    .hide();
                            }
                        });
                } //End of for loop
            }

            trigger_target.change(function () {
                if (result == 'show') {
                    $("#" + target_section)
                        .show();
                }
                if (result == 'hide') {
                    $("#" + target_section)
                        .hide();
                }
            });
        } //Process on change event

        function processOnClickEvent(filter_detail) {
            var trigger_varname = filter_detail.trigger_varname;
            var target_section = filter_detail.target_section;
            var result = filter_detail.result;
            var trigger_target = $('[name="' + trigger_varname + '"]');
            ////////////////////console.log(trigger_target)
            if (trigger_varname.indexOf("&") >= 0) { //Deal with multiple trigger
                var trigger_varname_array = trigger_varname.split("&");
                for (var i = 0; i < trigger_varname_array.length; i++) {
                    $('[name="' + trigger_varname_array[i] + '"]')
                        .change(function () {
                            if (result == 'show') {
                                $("#" + target_section)
                                    .show();
                                $(".combobox")
                                    .select2();
                            }
                            if (result == 'hide') {
                                $("#" + target_section)
                                    .hide();
                            }
                        });
                } //End of for loop
            }


            trigger_target.click(function () {
                if (result == 'show') {
                    $("#" + target_section)
                        .show();
                    $(".combobox")
                        .select2();
                }
                if (result == 'hide') {
                    $("#" + target_section)
                        .hide();
                }
            });
        } //Process on click event



        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear()
                , (mm > 9 ? '' : '0') + mm
                , (dd > 9 ? '' : '0') + dd
             ].join('-');
        };

        function All_input() {}
        All_input.prototype.init = function (state) {
            var ChangedFlag = false;
            var currState = null;
            self = this;
            state(self);
        }


        var All_input_States = {
            "add": function (input) {
                input.currState = "add";
                ////////////////////console.log(input.currState);
            }
            , "update": function (input) {
                input.currState = "update";
                ////////////////////console.log(input.currState);
            }
        };

        function resetForm(form_id) {
            $("#" + form_id)
                .on('reset', function (e) {
                    //////////////////console.log($("table"))
                    $("[name=instructor_details]")
                        .jqGrid("clearGridData")
                        .trigger('reloadGrid');
                    $("[name=instructor_details]")
                        .closest('section')
                        .hide();
                    $("[name=attendance]")
                        .jqGrid("clearGridData")
                        .trigger('reloadGrid');
                    $("[name=attendance]")
                        .closest('section')
                        .hide();
                    $('input:checkbox')
                        .removeAttr('checked');
                    $('select')
                        .dropdown("clear");
                    $('select')
                        .parent()
                        .find(".default.text")
                        .text("Choose one...")
                    //////////////console.log($('#section_submit_top'))
                    if (!isVis()) {
                        triggerAllDay();
                    }
                    $('#section_submit_top')
                        .hide();
                    $('#section_submit_bottom')
                        .hide();
                    ajustStyleJqgrid()
                    //////////////console.log($("[name='start_time']").filter(":visible"))
                    $("[name='start_time']")
                        .defaultValue = "09:00"
                    $("[name='end_time']")
                        .defaultValue = "17:00"
                    window.selectedBefore = false;
                    window.dirtyFlag = false;
                    window.saveMethod = null;
                    resetState();


                })
        }

        function ResetPeopleRegister() {
            $("[name = registration_booking]")
                .change(function () {
                    if (!$("[name = registration_booking]")
                        .prop("checked")) {
                        $("[name = people_registered]")
                            .val(0);
                    }
                })
        }


        /// Replaces commonly-used Windows 1252 encoded chars that do not exist in ASCII.
        var replaceWordChars = function (text) {
            var s = text;
            // smart single quotes and apostrophe
            s = s.replace(/[\u2018\u2019\u201A]/g, "\'");
            // smart double quotes
            s = s.replace(/[\u201C\u201D\u201E]/g, "\"");
            // ellipsis
            s = s.replace(/\u2026/g, "...");
            // dashes
            s = s.replace(/[\u2013\u2014]/g, "-");
            // circumflex
            s = s.replace(/\u02C6/g, "^");
            // open angle bracket
            s = s.replace(/\u2039/g, "<");
            // close angle bracket
            s = s.replace(/\u203A/g, ">");
            // spaces
            s = s.replace(/[\u02DC\u00A0]/g, " ");
            // fractions 1/2
            s = s.replace(/[\u00BC]/g, "1/2");
            // fractions 1/4
            s = s.replace(/[\u00BE]/g, "1/4");
            // fractions 3/4
            s = s.replace(/[\u00BD]/g, "3/4");
            // bullet
            s = s.replace(/[\u2022]/g, ". ");
            return s;
        }

        function submit(form_id) {
            var ls_id = getLsid();
            var sp_id = getSpid();
            var user_id = getUserid();


            $("#" + form_id)
                .on('submit', function (e) {
                    e.preventDefault();
                    var detail = {};
                    for (var key in window.submitfield) {
                        // skip loop if the property is from prototype
                        if (key == "library") {} else if (window.submitfield[key] == "checkbox") {
                            detail[key] = $("[name=" + key + "]")
                                .prop("checked");
                        } else if (window.submitfield[key] == "table") {
                            detail[key] = jQuery("[name=" + key + "]")
                                .jqGrid('getGridParam', 'data');
                            //////////////////console.log(detail[key])
                        } else if (key == "start_time" || key == "date") {
                            detail[key] = $("[name=" + key + "]")
                                .val();
                        } else {
                            if (key != "multipart_title" || key != "series_title") {
                                if ($("[name=" + key + "]")
                                    .val()) {
                                    var textvalue = $("[name=" + key + "]")
                                        .val()
                                        .replace(/(\r\n|\n|\r)/gm, "")
                                    detail[key] = textvalue;
                                } else {
                                    detail[key] = "";
                                }
                                console.log(textvalue)
                            }
                        }
                    }


                    //////////////console.log(detail);
                    ////////////////////console.log(data_passed); 

                    if (window.location.href.indexOf("confirm_email") > -1) {
                        ////////////console.log("is grant");
                        var grant_array = {};
                        var url = "grant_account.php";


                        grant_array = { ukey: getQueryVariable("ukey"), confirm_email: 1 }
                        //////////console.log(grant_array)
                        $.ajax({
                            type: "POST"
                            , url: url
                            , data: grant_array
                            , success: function (result) {
                                //////////console.log(result);
                                window.location.href = "/forms/form_viewer.html?name=thank_you";
                            }
                            , dataType: "json"
                        });
                    }



                    if (window.location.href.indexOf("grant") > -1) {
                        ////////////console.log("is grant");
                        var grant_array = {};
                        var url = "grant_account.php";

                        if (window.ls_id > 1) {
                            grant_array = { ls_id: window.ls_id, name: $("[name = name]")
                                    .val(), user_id: $("[name = user_id]")
                                    .val(), email: $("[name = email]")
                                    .val(), pi_collection_id: $("#grant_form option:selected")[0].dataset.picollectionid, ltype: $("[name = ltype]")
                                    .val(), is_test: getQueryVariable("is_test"), submittime_validation: 1 }
                        } else {
                            grant_array = { ls_id: window.ls_id, name: $("[name = name]")
                                    .val(), user_id: $("[name = user_id]")
                                    .val(), email: $("[name = email]")
                                    .val(), pi_collection_id: $("#grant_form option:selected")[0].dataset.picollectionid, ltype: $("[name = ltype]")
                                    .val(), country: $("[name = country]")
                                    .val(), state: $("[name = state]")
                                    .val(), city: $("[name = city]")
                                    .val(), postal_code: $("[name = postal_code]")
                                    .val(), address_1: $("[name = address_1]")
                                    .val(), address_2: $("[name = address_2]")
                                    .val(), is_test: getQueryVariable("is_test"), submittime_validation: 1 }
                        }
                        //////////console.log(grant_array)
                        var google_url = "https://www.google.com/recaptcha/api/siteverify?secret=6LfFG0QUAAAAAMq0g_AyrSTzib8y9WIbTlQPQpTg&response=03AA7ASh0rwW9sb9dQtLFi2JiQY3sh0F7eNeSmpumUb9C2yHCV8IOxnm5JnJ6n6nwHsV1_vlm5y7qOA3tASv1wbXyyPBs2huK_Qq0rOpVFsyne8oO-w0eKeW_NDEOEjJOvaacD5WyzFIcvaKy-09NvQy_Nqyu7PkyZ86Il-fK45L88cSgWdhSRnIsaI5GyqZFCJV1y1mEnCJB41V_4L5YUGYtu1HBJXOiL2O9vxf4dvFfJk4mBDdJZt-1QYhRprLFoXhx1rXA2pwVA6sBS2E-vnegNZo4k7LDUMlSziE5uO8JsXGo0SS9C82KuHtzwI2OIa845Bk3EbqlC7PWpbOclK1Bb2xJC6ognh5XP7gF3RYeFrSHt3CXjhqo5u7Rpvs8RQmj9G5-2mDzYeeEXV3JNKImaLhG5bHbzXflEb5RZhLIsaqp9UsAbT7hafjsF_dbR8n9wu4-4QNcl0UygpYOxI0HN490Ry7EYWOayEy81hzKZLbJx0y_dFrM82Fq7kKLpGIbfH9pFo-wPFd4CNWhL6LL8e5ytE2Wp828sz9nAhpm88YxA3BDRQj15QKB-gFUGi6nZARy0wx9-";
                        $.ajax({
                            type: "POST"
                            , url: google_url
                            , data: ""
                            , success: function (result) {
                                console.log(result);
                                 $.ajax({
                                    type: "POST"
                                    , url: url
                                    , data: grant_array
                                    , success: function (result) {
                                        //////////console.log(result);
                                        window.location.href = "/forms/form_viewer.html?name=thank_you";
                                    }
                                    , dataType: "json"
                                });                               
                            }
                            , dataType: "json"
                        });


                    }

                    if (window.location.href.indexOf("oxford") > -1) {
                        if ($("[name = new_series]")
                            .prop("checked")) {
                            window.saveMethod = "add_new_series"
                            detail = {};
                            detail.session_title = $("[name= session_title]")
                                .val();
                            detail.session_type = $("[name= session_type]")
                                .val();
                            detail.series = true;
                            detail.new_series = true;
                        }

                        if ($("[name = new_multipart]")
                            .prop("checked")) {
                            if ($("[name = series]")
                                .prop("checked") && $("[name = multipart]")
                                .prop("checked")) {
                                window.savedMethod = "add_new_multipart_to_series";
                                detail = {};
                                detail.session_title = $("[name= session_title]")
                                    .val();
                                detail.session_type = $("[name= session_type]")
                                    .val();
                                detail.series = true;
                                detail.multipart = true;
                                detail.new_multipart = true;
                                detail.multipart_inside_series_new = true;
                            } else {
                                window.saveMethod = "add_new_multipart";
                                detail = {};
                                detail.session_title = $("[name= session_title]")
                                    .val();
                                detail.session_type = $("[name= session_type]")
                                    .val();
                                detail.multipart = true;
                                detail.new_multipart = true;
                            }
                        }


                        //////////////////console.log(detail);          
                        if (window.saveMethod == "add_new_series" || window.saveMethod == "add_new_multipart") {
                            var session_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&session_id";
                            var schedule_id_url = ""
                            var session_id_request = $.ajax(session_id_url);
                            var schedule_id_request = "";

                            if (detail.date) {
                                var schedule_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&schedule_id";
                                var schedule_id_request = $.ajax(schedule_id_url);
                                Promise.all([session_id_request, schedule_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = results[1].id;
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }

                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: detail_array
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } else { //End detail start time
                                Promise.all([session_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = null
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }
                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } //End not detail start time   
                        } //End of if add new series
                        else if (window.saveMethod == "update_session") { //If update                   
                            var session_id = window.session_id;
                            var parent_session_id = window.parent_session_id;
                            var schedule_id = window.schedule_id;
                            var json = JSON.stringify(detail)
                            var updated_url = ""
                            var keys = JSON.stringify({ session_id: session_id, parent_session_id: parent_session_id, schedule_id: schedule_id });
                            var id = window.id;
                            var detail_array = JSON.stringify(detail);
                            detail_array = encodeURIComponent(detail_array)
                            if (detail.date && schedule_id == null) {
                                var schedule_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&schedule_id";
                                var schedule_id_request = $.ajax(schedule_id_url);
                                Promise.all([schedule_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        schedule_id = results[0].id;
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: parent_session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }

                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                               
                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } else {
                                var keys = JSON.stringify({ session_id: session_id, parent_session_id: parent_session_id, schedule_id: schedule_id });
                                var data = "jsondata=" + detail_array;
                                var update_url = "";
                                if (detail.is_test) {
                                   update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                } else {
                                   update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                }
                                console.log(data)
                                $.ajax({
                                    url: update_url
                                    , type: "POST"
                                    , data: data
                                    , contentType: "application/json; charset=utf-8"
                                    , dataType: "json"
                                    , success: function (data, textStatus, jqXHR) {
                                        alert("submitted");
                                        $("#" + form_id)[0].reset();
                                        var json = JSON.stringify(data);
                                        window.dirtyFlag = false;
                                        ////////////////////console.log(json);
                                    }
                                    , error: function (xhr, ajaxOptions, thrownError) {
                                        console.log(xhr);
                                        alert(thrownError);
                                    }

                                }); //End of put                                            
                            }
                        } else if (window.savedMethod == "add_new_multipart_to_series") {
                            var session_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&session_id";
                            var schedule_id_url = ""
                            var session_id_request = $.ajax(session_id_url);
                            var schedule_id_request = "";

                            if (detail.date) {
                                var schedule_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&schedule_id";
                                var schedule_id_request = $.ajax(schedule_id_url);
                                Promise.all([session_id_request, schedule_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = results[1].id;
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: window.series_session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }
                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                console.log(data);
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } else { //End detail start time
                                Promise.all([session_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = null
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: window.series_session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }
                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } //End not detail start time                       
                        } else if (window.saveMethod = "add_session") {
                            var session_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&session_id";
                            var schedule_id_url = ""
                            var parent_session_id = "";
                            var session_id_request = $.ajax(session_id_url);
                            var schedule_id_request = "";
                            if (window.parent_session_id) {
                                parent_session_id = window.parent_session_id;
                            } //End if window.parent_session_id
                            else if (window.series_session_id && window.multipart_session_id) {
                                parent_session_id = window.multipart_session_id;
                            } else if (window.series_session_id) {
                                parent_session_id = window.series_parent_session_id;
                            } else if (window.multipart_session_id) {
                                parent_session_id = window.multipart_parent_session_id;
                            } else {
                                parent_session_id = null;
                            }

                            if (detail.date) {
                                var schedule_id_url = "/ws/formdata/get_formdata_id.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&schedule_id";
                                var schedule_id_request = $.ajax(schedule_id_url);
                                Promise.all([session_id_request, schedule_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = results[1].id;
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: parent_session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }
                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;
                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }

                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } else { //End detail start time
                                Promise.all([session_id_request])
                                    .then(function (results) {
                                        // Both promises resolved
                                        var session_id = results[0].id;
                                        var schedule_id = null
                                        var detail_array = JSON.stringify(detail);
                                        detail_array = encodeURIComponent(detail_array)
                                        var keys = JSON.stringify({ session_id: session_id, parent_session_id: parent_session_id, schedule_id: schedule_id });
                                        var data = "jsondata=" + detail_array;
                                        var update_url = "";
                                        if (detail.is_test) {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys + "&is_test=" + detail.is_test;
                                        } else {
                                           update_url = "/ws/formdata/update_formdata.php?ls_id=" + ls_id + "&sp_id=" + sp_id + "&user_id=" + user_id + "&form_id=100" + "&keys=" + keys;
                                        }
                                        ////////////////////console.log(update_url)
                                        $.ajax({
                                            url: update_url
                                            , type: "POST"
                                            , data: data
                                            , contentType: "application/json; charset=utf-8"
                                            , dataType: "json"
                                            , success: function (data, textStatus, jqXHR) {
                                                alert("submitted");
                                                //////////////console.log("reset")
                                                $("#" + form_id)[0].reset();
                                                var json = JSON.stringify(data);
                                                window.dirtyFlag = false;

                                                ////////////////////console.log(json);
                                            }
                                            , error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }
                                        }); //End of put                            

                                    })
                                    .catch(function (error) {
                                        // One or more promises was rejected
                                    });
                            } //End not detail start time                       
                        } else { // It is adding a series
                            alert("Please create a series/multi-part programme first or choosing an existing one!")
                        }
                    }



                    // avoid to execute the actual submit of the form.
                    return false;
                });
        }

        function includes(container, value) {
            var returnValue = false;
            var pos = container.indexOf(value);
            if (pos >= 0) {
                returnValue = true;
            }
            return returnValue;
        }

        function resetState() {
            window.changedBefore = false;
            window.selectedBefore = false;
        }


        function compareOptionSequence(a, b) {
            return parseInt(a.sequence, 10) - parseInt(b.sequence, 10);
        }

    });
