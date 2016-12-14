var TableDatatablesEditable = function () {

    var handleTable = function () {

        var table = $('#table-request');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js).
            // So when dropdowns used the scrollable div should be removed.
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "ajax": "/users/admin/detaichoduyet",
            "columns": [
                {"data": "ID"},
                {"data": "tenDeTai"},
                {"data": "nguoiHoc_MSSV"},
                {"data": "giangVien_ID"},
                {"data": "yeuCau"}
            ],

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            //"pageLength": 5,

            // "language": {
            //     "lengthMenu": "_MENU_ bản ghi"
            // },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }, {
                "data": null,
                "targets": [5],
                "defaultContent": '<div class="text-right"><button type="button" class="btn btn-icon-toggle accept" data-toggle="tooltip" data-placement="top" data-original-title="Chấp nhận"><i class="fa fa-check"></i></button> <button type="button" class="btn btn-icon-toggle export" data-toggle="tooltip" data-placement="top" data-original-title="Xuất đề nghị"><i class="fa fa-file-word-o"></i></button> <button type="button" class="btn btn-icon-toggle reject" data-toggle="tooltip" data-placement="top" data-original-title="Từ chối"><i class="fa fa-trash-o"></i></button> </div>'

            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });


        table.on('click', '.reject', function (e) {
            e.preventDefault();

            if (confirm("Từ chối yêu cầu này?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            var aData = oTable.fnGetData(nRow);
            $.ajax({
                url: '/users/admin/detaichoduyet/reject/' + aData.ID,
                type: 'POST',

            }).done(function(data) {
                console.log(data);
                if (data.success) {
                    oTable.fnDeleteRow(nRow);
                    toastr.info('Deleted');
                }else {
                    toastr.error('Delete error: ' + data.error);
                    console.log('Delete fail ' + data.error);
                }
            }).fail(function(data, status) {
                toastr.error('Delete error');
                console.log('Delete fail');
            });
        });
        table.on('click', '.export', function (e) {


            var nRow = $(this).parents('tr')[0];
            var aData = oTable.fnGetData(nRow);
            var url = 'http://localhost:3000/users/admin/export?type=0&id=' + aData.ID;
            window.open(url,'_blank');
        });

        table.on('click', '.accept', function (e) {
            e.preventDefault();

            var nRow = $(this).parents('tr')[0];
            // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            var aData = oTable.fnGetData(nRow);
            $.ajax({
                url: '/users/admin/detaichoduyet/accept/' + aData.ID,
                type: 'POST',

            }).done(function(data) {
                console.log(data);
                if (data.success) {
                    oTable.fnDeleteRow(nRow);
                    toastr.info('Deleted');
                }else {
                    toastr.error('Delete error: ' + data.error);
                    console.log('Delete fail ' + data.error);
                }
            }).fail(function(data, status) {
                toastr.error('Delete error');
                console.log('Delete fail');
            });
        });

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();

jQuery(document).ready(function () {
    TableDatatablesEditable.init();
});
