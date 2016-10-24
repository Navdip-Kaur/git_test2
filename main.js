var petApp = {};

//when the page loads
//request from the API for data

petApp.getPet = function(query1,query2){
	$.ajax({
		url:'http://api.petfinder.com/pet.find',
		method:'GET',
		dataType: 'jsonp',
		data:{
			key:'ee724dc036b81f86771f9f063b54c263',
			format:'json',
			location: 'Toronto, ON',
			animal:query1,
			size:query2
			
		}
	})
	.then(function(petResults){
		// console.log(petResults.petfinder.pets.pet);

		
        petApp.displayPet(petResults.petfinder);
        petApp.filterSize(petResults.petfinder.pets.pet);
	     
	});
};


  petApp.displayPet = function(pet){
	// console.log('display Pet:',pet);
	$('#pets').empty();
 

    
	var petList = pet.pets.pet;

	   petList.forEach(function(pet){
		// console.log(pet);
          var $petContainer = $('<div>').addClass("flex");
	     var $petName = $('<h6>').text("Name: " + pet.name.$t);
	     var $petAge = $('<h6>').text("Age: " + pet.age.$t);
         var $petSize =$('<h6>').text("Size: " + pet.size.$t);
         var $petCity =$('<h6>').text("City: " + pet.contact.city.$t);
         var $petPhone =$('<h6>').text("Contact: " + pet.contact.phone.$t);
          var $petZip =$('<h6>').text("Zip: " + pet.contact.zip.$t);
		 var $petImage = $('<img>').attr({
			src: pet.media.photos.photo[2].$t,
	
		  });
	        // console.log($petImage);
	        $petContainer.append($petImage,$petName,$petAge,$petSize,$petCity,$petPhone,$petZip);
	        $('#pets').append($petContainer);
	});

  };	

    
	   petApp.init = function(){
		// console.log('working');
		petApp.getPet();
		$(".container").hide();


		$('form').on('submit', function(e){
			e.preventDefault();
			// console.log('Form submitted');
			var searchQuery1 = $('#animal').val();
			var searchQuery2 = $('#size').val();
			var searchQuery3 = $('#location').val();
	         
			 console.log(searchQuery1);
			  console.log(searchQuery2);
			   // console.log(searchQuery3);

			petApp.getPet(searchQuery1,searchQuery2,searchQuery3);
	        
	         var $formInput = $('#animal');
	         var toDoItem = $formInput.val();
	          $formInput.val('');
	           if(toDoItem !=='') {
	           }

	          var $form = $('#size');
	         var Item = $form.val();
	          $form.val('');
	           if(Item !=='') {
	           }

			$(".container").show();
		});
	};


	petApp.filterSize = function(data) {
		console.log("filter size", data)
		var size = data.size
		// console.log(data);

		for(item in data){
			console.log(data[item])
		}    
	  
	}


	$(document).ready(function(){
	  petApp.init();
	});





	







