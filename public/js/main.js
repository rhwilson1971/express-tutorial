$(document).ready(function(){
	console.log('hi')
	$('.deletePrayer').on('click', deletePrayer);
});

function deletePrayer(){

	var confirmation = confirm('Aure you syre?');

	if (confirmation) {


		$.ajax ({
			type: 'DELETE',
			url: '/prayers/delete/' + $(this).data('id')
		}).done(function(response){
			window.location.replace('/flop');
		});

	} else {
		return false;
	}
}