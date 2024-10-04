document.getElementById('pizza-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const size = document.getElementById('size').value;
    const crust = document.getElementById('crust').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Get selected toppings
    const toppings = [];
    document.querySelectorAll('input[name="toppings"]:checked').forEach(function(el) {
        toppings.push(el.value);
    });

    // Generate order summary
    let summaryText = `
        <strong>Name:</strong> ${name} <br>
        <strong>Address:</strong> ${address} <br>
        <strong>Phone:</strong> ${phone} <br>
        <strong>Pizza Size:</strong> ${size} <br>
        <strong>Crust Type:</strong> ${crust} <br>
        <strong>Toppings:</strong> ${toppings.length > 0 ? toppings.join(', ') : 'None'} <br>
    `;

    document.getElementById('summary').innerHTML = summaryText;

    // Show the summary section and hide the form
    document.getElementById('order-summary').classList.remove('hidden');
    document.getElementById('pizza-form').classList.add('hidden');
});

function confirmOrder() {
    alert('Thank you for your order! Your pizza is on the way.');
    location.reload(); // Reload page to reset the form
}
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});