/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload">Upload </router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const Upload = Vue.component ('upload-form', {
    template:`
    <div>
    <h1>Upload Form</h1>
    <br>
    <form @submit.prevent="uploadPhoto" id="uploadForm">
        <div class='form-group'>
            <input type="file" class="form-control-file" id="photo" name="photo">
            <br>
            <label for="description">Description</label>
            <textarea class="form-control" id="description" name="description" rows="3"></textarea>
            <br>
            <button class="btn btn-primary text-light">Upload</button>
        </div>
    </form>
    </div>
    `,
    methods:{
        uploadPhoto: () => {
            let uploadForm = document.getElementById('uploadForm')
            let form_data = new FormData(uploadForm)


            fetch("/api/upload",{
            method: 'POST',
            body: form_data,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin' 
        })
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResponse){
            console.log(jsonResponse["message"]);
        })
        .catch(function(error){
            console.log(error["error"]);
        });
    }
}
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path:"/upload", component: Upload}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});