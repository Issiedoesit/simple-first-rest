fetch('http://localhost:3000/subscribers')
  .then(response => response.json())
  .then(data => {
    console.table(data);
    getAllSubscribers(data)
});

const dataContainer = document.getElementById('dataContainer');



const getAllSubscribers = (data) => {
    let subscriber = '';
    data.map((sub, index)=>{
        subscriber += 
        `
        <tr>
            <td class="px-4 text-center py-2">${index+1}</td>
            <td class="px-4 text-center py-2">${sub._id}</td>
            <td class="px-4 text-center py-2">${sub.name}</td>
            <td class="px-4 text-center py-2">${sub.subscribedTo}</td>
            <td class="px-4 text-center py-2">${formatDate(sub.subscribeDate)}</td>
            <td class="px-4 text-center py-2"><button type="button"><i class="fa-solid fa-trash hover:text-blue-500 transition-colors duration-500 ease-in-out"></i></button></td>
        </tr>
        `
    })
    dataContainer.innerHTML += subscriber
}

const formatDate = subDate => new Date(subDate).toLocaleDateString();


const addNewSubscriber = (newSubscriber) => {
    const dataContainer = document.getElementById('dataContainer');
    const newRow = 
    `
    <tr>
        <td class="px-4 text-center py-2">${dataContainer.children.length+1}</td>
        <td class="px-4 text-center py-2">${newSubscriber._id}</td>
        <td class="px-4 text-center py-2">${newSubscriber.name}</td>
        <td class="px-4 text-center py-2">${newSubscriber.subscribedTo}</td>
        <td class="px-4 text-center py-2">${formatDate(newSubscriber.subscribeDate)}</td>
        <td class="px-4 text-center py-2"><button type="button"><i class="fa-solid fa-trash hover:text-blue-500 transition-colors duration-500 ease-in-out"></i></button></td>
    </tr>
    `
    dataContainer.innerHTML += newRow
}


const form = document.querySelector('form')

form.onsubmit = async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const subscribedTo = document.getElementById('subscribed_to').value

    const response = await fetch('http://localhost:3000/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "name": name,
            "subscribedTo": subscribedTo
         }),
      });
      
      const data = await response.json();
      
      console.log(data);
      addNewSubscriber(data);

      
}