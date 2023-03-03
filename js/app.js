const aiTools = 'https://openapi.programming-hero.com/api/ai/tools';
fetch(aiTools)
  .then((res) => res.json())
  .then((data) => displayData(data));

const displayData = (dataAiTools) => {
  //   console.log(dataAiTools.data.tools[11]);
  //   console.log(dataAiTools.data.tools[0].features[0]);

  const dataAll = dataAiTools.data.tools;

  const card_box = document.getElementById('card_box');
  const data = dataAll.slice(0, 6);
  data.forEach((element) => {
    // console.log(element);
    // const fea = element.features.map((fea) => fea);
    const { image, name, published_in, features, description, id } = element;
    // console.log(id);
    const card_div = document.createElement('div');
    card_div.classList.add('card', 'mt-5');
    card_div.innerHTML = `
    <img src="${image}" class="card-img-top " alt="card image">
    <div class="card-body">
        <h5 class="card-title">Features</h5>
        <ol class="features_list">
       
          
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
    `;
    card_box.appendChild(card_div);
  });
};

const modal_data = (id) => {
  const modal_data = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(modal_data)
    .then((res) => res.json())
    .then((modal_data) => {
      show_modal(modal_data.data);
    });
};

const show_modal = (modal_data) => {
  //   console.log(modal_data);
  const {
    accuracy,
    description,
    features,
    image_link,
    integrations,
    pricing,
    input_output_examples,
  } = modal_data;
  console.dir(image_link);

  const modal_body = (document.getElementById('modal_body').innerHTML = `
  
  <button type="button"
  class="btn-close rounded-pill bg-warning p-3 position-absolute top-0 start-100 translate-middle"
  data-bs-dismiss="modal" aria-label="Close">
  </button>



<div class="row">

  <div class="col-6 ">
      <h4 class="display-6 fw-bold text-light">${description}</h4>

      <div class="d-flex gap-3 text-center my-5">

          <div class="text-success bg-white fw-bold p-3 rounded">
          ${pricing[0].price}
          ${pricing[0].plan}
          </div>
          <div class="text-warning bg-white fw-bold p-3 rounded">
          ${pricing[1].price}
          ${pricing[1].plan}
          </div>
          <div class="text-danger bg-white fw-bold p-3 rounded">
          ${pricing[2].price}
          ${pricing[2].plan}
          </div>

      </div>
      <div class="">
          <div class="d-flex gap-3 mt-4 text-light">
              <div>
                  <h5>Features</h5>
                  <ul>
                      <li></li>
                      <li>Multilingual support</li>
                      <li>Seamless integration</li>
                  </ul>
              </div>
              <div>
                  <h5>Integrations</h5>
                  <ul>
                      <li>FB Messenger
                      </li>
                      <li> Slack</li>
                      <li>
                          Telegram</li>
                  </ul>
              </div>
          </div>

      </div>

  </div>

  <div class="col-6">
      <div class="position-relative">
          <button class="btn btn-primary mt-3 me-3 position-absolute top-0 end-0">94%
              accuracy</button>
          <img class="img-fluid rounded" src="${image_link[0]}" alt="">
      </div>
      <div class="text-light text-center mt-3">
          <h4>Can you give any example?</h4>
          <p>I'm doing well, thank you for asking. How can I assist you today?</p>
      </div>

  </div>
</div>
  
  `);
};

// console.log(modal_body);
