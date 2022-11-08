// import { useAuth } from "../utils/auth";

export const postRegisterLogin = (data: object) => {
    const csrftoken = getCookie('csrftoken');


    fetch('/api/register2/?format=json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': `${csrftoken}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            console.log(data[0])

        })
        //Then with the error genereted...
        .catch((error) => {
            console.error('Error:', error);
        });

}



export const postLogin = (data: object) => {
    const csrftoken = getCookie('csrftoken');


    fetch('/api/token/?format=json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': `${csrftoken}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {

 
            return {
                accessToken: data.access,
                refreshToken: data.refresh,
            };

            
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error('Error:', error);
        });

}




function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}