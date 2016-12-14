var express = require('express');
var con 	= require('../../utils/sqlhelper');
var mailerhoso  = require('../../utils/mail-nhacnhonophoso');
var mailerbaocao= require('../../utils/mail-nhacnhonopbaocao');

module.exports = function (app) {
	// body...
	app.get('/users/admin/nhacnho',function (req,res) {
		// body...
		con.query('SELECT * FROM detai',function (err,result) {
			// body...
			if (err) { 
				throw err;
			}

			for(var i=0;i<result.length;i++){
				if (result[i].nopHoSoChua!=1) {
					res.send('MSV:'+ result[i].nguoiHoc_MSSV+' chua nop ho so');
					con.query('SELECT * FROM nguoihoc WHERE MSSV=?',result[i].nguoiHoc_MSSV,function (err,kq) {
						// body...
						if (err) {
							throw err;
						}

						console.log(kq[0]);
						mailerhoso.mailTo(kq[0],function (err,info) {
							// body...
							if (err) { throw err} else{
								console.log('Message sent:'+info.response);
							}
						})
					})

				} else{
					if (result[i].nopQuyenChua==1 && result[i].duocBaoVeKhong==1) {
						if (result[i].document!=1) {
							res.send('MSV '+result[i].nguoiHoc_MSSV+' chua nop bao cao'+'</br>');
							console.log('chua nop bao cao');
							con.query('SELECT * FROM nguoihoc WHERE MSSV=?',result[i].nguoiHoc_MSSV,function (err,kq) {
						// body...
						if (err) {
							throw err;
						}

						console.log(kq[0]);
						mailerbaocao.mailTo(kq[0],function (err,info) {
							// body...
							if (err) { throw err} else{
								console.log('Message sent:'+info.response);
							}
						})
					})
						}
					}
				}
			}
		})
	})
}