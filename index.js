import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const allPosts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/view", (req, res) => {
    res.render("view.ejs", { allPosts });
});

app.post("/view", (req, res) => {
    const post = {
        Email: req.body["email"],
        Password: req.body["password"],
        Title: req.body["title"],
        Description: req.body["description"],
        Content: req.body["content"]
    };
    allPosts.push(post);
    res.render("view.ejs", { allPosts });
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", { allPosts, FoundTitle: null, postFound: false });
});

app.post("/edit", (req, res) => {
    const FoundTitle = req.body["titleName"];
    // const postFound = allPosts.some(post => post.Title.toLowerCase() === FoundTitle.toLowerCase());
    let postFound= false

    allPosts.forEach((post)=>{
        if(post.Title===FoundTitle){
            postFound=true
        }
    })
    res.render("edit.ejs", { allPosts, FoundTitle: FoundTitle, postFound: postFound });
});

app.get("/delete", (req, res) => {
    res.render("delete.ejs", { deleted: null });
});

app.post("/delete", (req, res) => {
    const deleteObjTitle = req.body["titleName"];
    const initialLength = allPosts.length;
    removeItemByValue(allPosts, "Title", deleteObjTitle);
    const deleted = allPosts.length < initialLength;
    res.render("delete.ejs", { deleted });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// function removeItemByValue(array, key, value) {
//     const index = array.findIndex(item => item[key].toLowerCase() === value.toLowerCase());
//     if (index !== -1) {
//         array.splice(index, 1);
//     }
//     // or
// }
//function to delete the array item if it mathces with query title
function removeItemByValue(array, key, value) {
    array.forEach((item, index) => {
        if (item[key] === value) {
            array.splice(index, 1);
        }
    });
}
