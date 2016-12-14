var _trEdit = null;

$(document).on('click','#btn-chapnhan', function(){
    _trEdit = $(this).closest('tr');
    var _id = $(_trEdit).find('td:eq(2)').text();
    if(confirm("Are you sure to Accept?")){
        $.ajax({
            url: '/users/giangvien/chapnhandetai',
            method: 'POST',
            data: {mdt: _id},
            success: function(data){
                console.log('Chap nhan de tai thanh cong!\n' + data);
            }
        });
        $(this).closest('tr').remove();

    }
});

$(document).on('click','#btn-huybo', function(){
    _trEdit = $(this).closest('tr');
    var _id = $(_trEdit).find('td:eq(2)').text();
    if(confirm("Are you sure to Cancel?")){
        $.ajax({
            url: '/users/giangvien/huybodetai',
            method: 'POST',
            data: {mdt: _id},
            success: function(data){
                console.log('Xoa de tai thanh cong!\n' + data);
            }
        });
        $(this).closest('tr').remove();

    }
});
