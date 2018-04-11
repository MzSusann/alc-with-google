
var contacts = [

{
	id: 1,
	name:"Susan Onukogu",
	phone_num: 08075354633,
	email:"susano@gmail.com" 
},

{
	id: 2,
	name:"Nancy Onukogu",
	phone_num: 08145533653,
	email:"nancyo@gmail.com"
},

{
	id: 3,
	name:"Amaka Onukogu",
	phone_num: 08048736337,
	email:"amakao@gmail.com"
},

{
	id: 4,
	name:"Emeka Onukogu",
	phone_num: 08035836339,
	email:"emekao@gmail.com" 
},

]



/**********************************
ADD CONTACTS
***********************************/

var tableBody = document.getElementById("tbody");


function loadContacts(myArray){



	tableBody.innerHTML="";

			myArray.forEach(function(contact) {
			var newRow = tableBody.insertRow(-1);
			//the newRow represents a <tr></tr>
			newRow.id= contact.id;
            newRow.style.cursor="pointer"; 

			var idCell = newRow.insertCell(0); 
			var nameCell = newRow.insertCell(1);
			var phoneCell = newRow.insertCell(2);
			var emailCell = newRow.insertCell(3);

			idCell.appendChild(document.createTextNode(contact.id));
			nameCell.appendChild(document.createTextNode(contact.name));
			phoneCell.appendChild(document.createTextNode(contact.phone_num));
			emailCell.appendChild(document.createTextNode(contact.email));


		}); 
	}

window.onload = loadContacts(contacts);

var form = document.getElementById("form"); //Select the form using the id
var updateform = document.getElementById("updateForm"); //Select the form using the id

var addContact = function(event){ //create function
	event.preventDefault();

	var newcontact = 

		{
			id: contacts.length +1,
			name: form.elements[0].value, //get value of the element in array
			phone_num: form.elements[1].value,
			email: form.elements[2].value
		}

		
		//clear out the form
		form.elements[0].value ="";
		form.elements[1].value ="";
		form.elements[2].value ="";

		contacts.push(newcontact);
		loadContacts(contacts);
		
			
	}




form.addEventListener("submit", addContact); //attaching an event listener to the submit button on the form





/**********************************
SEARCH AND DISPLAY CONTACTS
***********************************/



function mySearch() {

	var input = document.getElementById("contactSearch");
    var searchword = input.value.toUpperCase();

    //now we would run a search for anyword that matches what they typed
  	//and put it in a variable called searchResults

    var searchResults = contacts.filter(function(contact){
    					return contact.name.toUpperCase().includes(searchword);
    				}); 
    // now  lets console log what we get first
    loadContacts(searchResults);
}




/**********************************
SEARCH AND EDIT CONTACTS
***********************************/

var updateform = document.getElementById('updateForm');
var tablebody = document.getElementById('tbody');

tablebody.addEventListener('click',function clickCell(event) {
                var targetId = event.target.parentNode.id;
                var fullContact = contacts.filter(function(contact){
                  return targetId == contact.id; 
                });
                updateform.elements[0].value=fullContact[0].name;
                updateform.elements[1].value=fullContact[0].phone_num;
                updateform.elements[2].value=fullContact[0].email;
                updateform.setAttribute('userid',fullContact[0].id);
                updateform.style="display:block";
                form.style="display:none";

            })


//When contact is selected, the Add Contact button is changed to Update Contact

 updateform.addEventListener('submit', function(event){
                event.preventDefault();
                var userid = updateform.getAttribute('userid');
                contacts.forEach(function(contact, index){
                    if(userid == contact.id){
                        contacts[index].name= updateform.elements[0].value;
                        contacts[index].phone_num= updateform.elements[1].value;
                        contacts[index].email= updateform.elements[2].value;
                    }
                });


 //cleanup the edit contact form and hide it.
                updateform.elements[0].value="";
                updateform.elements[1].value="";
                updateform.elements[2].value="";
                updateform.removeAttribute('userid');
                updateform.style="display:none";
                form.style="display:block";

                //load the updated contacts
                loadContacts(contacts)
        });
        



