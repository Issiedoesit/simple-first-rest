
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
            <td class="px-4 text-center py-2 sub-id">${index+1}</td>
            <td class="px-4 text-center py-2">${sub._id}</td>
            <td class="px-4 text-center py-2">${sub.name}</td>
            <td class="px-4 text-center py-2">${sub.subscribedTo}</td>
            <td class="px-4 text-center py-2">${formatDate(sub.subscribeDate)}</td>
            <td class="px-4 text-center py-2">
                <button class="delete-btn" type="button" data-id="${sub._id}" onclick="deleteSubscriber('${sub._id}')">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 4.48665C11.78 4.26665 9.54667 4.15332 7.32 4.15332C6 4.15332 4.68 4.21999 3.36 4.35332L2 4.48665" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.34" d="M5.66667 3.81325L5.81334 2.93992C5.92001 2.30659 6 1.83325 7.12667 1.83325H8.87334C10 1.83325 10.0867 2.33325 10.1867 2.94659L10.3333 3.81325" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5667 6.59326L12.1333 13.3066C12.06 14.3533 12 15.1666 10.14 15.1666H5.86C4 15.1666 3.94 14.3533 3.86667 13.3066L3.43333 6.59326" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.34" d="M6.88667 11.5H9.10667" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.34" d="M6.33333 8.83325H9.66666" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </td>
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
        <td class="px-4 text-center py-2 sub-id">${dataContainer.children.length+1}</td>
        <td class="px-4 text-center py-2">${newSubscriber._id}</td>
        <td class="px-4 text-center py-2">${newSubscriber.name}</td>
        <td class="px-4 text-center py-2">${newSubscriber.subscribedTo}</td>
        <td class="px-4 text-center py-2">${formatDate(newSubscriber.subscribeDate)}</td>
        <td class="px-4 text-center py-2">
            <button class="delete-btn" type="button" data-id="${newSubscriber._id}" onclick="deleteSubscriber('${newSubscriber._id}')">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4.48665C11.78 4.26665 9.54667 4.15332 7.32 4.15332C6 4.15332 4.68 4.21999 3.36 4.35332L2 4.48665" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M5.66667 3.81325L5.81334 2.93992C5.92001 2.30659 6 1.83325 7.12667 1.83325H8.87334C10 1.83325 10.0867 2.33325 10.1867 2.94659L10.3333 3.81325" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5667 6.59326L12.1333 13.3066C12.06 14.3533 12 15.1666 10.14 15.1666H5.86C4 15.1666 3.94 14.3533 3.86667 13.3066L3.43333 6.59326" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M6.88667 11.5H9.10667" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M6.33333 8.83325H9.66666" stroke="#3992CC" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </td>
    </tr>
    `
    dataContainer.innerHTML += newRow

}

const updateTable = () => {
    const subscribers = document.querySelectorAll('.sub-id');
    subscribers.forEach((subscriber, index) => {
      subscriber.textContent = index + 1;
    });
  };

const form = document.querySelector('form')

form.onsubmit = async (e) => {
    e.preventDefault()
    let name = document.getElementById('name').value
    let subscribedTo = document.getElementById('subscribed_to').value

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
      form.reset()
     
}


const deleteSubscriber = (subscriberId) => {
    if (confirm(`Are you sure you want to delete subscriber with id: ${subscriberId}?`)) {
        fetch(`http://localhost:3000/subscribers/${subscriberId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Subscriber deleted') {
                const subscriberRow = document.querySelector(`[data-id='${subscriberId}']`).parentNode.parentNode;
                subscriberRow.remove()
                updateTable()
            } else {
                console.error('Error deleting subscriber');
            }
        })
        .catch(err => console.error(err));
    }

  };