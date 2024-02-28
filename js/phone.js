const loadPhone = async (searchText = '13') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  displayPhone(phone);
};

const displayPhone = phone => {
  // step kar viore thakbe
  const phoneContainer = document.getElementById('phone-container');
  const showAllContainer = document.getElementById('show-all-container');
  if (phone.length > 12) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }
  phone = phone.slice(0, 12);

  // clear phone clear card data new card add
  phoneContainer.textContent = '';
  phone.forEach(phone => {
    // console.log(phone);
    //step-2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    // step-3 inner-Html set
    phoneCard.innerHTML = `
     <figure><img src="${phone.image}" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handeShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
    `;
    // step-4 appendChild
    phoneContainer.appendChild(phoneCard);
  });
};

const handeShowDetails = async id => {
  // console.log(id);
  // details data load
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showDisplayDetails(phone);
};

const showDisplayDetails = phone => {
  console.log(phone);
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
  const phoneDetails = document.getElementById('show-details-container');
  phoneDetails.innerHTML = `
  <img src="${phone.image}"></img>
  <p><span>storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>display-Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>chip-sat: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>slug: </span>${phone?.slug}</p>
  <p><span>releaseDate: </span>${phone?.releaseDate}</p>
  <p><span>Brand: </span>${phone?.brand}</p>
  <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
  `;

  show_details_modal.showModal();
};

function handlerSearch() {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
}
loadPhone();
