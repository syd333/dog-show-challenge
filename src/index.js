document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('dog-form')
    form.addEventListener('submit', (e) => handleSubmitForm(e))
    function getAllDogs(){
        fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            .then(dogs => {
                dogs.forEach(dog => renderDogs(dog))
            })
    }
    getAllDogs()

    function renderDogs(dog){
        let table = document.getElementById('table-body')

        let tr = document.createElement('tr')

        let name = document.createElement('td')
        name.innerText = dog.name

        let breed = document.createElement('td')
        breed.innerText = dog.breed

        let sex = document.createElement('td')
        sex.innerText = dog.sex

        let buttonWrapper = document.createElement('td')
        let button = document.createElement('button')
        button.innerText = 'Edit Dog'
        buttonWrapper.appendChild(button)
        button.addEventListener('click', () => populateForm(dog))

        tr.append(name, breed,sex,buttonWrapper)
        table.appendChild(tr)
    }

    function populateForm(dog){
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.dataset.id = dog.id
    }

    function handleSubmitForm(e){
        e.preventDefault()
        let table = document.getElementById('table-body')
        let dogId = e.target.dataset.id

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": e.target.name.value,
                "breed": e.target.breed.value,
                "sex": e.target.sex.value
            })
        })
            .then(res => res.json())
            .then(() => {
                table.innerHTML = ''
                form.reset()
                getAllDogs()
            })
    }
})
