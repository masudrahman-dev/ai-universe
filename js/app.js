const aiTools = 'https://openapi.programming-hero.com/api/ai/tools';
fetch(aiTools)
  .then((res) => res.json())
  .then((data) => displayData(data));

const displayData = (dataAiTools) => {
  //   console.log(dataAiTools.data.tools[0].features[0]);

  const dataAll = dataAiTools.data.tools;

  const features_list = document.querySelector('.features_list');
  dataAiTools.data.tools[7].features.forEach((fea) => {
    // console.log(fea);
    const li = document.createElement('li');
    li.innerHTML = `${fea}`;
    features_list.appendChild(li);
  });

  const card_box = document.getElementById('card_box');
  const data = dataAll.slice(0, 6);
  data.forEach((element) => {
    const fea = element.features.map((fea) => fea);

    const card_div = document.createElement('div');
    card_div.classList.add('card', 'mt-5');
    card_div.innerHTML = `
    <img src="${element.image}" class="card-img-top " alt="card image">
    <div class="card-body">
        <h5 class="card-title">Features</h5>
        <ol class="features_list">
       
          
        </ol>
        <hr>
        <div class="d-flex align-items-center justify-content-between">

            <div>
                <h4 class="fw-bold">${element.name}</h4>            
                <p>${element.published_in}</p>
            </div>

            <span type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="shadow-sm rounded-pill" src="./images/datails-icon.svg" alt="">
            </span>
        </div>

    </div>
    `;
    card_box.appendChild(card_div);
  });
};

const modal = () => {
  const main_container = document.getElementById('main_container');
  main_container.innerHTML = `
  <div class="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered  ">
      <div class="modal-content p-5 bg-secondary position-relative">


          <button type="button"
              class="btn-close rounded-pill bg-warning p-3 position-absolute top-0 start-100 translate-middle"
              data-bs-dismiss="modal" aria-label="Close">
          </button>



          <div class="row">

              <div class="col-6 ">
                  <h4 class="display-6 fw-bold text-light">ChatGPT is an AI-powered chatbot platform that
                      uses OpenAI's GPT technology to
                      simulate human conversation.</h4>

                  <div class="d-flex gap-3 text-center my-5">

                      <div class="text-success bg-white fw-bold p-3 rounded">
                          $10/month
                          Basic
                      </div>
                      <div class="text-warning bg-white fw-bold p-3 rounded">
                          $50/month
                          Pro
                      </div>
                      <div class="text-danger bg-white fw-bold p-3 rounded">
                          Contact
                          us
                          Enterprise
                      </div>

                  </div>
                  <div class="">
                      <div class="d-flex gap-3 mt-4 text-light">
                          <div>
                              <h5>Features</h5>
                              <ul>
                                  <li>Customizable responses</li>
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
                      <img class="img-fluid rounded" src=" https://source.unsplash.com/user/c_v_r" alt="">
                  </div>
                  <div class="text-light text-center mt-3">
                      <h4>Can you give any example?</h4>
                      <p>I'm doing well, thank you for asking. How can I assist you today?</p>
                  </div>

              </div>
          </div>


      </div>
  </div>
</div>

  `;
};
// modal();
