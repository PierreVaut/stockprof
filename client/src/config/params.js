

export const get = { 
    method: 'GET',
    credentials: 'include',
    accept: 'application/json',
    
};

export const post = body => ({
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})