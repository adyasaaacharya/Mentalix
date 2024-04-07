const express = require('express');
const app = express();
const port = 8080;
const {spawn} = require('child_process')
const bodyParser = require('body-parser')

app.use('/public/', express.static('./public'));

//EJS to JS (for Python)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let getInput;
let output = "";
app.post('/form', (req, res) => {
    // console.log(output.inputfield)
    // let index = parseInt(output.depression);
    // if (index != NaN) {
    //     getInput[index] = 1;
    // }
    // console.log(getInput)
    // console.log(getInput.length)

    getInput = Array.apply(null, Array(69)).map(function (y, i) { return 0; });
    const inputFields = Object.values(req.body);
    for (let i = 0 ; i < inputFields.length ; i++) {
        index = parseInt(inputFields[i]);
        if (index !== NaN) {
            getInput[index] = 1;
        }
    }
    console.log(getInput)

    const childPython = spawn('python', ['Mental_Illness_Access.py', getInput])

    output = "";
    childPython.stdout.on('data', (data) => {
        output = data;
        console.log(`stdout: ${data}`);
    });
    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    childPython.on('close', (code) => {
        console.log(`child process exited with code: ${code}`);
    });
})




//Python to JS
// const childPython = spawn('python', ['Mental_Illness_Access.py', [1,  0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1]])
// const childPython = spawn('python', ['Mental_Illness_Access.py', getInput])

// let output = "";
// childPython.stdout.on('data', (data) => {
//     output = data;
//     console.log(`stdout: ${data}`);
// });
// childPython.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });
// childPython.on('close', (code) => {
//     console.log(`child process exited with code: ${code}`);
// });


// JS to EJS
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    const mlOutput = output;
    res.render('index', { mlOutput: mlOutput });
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/services', (req, res) => {
    res.render('services');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

