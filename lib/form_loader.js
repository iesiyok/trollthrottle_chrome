
// function retrieve_gpk(){
// 	return new Promise((resolve) => {

// 		const url = chrome.runtime.getURL('data/gpk.json');
// 		fetch(url)
// 			.then((response) => response.json()) 
// 			.then((json) => resolve(json));

// 	});
// }

gpk_seed = 1542564187;
epoch = "20190627";
nv 	= "F8FFE55B3FB844752E275EAA0AD6F94E53149B2D1AFE21DF2620A4A30B714A3\n1C717240FF9C60618A32F4A86685DB47995058E670BA129570D302BF07F2BC\n\n";


$(document).ready(function(){

	var pfc ;
	var gpk_ptr;
	
	// gpk_str_prom = retrieve_gpk();

	// gpk_str_prom.then(gpk_str => {

	// 	pfc = Module.pfc_setup();
	// 	gpk_ptr = Module.gpk_setup(gpk_seed, pfc);
	// });

	pfc = Module.pfc_setup();
	gpk_ptr = Module.gpk_setup(gpk_seed, pfc);

	$("#form_4").hide();
	$("#form_5").hide();

	const reddit_wrap = new snoowrap({user_agent: 'commenter', client_id: 'WYSd1e6Nsmp3Bg', client_secret: 'oakaUhyOBh5pCnIH1IUhUwYPgxA', username : 'trollthrottle', password : 'Q1u2a3l4i5.f6y7'  });


	chrome.storage.sync.get({user_name:"undefined", dk:"", A:"", x:"", ts: "-1"}, function(user) {

		if(user.user_name == 'undefined'){
					$("#form_1").html('You don\'t have cookies. Please register first..');
				    $("#form_3").hide();
		}else{

			if (Math.floor(Date.now() / 1000) - user.ts > 240){//4 mins 
					chrome.storage.sync.clear();
					console.log("Storage cleaned..");
					$("#form_1").html('You don\'t have cookies. Please register first..');
				    $("#form_3").hide();
			}else{

					$("#form_1").html("<img src=\"img/cookie.png\" alt=\"cookie\"><p>You have cookies </p>");
					$("#form_2").hide();

			}
					
		}


	});


	// chrome.cookies.get({ url: issuer_ip, name: 'cred' },
	//   		function (cookie) {
	// 			    if (cookie) {

	// 			      $("#form_1").html("<img src=\"img/cookie.png\" alt=\"cookie\"><p>You have cookies </p>");
	// 			      $("#form_2").hide();
	// 			    }
	// 			    else {
				      
	// 			      $("#form_1").html('You don\'t have cookies. Please register first..');
	// 			      $("#form_3").hide();
	// 			    }
	// });

		
	$("#ident_create").submit(function(e) {

		e.preventDefault();

		var u_name = $("#username").val();
		var pwd = $("#password").val();
		
		if(u_name == '' || pwd == ''){
			alert("Please put username and password!");
		}else{

     		var salt = CryptoJS.lib.WordArray.random(128/8);

        	var derived_key = CryptoJS.PBKDF2(pwd, salt, { keySize: 64/16, iterations: 1000 });//512/32 had problems with running on browser

            let bd = faker.date.between('1959-01-01', '2000-12-31').toISOString().substring(0,10);


            async.waterfall([


	            	function(callback){

	     //        		var url = issuer_ip + '/group/join_demo';
	     //        		j_login = JSON.stringify({'t_login' : u_name});

	     //        		var xhr = new XMLHttpRequest();
	     //        		xhr.open("POST", url, true);
	     //        		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

	     //        		xhr.onload = function () {
						// 	var res = JSON.parse(xhr.responseText);
						// 	if (xhr.readyState == 4 && xhr.status == "200" && res.code == '1' ) {
						
						// 		callback(null, res.ni)
								
						// 	} else {
						// 		console.error(res.status);
						// 	}
						// }
						// xhr.send(j_login);

						var ni = Module.create_nonce(pfc);
						// alert(ni.toString('ascii'));

						// alert(ni);

						callback(null, ni);


	            	},function(ni, callback){


	            		var m1 = Module.user_join_protocol(derived_key.toString(CryptoJS.enc.Hex), ni, gpk_ptr, pfc);

	            		console.log("m1::", m1);

	            		callback(null, m1);

	            	},function(m1, callback){

	     //        		var m1p = new Object();
						// m1p.bytes_F = F; 
						// m1p.bytes_c = c; 
						// m1p.bytes_sf = sf;
						// m1p.bytes_ni = ni;
						// m1p.bytes_sk = '';
						// m1p.bytes_dk = '';

						var cre = Module.issuer_join_verify(m1, pfc, gpk_ptr);//issuer verifying and sending credentials {A,x}

						console.log("cre::", cre);

						// callback(null, F, cre.bytes_A, cre.bytes_x);



	     //        	},function(F, A, x, callback){


	            		// var url = issuer_ip + '/group/join_check_demo';
	            		// j_login = JSON.stringify({'t_login' : u_name , 
						         //        'F' : F, 
						         //        // 'sk' : sk, 
						         //        'c' : c, 
						         //        'ni' : ni, 
						         //        'sf' : sf });

	      //       		j_login = JSON.stringify({"F": "FF83ED066BF6DE72ED1909929F1D3B77D32ACE3C9F0734DEBE720FA3D2CCF33\nFBDB77FEC36313744C964C66FB9B0CC0D9D83603321596AFC26BEC8BC09B833\n\n",
							// 	"c": "179403168BE1333EC0B4A62C1F27162B89D319D6B7FF7458BA3BD8BBFCB2E408",
							// 	"sf": "4566A3250C8FFD36199D4885DBF54B5D2449728CB6693A8CC8B3C158B641E69",
							// 	"ni": "AD67A70419145C8E06840B9873E1C1ACC10F00993060A36AE50A5C60C272C6B2"});

	      //       		var xhr = new XMLHttpRequest();
	      //       		xhr.open("POST", url, true);
	      //       		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

	      //       		xhr.onload = function () {
							// var res = JSON.parse(xhr.responseText);
							// if (xhr.readyState == 4 && xhr.status == "200" && res.code == '1' ) {


							// 	console.log("res::", res);
								var m2p = new Object();
								m2p.bytes_F = m1.bytes_F; 
								m2p.bytes_x = cre.bytes_x; 
								m2p.bytes_A = cre.bytes_A;

								// console.log("m2p::", m2p);
								
								r = Module.user_join_verify(m2p, gpk_ptr, pfc);

								console.log("r::", r);

								if (r == 1){
									console.log('User account has been created');
									// chrome.storage.sync.set({ 'derived_key': derived_key.toString(CryptoJS.enc.Hex)}, function(){
									// 	console.log('Derived key has been stored');
									// });
									// chrome.storage.sync.set({ 'seq': '0'});

									chrome.storage.sync.set({user_name: u_name, dk: derived_key.toString(CryptoJS.enc.Hex), A: cre.bytes_A, x: cre.bytes_x, ts: Math.floor(Date.now() / 1000) }, function(){
										console.log('User information has been stored');
									});
									chrome.storage.sync.set({seq: '0' }, function(){});

									
									$("#form_1").html("<img src=\"img/cookie.png\" alt=\"cookie\"><p>User account created: [" + u_name + "]. You have cookies</p>");
									$("#form_2").find("input[type=text], input[type=password], textarea").val("");
									$("#form_2").hide();
									$("#form_3").show();
								}else{
									console.log('user account cannot be created');
									$("#form_1").html('User account couldn\'t be created..You don\'t have cookies. Please register first..');
									$("#form_2").find("input[type=text], input[type=password], textarea").val("");
				      				$("#form_3").hide();
								}

								
							} 
						// }
						// xhr.onreadystatechange = function (oEvent) {

						// 	if (xhr.readyState != 4 || xhr.status != 200) {

						// 		$("#form_1").html('User account couldn\'t be created : [' + u_name +'], status:[' + xhr.status + '], You don\'t have cookies. Please register first..');
						// 		$("#form_2").find("input[type=text], input[type=password], textarea").val("");
				  //     			$("#form_3").hide();

						// 	} 

						// };
						// xhr.send(j_login);

	            	// }


				



            	],function (err, result) {
          			

          			
		    

		    });



		}
		
	});	

	$("#comment_create").submit(function(e) {

		e.preventDefault();

		var u_comment = $("#comment").val();
		const snoowrap = window.snoowrap;

		if(u_comment == '' ){
			alert("Please enter comment!");
		}else{

			async.waterfall([

					function(callback){

						var seq_n = 0;

						chrome.storage.sync.get({seq: "0"}, function (val) {
						    seq_n = parseInt(val.seq) + 1;
						    
						    chrome.storage.sync.get({user_name:"undefined", dk:"", A:"", x:"", ts: "-1"}, function(user) {

						      	// var seq_n = parseInt(user.seq) + 1;
						      	var domain = epoch + "_" + seq_n.toString();

						      	let h = sodium.crypto_generichash(64, sodium.from_string(u_comment));

						      	var m3p = new Object();
								m3p.bytes_f = sodium.to_hex(user.dk);
								m3p.bytes_x = user.x; 
								m3p.bytes_A = user.A;
								m3p.domain = domain;
								m3p.comment = sodium.to_hex(h);
								m3p.bytes_nv = nv;

								console.log("m3p:", m3p);

								var signature = Module.user_sign(m3p, gpk_ptr, pfc);

								console.log("signature:", signature);
								callback(null, signature, m3p.comment, domain, seq_n);

							});



						});
						

						

					},function(signature, h_c, domain, seq_n, callback){

						var code = Module.verifier_verify(gpk_ptr, pfc, signature, nv, h_c, domain, epoch);

						console.log("Result::", code);

						if(code == 0){
							console.log("Signature verified, nym::", signature.bytes_K);
							chrome.storage.sync.set({ seq: seq_n }, function(){
									console.log('Sequence number increase');
							});
							str = u_comment;

							reddit_wrap.getSubmission('ervowu').reply(str);
							$("#form_4").show();
							$("#form_5").hide();

							console.log("Comment will be published");
						}else{
							if(code > 1){
								// console.log('Error occured:', res.status);
							  	str = "["+u_comment+"](/spoiler)";
							  	reddit_wrap.getSubmission('ervowu').reply(str);
							  	$("#form_4").hide();
								$("#form_5").show();
								console.log("Comment limit has been passed::", code);
							}else{
								console.log("There is something wrong with the library::", code);
							}
							
						}
						$("#form_3").find("input[type=text], input[type=password], textarea").val("");

					}
				], function (err, result) {

			});

			
								


			// async.waterfall([

			// 	function(callback){


			// 		async.parallel({

			// 				web_key: function(callback){

			// 						const url = chrome.runtime.getURL('data/keys.json');
			// 						fetch(url)
			// 					    	.then((response) => response.json()) 
			// 					    	.then((json) => callback(null, json));

			// 				},
			// 				verifier_bot_nonce: function(callback){


			// 						// const url = website_ip + '/verifier/nonce';

			// 	     //        		const xhr = new XMLHttpRequest();
			// 						// xhr.open('GET', url, true);

			// 						// xhr.onload = function(e) {
			// 						//   var res = JSON.parse(xhr.responseText);
			// 						//   if (xhr.readyState == 4 && xhr.status == 200 && res.code == '1' ) { 

			// 						//   			callback(null, res.nv);
									    	
			// 						//   }else{
			// 						//   	console.log('Error occured:', this.status);
			// 						//   }
			// 						// };
			// 						// xhr.send();
			// 						nv 	= "F8FFE55B3FB844752E275EAA0AD6F94E53149B2D1AFE21DF2620A4A30B714A3\n1C717240FF9C60618A32F4A86685DB47995058E670BA129570D302BF07F2BC\n\n";
			// 						callback(null, nv);

			// 				},
			// 				buffers: function(callback){

			// 					chrome.storage.sync.get(['derived_key'], function(der_key) {
			// 				      	chrome.cookies.get({ url: issuer_ip, name: 'cred' }, function (cookie) {
											    
			// 							if(cookie){

			// 								chrome.storage.sync.get(['seq'], function(seq_obj){


			// 										cookie = decodeURIComponent(cookie.value.toString());
													
			// 								      	var xx = JSON.parse(cookie);
			// 								      	var A = xx.A;
			// 								      	var x = xx.x;
			// 								      	var epoch = "20180528";
			// 								      	var seq_n = parseInt(seq_obj.seq) + 1;
			// 								      	var domain = epoch + "_" + seq_n.toString();

			// 								      	let h = sodium.crypto_generichash(64, sodium.from_string(u_comment));

			// 								      	var m3p = new Object();
			// 										m3p.bytes_f = sodium.to_hex(der_key.derived_key);
			// 										m3p.bytes_x = x; 
			// 										m3p.bytes_A = A;
			// 										m3p.domain = domain;
			// 										m3p.comment = sodium.to_hex(h);
			// 										callback(null, m3p, seq_n);

			// 								});



			// 							}else{
			// 								console.log("cookie doesn't exist, something went wrong");
			// 							}


			// 						});
							      	

			// 				    });
			// 				}



			// 			},function(err, results){


			// 				web_key = results.web_key.ver_bot_public_key;
			// 				self_private_key = results.web_key.self_private_key;
			// 				self_public_key = results.web_key.self_public_key;
			// 				nv = results.verifier_bot_nonce;
			// 				m3p = results.buffers[0];
			// 				seq_n = results.buffers[1];
			// 				m3p.bytes_nv = nv;


			// 				var signature = Module.user_sign(m3p, gpk_ptr, pfc);


			// 				callback(null, signature, nv, m3p.comment, m3p.domain, seq_n, web_key, self_private_key, self_public_key );



			//         	});


			// 	},function(sig_res, nv, b_hc, domain, seq_n, web_key, self_private_key, self_public_key, callback){


			// 			async.parallel({

			// 				send2website: function(callback){

			// 						const url = website_ip + '/verifier/save_comment';

			// 						j_m = JSON.stringify({ 'topic_id' : '1', 'comment' : u_comment, 'nv' : nv });

			// 	            		const xhr = new XMLHttpRequest();
			// 						xhr.open('POST', url, true);
									
			// 						xhr.onload = function(e) {
			// 						  var res = JSON.parse(xhr.responseText);
			// 						  if (xhr.readyState == 4 && xhr.status == 200 && res.code == '1' ) { 

			// 						  			callback(null, res.id);
									    	
			// 						  }else{
			// 						  	console.log('Error occured:', xhr.status);
			// 						  }
			// 						};
			// 						xhr.send(j_m);



			// 				},
			// 				prepare_ledger_data: function(callback){


			// 					daaSign = JSON.stringify({'B': sig_res.bytes_B, 'K': sig_res.bytes_K, 'T': sig_res.bytes_T, 'c': sig_res.bytes_c, 
   //                  			'nt': sig_res.bytes_nt, 'sf': sig_res.bytes_sf, 'sx': sig_res.bytes_sx, 'sa': sig_res.bytes_sa, 'sb': sig_res.bytes_sb, 'b_hc': b_hc});


   //                  			r = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
   //                  			W = 'website.org';

   //                  			m1 = JSON.stringify({  'daaSign'   : daaSign, 'r' : r.toString(CryptoJS.enc.Hex)});

   //                  			nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

   //                  			b_m1 = sodium.crypto_box_easy(m1.toString('base64'), nonce, sodium.from_hex(web_key), sodium.from_hex(self_private_key ));


   //                  			j_n = JSON.stringify({ 'topic_id' : '1', 'aenc' : sodium.to_hex(b_m1), 
	  //                               'h_c' : b_hc, 
	  //                               'W' : W, 'dom' : domain, 
	  //                               'nv' : nv, 'pk' : self_public_key,
	  //                               'nonce' : sodium.to_hex(nonce), 'nym' : sig_res.bytes_K  });
   //                  			callback(null, j_n);


			// 				}

			// 			},function(err, res){

			// 				callback(null, res.prepare_ledger_data, res.send2website, seq_n);

			// 			});

			// 	},function(j_x, id, seq_n, callback){
			// 		x = JSON.parse(j_x);



   //                	x.id = id;

   //                	j_x = JSON.stringify(x);
   //                	const url = ledger_ip + '/save_comment';

   //                	const xhr = new XMLHttpRequest();
			// 		xhr.open('POST', url, true);
			// 		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
			// 		// xhr.responseType = 'json';
			// 		console.log(url);
			// 		xhr.onload = function() {

			// 		  var res = JSON.parse(xhr.responseText);
			// 		  if (xhr.readyState == 4 && xhr.status == 200 && res.code == '1' ) { 

					  			

			// 					chrome.storage.sync.set({ 'seq': seq_n});

			// 					str = u_comment;

			// 					reddit_wrap.getSubmission('a7ri88').reply(str);
			// 					$("#form_4").show();
			// 					$("#form_5").hide();

			// 					console.log("Comment will be published");


					    	
			// 		  }else{

			// 				  	console.log('Error occured:', res.status);
			// 				  	str = "["+u_comment+"](/spoiler)";
			// 				  	reddit_wrap.getSubmission('a7ri88').reply(str);
			// 				  	$("#form_4").hide();
			// 					$("#form_5").show();

			// 		  }
					
			// 		  $("#form_3").find("input[type=text], input[type=password], textarea").val("");
				      	

			// 		};
			// 		xhr.send(j_x);



			// 	}

			// ],function (err, result) {
   //        		console.log(err);
		 //      }
		 //    );	

			

			

		}



	});
		
}); 