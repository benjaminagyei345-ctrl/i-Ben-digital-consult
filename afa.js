
function orderAFA(product) {
    let message = `I want to buy ${product} plan.`;
    window.open(`https://wa.me/YOURNUMBER?text=${encodeURIComponent(message)}`, '_blank');
}

function registerAFA() {
    let name = document.getElementById('afa-name').value;
    let number = document.getElementById('afa-number').value;
    if (!name || !number) {
        alert('Please fill in all details');
        return;
    }
    let message = `AFA Registration Request:\nName: ${name}\nNumber: ${number}`;
    window.open(`https://wa.me/YOURNUMBER?text=${encodeURIComponent(message)}`, '_blank');
}
