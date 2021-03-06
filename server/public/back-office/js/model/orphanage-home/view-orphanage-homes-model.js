
function viewOrphanageHomesPageModel() {

    var model = {};


    model.initDataTable = function () {


        $('#DataTables_Table_0').DataTable({

            "processing": true,
            "serverSide": true,
            "destroy": true,
            "headers": createAuthorizationTokenHeader(),
            "ajax": {
                "url": "/api/back-office/orphanage-home/view/query",
                "data": function ( data ) {
                    //process data before sent to server.
                },

                dataFilter: function(reps) {
                    console.log(reps);
                    return reps;
                },
                error:function(err){
                    console.log(err);
                }
            },
            "columns": [
                { "data": "name", "name" : "Name" , "title" : "Name"},
                { "data": "noOfChildren", "name" : "ID", "Children count" : "Children count"  },
                { "data": "mobile", "name" : "Mobile", "title" : "Mobile"  },
                { "data": "needs.length", "name" : "Needs", "title" : "Needs"  },
                { "class":"",
                    "orderable": false,
                    "data": "detail",
                    "render": function ( data, type, full, meta ) {

                        var actionhtml='<div><button id="deleteBtn" style="margin: auto; display: inline-block; background-color: darkorange "  type="button" class="btn purple-gradient btn-sm" >' + 'Delete' + '</button> ' +
                            '<button id="viewBtn" style="margin: auto; display: inline-block; background-color: lightskyblue "  type="button" class="btn purple-gradient btn-sm ml-2" >' + 'View' + '</button>' +
                            '<button id="updateBtn" style="margin: auto; display: inline-block; background-color: mediumpurple "  type="button" class="btn purple-gradient btn-sm ml-2" >' + 'Update' + '</button>' +
                            '</div>';
                        return actionhtml;

                }},

            ]

        } );

        $('#DataTables_Table_0 tbody').on('click', '#deleteBtn', function (){

            var $row = $(this).closest('tr');

            var data =  $('#DataTables_Table_0').DataTable().row($row).data();

            console.log(data);

            $.confirm({
                title: 'Delete Orphanage!',
                content: 'Are you sure you want to delete ' + data.name + ' orphanage ?',
                buttons: {
                    Yes: function () {

                        deleteData("/api/back-office/orphanage-home/delete/" + data._id,function (isSuccessful, response) {

                            if(isSuccessful) {

                                if (response.isSuccessful) {

                                    $row.remove();

                                    toast("success", response.responseMessage, 5000);

                                } else {

                                    toast("error", response.responseMessage, 5000);
                                }

                            }else{

                                toast("error", "Oops! and error occurred", 5000);
                            }

                        });
                    },
                    No: {
                        text: 'No', // With spaces and symbols
                        action: function () {

                        }
                    }
                }
            });

        });

        $('#DataTables_Table_0 tbody').on('click', '#updateBtn', function (){

            var $row = $(this).closest('tr');

            var data =  $('#DataTables_Table_0').DataTable().row($row).data();

            window.location.href = "#/update/orphanage-home/" + data._id;

            console.log(data._id)

            // showSuccessfulAlert('Detail', 'Your profile has been successfully updated!');

        });



    };

    return model;
}