const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)

}

const displayPhones = (phones, dataLimit)=> {
    const phoneContainer = document.getElementById("phones-container");
    phoneContainer.innerHTML = ``;
    //limit//
    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length>10){
      phones = phones.slice(0,10);
      showAll.classList.remove("d-none");

    }
    else {
      showAll.classList.add("d-none");
    }
    //not found//
    const notFound = document.getElementById("not-found");
    if (phones.length===0){
      notFound.classList.remove('d-none');
    }
    else {
      notFound.classList.add('d-none');

    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"> Show Details </button>

          
        </div>
      </div>
        
        `
        phoneContainer.appendChild(phoneDiv);

    })
    //spinner end//
    toggleSpinner(false)



}

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const textField = document.getElementById("text-field");
  const finalText = textField.value;
  loadPhones(finalText, dataLimit);
  

}

document.getElementById("btn-search").addEventListener('click', function(){
  processSearch(10);
   
   
  })
  
  document.getElementById('text-field').addEventListener('keypress', function (e) {
    if (e.key ==='Enter') {
      processSearch(10);
    }
  })



const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById("loader");
  if(isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none');

  }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
processSearch();
})
  
const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = res.json();
  displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = phone.name;
  const displayPhoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
  
  `
  

}

loadPhones('apple');