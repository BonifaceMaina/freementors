const users = {
    newUser:{
        firstName: 'Boniface', 
        lastName: 'Maina',
        email: 'karibm@gmail.com', 
        password: 'eagle15', 
        address: 'Kigali', 
        bio: 'Developer, Farmer',
        occupation: 'Code Ninja',
        expertise: 'experienced juggler'
    },
 invalidFname : {
        firstname: '987453', 
        lastname: 'Maina',
        email: 'karisbm@gmailcom', 
        password: 'eagle15', 
        address: 'Kigali', 
        bio: 'Developer, Farmer',
        occupation: 'Code Ninja',
        expertise: 'experienced juggler',
    },
    invalidLname : {
        firstname: 'Boniface', 
        lastname: '3456457',
        email: 'karisbm@gmailcom', 
        password: 'eagle15', 
        address: 'Kigali', 
        bio: 'Developer, Farmer',
        occupation: 'Code Ninja',
        expertise: 'experienced juggler',
    },
    invalidEmail:{
        firstname: 'Boniface', 
        lastname: 'Maina',
        email: 'karisbm@gmailcom', 
        password: 'eagle15', 
        address: 'Kigali', 
        bio: 'Developer, Farmer',
        occupation: 'Code Ninja',
        expertise: 'experienced juggler',
    },
    duplicateEmail:{
        firstname: 'Boniface', 
        lastname: 'Maina',
        email: 'karisbm@gmailcom', 
        password: 'eagle15', 
        address: 'Kigali', 
        bio: 'Developer, Farmer',
        occupation: 'Code Ninja',
        expertise: 'experienced juggler',
    }, 
    userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDAwMjMwfQ._IaMtX-xuzuygTav0D7MNtQ9rsQVZwOcM8wVQWu9ygE',
    mentorToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4',
    invalidMentor: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZHNmZ3NkZiIsImVtYWlsIjoia2FyaXNAZ21haWwuY29tIiwiaXNNZW50b3IiOnRydWUsImFkbWluIjpmYWxzZSwiaWF0IjoxNTY2ODI2MzYxfQ.jhKnpzUNbTnZovQHWxtMQ7DXTetOv-QIYNz5H4B9MA4',
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQm9uaWZhY2UiLCJlbWFpbCI6ImthcmlzYm1AZ21haWwuY29tIiwiaXNNZW50b3IiOmZhbHNlLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY3MDA1OTcyfQ.0nZI44TqlVYhUA1kFJaazpAak6uqVPDs6f9kVyhgrzk'
}

export default users;