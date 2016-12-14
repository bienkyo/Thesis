var TableDatatablesEditable = function () {

    var handleTable = function () {

        var table = $('#table-hoidong');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js).
            // So when dropdowns used the scrollable div should be removed.
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "ajax": "/users/admin/hoidong.json",
            "columns": [
                {"data": "id"},
                {"data": "tenNguoiDung"},
                {"data": "ten"},
                {"data": "ghiChu"}
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
                "targets": [4],
                "defaultContent": '<div class="text-center"> <button type="button" class="btn btn-icon-toggle delete" data-toggle="tooltip" data-placement="top" data-original-title="Xóa"><i class="fa fa-trash-o"></i></button> </div>'

            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        $('#form-hoidong').on('submit', function (e) {
                e.preventDefault();
                console.log('Hello');
                $.ajax({
                    type: 'POST',
                    url: '/users/admin/hoidong.json',
                    data: $(this).serialize(),
                    dataType: 'json'
                }).done(function (data) {
                        if (data.success) {
                            // var aiNew = oTable.fnAddData({
                            //     id: data.data.id,
                            //     tenNguoiDung: data.data.tenNguoiDung,
                            //     ten: data.data.ten,
                            //     ghiChu: data.data.ghiChu
                            // });
                            oTable.api().ajax.reload();
                        }
                    }
                );

            }
        )
        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            var aData = oTable.fnGetData(nRow);
            $.ajax({
                url: '/users/admin/hoidong.json/' + aData.id,
                type: 'DELETE',

            }).done(function (data) {
                console.log(data);
                if (data.success) {
                    oTable.fnDeleteRow(nRow);
                    toastr.info('Deleted');
                } else {
                    toastr.error('Delete error: ');
                    console.log('Delete fail ' + data.error);
                }
            }).fail(function (data, status) {
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

}
();

jQuery(document).ready(function () {
    TableDatatablesEditable.init();
});

