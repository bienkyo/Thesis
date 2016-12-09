$(function () {
    $('#btn-add').click(function () {
        var msv = $('input[name="msv"]').val();
        var _tr = '<tr><td>'+ msv +'</td> <td>'+'Duoc dang ky de tai'+'</td> 	<td><button type="button" class="btn btn-success btn-edit">Edit </button> | <button type="button" class="btn btn-danger btn-delete">Delete </button></td></tr>';

        $('tbody').append(_tr);

        $.ajax({
            url:'/users/admin/adddkdetai',
            method:'POST',
            data: {msv: msv},
            success: function(data){
                console.log('add sv dkde tai thanh cong!\n' + data);
            }
        })
    })
    var _trEdit = null;
    $(document).on('click', '.btn-edit',function(){
        _trEdit = $(this).closest('tr');
        var _id = $(_trEdit).find('td:eq(0)').text();

        $('input[name="msv"]').val(_id);

    });

    $('#btn-update').click(function(){
        if(_trEdit){
            var _id = $('input[name="msv"]').val();
            $(_trEdit).find('td:eq(0)').text(_id);
            alert("Record has been updated!");
            _trEdit = null;

            $.ajax({
                url:'/users/admin/editdkdetai',
                method:'POST',
                data: {msv: _id},
                success: function(data){
                    console.log('add sv dkde tai thanh cong!\n' + data);
                }
            })
        }
    });

    $(document).on('click','.btn-delete', function(){
        _trEdit = $(this).closest('tr');
        var _id = $(_trEdit).find('td:eq(0)').text();
        if(confirm("Are you sure to delete?")){
            $(this).closest('tr').remove();

            $.ajax({
                url:'/users/admin/deletedkdetai',
                method:'POST',
                data: {msv: _id},
                success: function(data){
                    console.log('delete dkde tai thanh cong!\n' + data);
                }
            })
        }
    });
})