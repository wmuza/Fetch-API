"use strict";

$(document).ready(() => {	
	$("#gettext").on('click', getText);
	let output = '';
	
	/*
	We define the status function which checks the response.status and returns the result of Promise.resolve() 
	or Promise.reject(), which return a resolved or rejected Promise. This is the first method called in our fetch() 
	chain, if it resolves, we then call our json() method which again returns a Promise from the response.json() call. 
	After this we have an object of the parsed JSON. If the parsing fails the Promise is rejected and the catch statement 
	executes.
	*/
	
	function status(response) {
	  if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	  } else {
		return Promise.reject(new Error(response.statusText))
	  }
	}

	function json(response) {
	  return response.json()
	}
	
	
	
	
	function getText() {
		fetch('docs/fetch.txt')
		.then(status)
		.then(json)
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
		.then(status)
		.then(json)
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