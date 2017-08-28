module.exports = function apiRouting(app){

    var bodyParser = require('body-parser')
    var jsonParser = bodyParser.json()

    let nextUserId = 4;
    let usersList = [
            { id: 1, firstName: 'Joe', lastName: 'Bloggs', email: 'joe.bloggs@test.com' },
            { id: 2, firstName: 'Matt', lastName: 'Saunders', email: 'matt@river.red' },
            { id: 3, firstName: 'Homer', lastName: 'Simpson', email: 'homer@test.com' },
        ];


    // go get the list of users
    app.get('/api/users', function(req, res){
        res.json(usersList);
    });



    app.post('/api/users', jsonParser, function(req, res){
        const user = req.body;
        if(!user)
            return res.sendStatus(400)

        user.id = nextUserId;
        usersList.push(user);
        nextUserId = nextUserId + 1;

        return res.sendStatus(200);
    });


    app.put('/api/users/:id', jsonParser, function(req,res){
        const user = req.body;
        const existingIndex = usersList.findIndex(x => x.id == req.params.id);

        if(!user || existingIndex == -1 || !req.params.id)
            return res.sendStatus(400);

        user.id = req.params.id;
        usersList[existingIndex] = user;

        return res.sendStatus(200);
    });



    app.delete('/api/users/:id', jsonParser, function(req,res){
        const user = req.body;
        const existingIndex = usersList.findIndex(x => x.id == req.params.id);

        if(!user || existingIndex == -1 || !req.params.id)
            return res.sendStatus(400);

        usersList.splice(existingIndex, 1);
        return res.sendStatus(200);
    });


}