$('#huy-detai').on('click',function (e) {
    if (confirm('Hủy đề tài này') == true){
        $.post('/users/sinhvien/huydetai',function (data) {
            if(data.success){

                console.log("Da gui yeu cau xoa de tai");

            }
        });
    }
})