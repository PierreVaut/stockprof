

export const get = { 
    method: 'GET',
    accept: 'application/json',
    credentials: 'include'
};

export const post = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}