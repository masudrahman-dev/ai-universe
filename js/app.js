const aiTools = 'https://openapi.programming-hero.com/api/ai/tools';
fetch(aiTools)
  .then((res) => res.json())
  .then((data) => dataSlice(data));
spinner(true);

const dataSlice = (data) => {
  let dataSlice = data.data.tools.slice(0, 6);
  displayData(dataSlice);
};
const dataAll = (data) => {
  const AllShowData = data.data.tools;
  displayData(AllShowData);
  //   displayData();
};

document.getElementById('showDataAll').addEventListener('click', () => {
  fetch(aiTools)
    .then((res) => res.json())
    .then((data) => dataGet(data));
  spinner(true);
  const dataGet = (data) => {
    dataAll(data);
  };
});
const displayData = (displayData) => {
  const card_box = document.getElementById('card_box');
  // console.log(displayData);
  if (5 < displayData.length) {
    document.getElementById('showDataAll').classList.remove('d-none');
  } else {
    document.getElementById('showDataAll').classList.add('d-none');
  }
  displayData.forEach((element) => {
    const { image, name, published_in, features, id } = element;

    const card_div = document.createElement('div');
    card_div.classList.add('col');
    card_div.innerHTML = `
    <div class="card shadow-sm">
    <img src="${image}" class="img-fluid rounded m-3" alt="...">
    <div class="card-body">
    <h5 class="card-title">Features</h5>
           <ol class="features_list">
            <li>${features[0]}</li>
            <li>${features[1]}</li>
            <li>${features[2]}</li>
            </ol>
         <hr>
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h4 class="fw-bold">${name}</h4>            
                <p>${published_in}</p>
            </div>

            <span onclick="modal_data('${id}')" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="shadow-sm rounded-pill" src="./images/datails-icon.svg" alt="">
            </span>
        </div>
    </div>
</div>
    `;
    card_box.appendChild(card_div);
  });
  spinner(false);
};

const modal_data = (id) => {
  const modal_data = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(modal_data);
  fetch(modal_data)
    .then((res) => res.json())
    .then((modal_data) => {
      show_modal(modal_data.data);
    });
};

const show_modal = (modal_data) => {
  console.log(modal_data);
  const {
    accuracy,
    description,
    image_link,
    features,
    integrations,
    pricing,
    input_output_examples,
  } = modal_data;

  // console.log(accuracy.score === null);

  const features_data = Object.values(features);

  const modal_body = (document.getElementById('modal_body').innerHTML = `
  
  <button type="button"
  class="btn-close rounded-pill bg-warning p-3 position-absolute top-0 start-100 translate-middle"
  data-bs-dismiss="modal" aria-label="Close">
  </button>



 <div class="d-flex gap-3 flex-column flex-xl-row">

  <div class="order-1 order-xl-0">
      <h4 class="display-6 fw-bold text-light text-center text-xl-start ">${description}</h4>

      <div class="d-flex gap-3 text-center my-5">

          <div class="text-success bg-white fw-bold p-3 rounded">
          ${integrations === null ? 'not found' : pricing[0].price}
          ${integrations === null ? 'not found' : pricing[0].plan}
          </div>
          <div class="text-warning bg-white fw-bold p-3 rounded">
          ${pricing === null ? 'not found' : pricing[1].price}
          ${pricing === null ? 'not found' : pricing[1].plan}
          </div>
          <div class="text-danger bg-white fw-bold p-3 rounded">
          ${pricing === null ? 'not found' : pricing[2].price}
          ${pricing === null ? 'not found' : pricing[2].plan}
          </div>

      </div>
      <div class="">
          <div class="row mt-5 text-light">
              <div class="col">
                  <h5>Features</h5>
                  <ul modal_features_list>
                  <li>
                  ${
                    input_output_examples === null
                      ? 'not found'
                      : features_data[0].feature_name
                  }
                 </li>
                      <li>${
                        input_output_examples === null
                          ? 'not found'
                          : features_data[1].feature_name
                      }
                      </li>
                      <li>${
                        input_output_examples === null
                          ? 'not found'
                          : features_data[2].feature_name
                      }
                      </li>
                    
                    
                 
                  </ul>
              </div>
              <div class="col">
                  <h5>Integrations</h5>
                  <ul>
                      <li>${
                        integrations === null ? 'not found' : integrations[0]
                      }
                      </li>
                      <li>${
                        integrations === null ? 'not found' : integrations[1]
                      }</li>
                      <li>
                      ${
                        integrations === null ? 'not found' : integrations[2]
                      }</li>
                  
                      
                  </ul>
              </div>
          </div>

      </div>

  </div>

  <div class="order-0 order-xl-1">
      <div class="position-relative">
          <button class="btn btn-primary mt-3 me-3 position-absolute top-0 end-0">${
            accuracy.score === null
              ? 'not found'
              : accuracy.score + '%' + ' accuracy'
          }
             </button>
          <img class="img-fluid rounded" src="${image_link[0]}" alt="">
      </div>
      <div class="text-light text-center mt-3">
          <h4>${
            input_output_examples === null
              ? 'not found'
              : input_output_examples[0].input
          }</h4>
          <p>${
            input_output_examples === null
              ? 'not found'
              : input_output_examples[0].output
          }</p>
      </div>

  </div>
</div>
  
  `);
};

function spinner(isLoading) {
  if (isLoading) {
    document.getElementById('spinner').classList.remove('d-none');
  } else {
    document.getElementById('spinner').classList.add('d-none');
  }
}
