var name = getQueryVariable('name') || 'Anononymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	console.log('New meassage:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>')
	$message.append('<p>' + message.text + '</p>');
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	//remove contents of the input field. sender et empty input afsted
	
	$message.val('');	

});