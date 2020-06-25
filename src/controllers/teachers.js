exports.getAllTeachers = (req, res) => {
    res.status(200).json({
        data: [{
            name: 'John',
            age: 24,
        }, {
            name: 'Grims',
            age: 35,
        }],
        status: 200
    })
}