"use strict";

$(document).ready(() => {	
	$("#gettext").on('click', getText);
	let output = '';
	
	function getText() {
		fetch('docs/fetch.txt')
		.then( res => res.json() )
		.then( post => output = `					
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-body">	
								<div class="flexit">
									<div class="pull-left media">
										<img class="img-responsive" src="https://cdn1.iconfinder.com/data/icons/toolbar-signs/512/person-512.png" alt="...">
									</div>
									
									<div class="pull-right"><a href="#">${ post.id }</a> </div>
								</div>
								<center>
									<h4>${ post.title }</h4>
								</center>
								<p>${ post.body }</p>
							</div>				
						</div>
					</div>
				` )
		.then( getJson() )		
		.catch( err => console.log(` There was an error in fetching the API: ${err}`) );
	} 
	
	function getJson() {
		$("#loader").addClass("loader");
		fetch('https://jsonplaceholder.typicode.com/posts')
		.then( res => res.json() )
		.then( data => { 
			$("#loader").removeClass("loader");						
			data.forEach( post => {
				output += `					
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-body">	
								<div class="flexit">
									<div class="pull-left media">
										<img class="img-responsive" src="https://cdn1.iconfinder.com/data/icons/toolbar-signs/512/person-512.png" alt="...">
									</div>
									
									<div class="pull-right"><a href="#">${ post.id }</a> </div>
								</div>
								<center>
									<h4>${ post.title }</h4>
								</center>
								<p>${ post.body }</p>
							</div>				
						</div>
					</div>
				`;
			})
			$("#msgid").html(output); 
		})
		.catch( err => console.log(` There was an error in fetching the API: ${err}`) );
	}
	
	
});