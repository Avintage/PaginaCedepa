	const form = document.getElementById("formulario");
	
	form.addEventListener("submit",function (event){
	event.preventDefault();
	let transactionFormData = new FormData(form);
	let transactionObj = convertFormDataToTransactionObj (transactionFormData);
	saveTransactionData (transactionObj)
	insertRowInTransactionTable (transactionObj)
	form.reset();
	})
	document.addEventListener("DOMContentLoaded", function(event){
		let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
		transactionObjArr===null ? 
		[]:
		transactionObjArr.forEach(element => insertRowInTransactionTable(element));
	})
	
	function getTransactionId(){
		let lastTransactionId = localStorage.getItem("id1") || "-1";
		let newTransactionId = JSON.parse(lastTransactionId) + 1;
		localStorage.setItem("id1", JSON.stringify(newTransactionId))
		return newTransactionId;
		
	}
	function convertFormDataToTransactionObj(transactionFormData){
		let radios1 = transactionFormData.get("radios1")
		let descrip1 = transactionFormData.get("descrip1")
		let monto1 = transactionFormData.get("monto1")
		let cate1 = transactionFormData.get("cate1")
		let id1 = getTransactionId()
	return {
		"radios1":radios1,
		"descrip1":descrip1,
		"monto1":monto1,
		"cate1":cate1,
		"id1":id1
		}
	}
	
	
	function insertRowInTransactionTable (transactionObj) {
	let myTableRef = document.getElementById("tablaTrato");
	let newRow = myTableRef.insertRow(-1);
	let newCell = newRow.insertCell(0);
	newCell.innerText = transactionObj.radios1;
	newCell = newRow.insertCell(1);
	newCell.innerText = transactionObj.descrip1;
	newCell = newRow.insertCell(2);
	newCell.innerText = transactionObj.monto1;
	newCell = newRow.insertCell(3);
	newCell.innerText = transactionObj.cate1;
	let newDeleteCell = newRow.insertCell(4);
	let deleteButton = document.createElement("button");
	deleteButton.innerText = "Eliminar";
	newDeleteCell.appendChild(deleteButton);
	deleteButton.addEventListener("click", (evento)=>{
		evento.target.parentNode.parentNode.remove()
		let transactionId = newRow.getAttribute("data-transaction-id");
		newRow.remove();
		deleteTransactionObj(transactionId)
	})
	};
		//se le pasa el parametro transactionId
	function deleteTransactionObj(transactionId) {
		//Obtengo las transacciones del localstorage 
		let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
		//Busco en el indice del array la posicion de la transaccion para eliminarla
		let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
		//Elimino el elemento de esa posicion
		transactionObjArr.splice(transactionIndexInArray, 1);
		//Lo convierto en objeto JSON
		let transactionArrayJSON = JSON.stringify(transactionObjArr);
		//Guardo en el localstorage con formato JSON
		localStorage.setItem("transactionData", transactionArrayJSON)
	};
	function saveTransactionData(transactionObj) {
	let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
	myTransactionArray.push(transactionObj)
	let transactionArrayJSON = JSON.stringify(myTransactionArray) ;
	localStorage.setItem("transactionData", transactionArrayJSON)
	
	};