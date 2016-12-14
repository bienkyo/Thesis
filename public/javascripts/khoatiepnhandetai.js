var _trEdit = null;

$(document).on('click','#btn-chapnhan', function(){
    _trEdit = $(this).closest('tr');
    var _id = $(_trEdit).find('td:eq(0)').text();
    if(confirm("Are you sure to Accept?")){
        $.ajax({
            url: '/users/admin/tiepnhanbaove',
            method: 'POST',
            data: {msv: _id},
            success: function(data){
                console.log('Chap nhan de tai duoc bao ve thanh cong!\n' + data);
            }
        });
        $(this).closest('tr').remove();

    }
});