var _trEdit = null;

$(document).on('click','#btn-phancong', function(){
    _trEdit = $(this).closest('tr');
    var _id = $(_trEdit).find('td:eq(0)').text();
    var tendetai =$(_trEdit).find('td:eq(1)').text();
    if(confirm("Are you sure to Accept?")){
        $.ajax({
            url: '/users/admin/phancongpbien',
            method: 'POST',
            data: {mdt: _id,
            tendetai:tendetai},
            success: function(data){
                console.log('Phan cong phan bien thanh cong!\n' + data);
            }
        });
    }
});

$(document).on('click','#btn-exports', function(){
    _trEdit = $(this).closest('tr');
    var _id = $(_trEdit).find('td:eq(0)').text();
    var tendetai =$(_trEdit).find('td:eq(1)').text();
    if(confirm("Are you sure to Exports?")){
        $.ajax({
            url: '/users/admin/exporttodoc',
            method: 'POST',
            data: {mdt: _id,
                    tendetai: tendetai},
            success: function(data){
                console.log('Exports to doc thanh cong!\n' + data);
            }
        });
    }
});
