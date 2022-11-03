let array = [];
const URL = "https://6363a39537f2167d6f7eb626.mockapi.io/users";
let jsonData = [];
let inputBusqueda = document.getElementById("inputGet1Id");
let btnBusqueda = document.getElementById("btnGet1");

let inputNameAgregar = document.getElementById("inputPostNombre");
let inputLastNameAgregar = document.getElementById("inputPostApellido");
let btnAgregar = document.getElementById("btnPost");


let getJSONData = function (url) {
  let result = {};
  //   showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      // hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      //   hideSpinner();
      return result;
    });
};

async function getData() {

  const jsonData = await fetch(URL).then((response) => response.json()); //requiere => type="module"

  console.log(jsonData);
  showUsers(jsonData);
}




async function buscar() {
  let idbusqueda = inputBusqueda.value;
  if (idbusqueda == "") {
    let jsonData = await fetch(URL).then((response) => response.json());
    console.log(jsonData);
    showUsers(jsonData);
  } else {
    let jsonData = await fetch(URL + `/${idbusqueda}`).then((response) => response.json());
    console.log(jsonData);
    showUsers([jsonData])
  }

}
// let resultado1=jsonData[jsonData.length-jsonData.length];
// console.log(resultado1)

//Muestra las categorias en el html
function showUsers(array) {

  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let elemento = array[i];

    htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${elemento.name}</h4>
                        </div>
                        <p class="mb-1">${elemento.lastname}</p>
                        <p class="mb-1">${elemento.id}</p>
                    </div>
                </div>
            </div>
            `
  }

  document.getElementById("results").innerHTML = htmlContentToAppend;
}






//DISABLED ENABLED

if (inputNameAgregar.value !== "" && inputLastNameAgregar.value !== "") {
  btnAgregar.removeAttribute("disabled", "");
  btnAgregar.setAttribute("enabled", "");
}



//POST


btnAgregar.addEventListener("click", function () {
  let data = {
    name: inputNameAgregar.value,
    lastname: inputLastNameAgregar.value
  };

  fetch(URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async function (data) {
      console.log(response.json(data))
      console.log('Success:', data);
      await showUsers();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

});