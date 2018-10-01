<template>
 <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
             <v-flex>
              <v-text-field
                v-model="username"
                name="username"
                label="username"
                id="username"
                type="username"
                icon="face"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                id="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="password"
                required></v-text-field>
            </v-flex>
		
				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
            name="image"
					>
				</v-flex>
		




          











            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="onSave">Sign Up</v-btn>
              <v-btn color="primary" @click="uploadFile">uploadFile</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container> 



</template>

<script>
import axios from "axios";
import { ifError } from "assert";
import { userInfo } from "os";
export default {
  name: "Signup",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      username: "",
      email: "",
      password: "",
      name: "",
      file: '',
       title: "Image Upload",
        dialog: false,
		imageName: '',
		imageUrl: '',
    imageFile: '', 
    thesefiles: '',
    fileData: ''
    };
  },
  created: function created() {},
  methods: {
    onSave: function() {
      var newuser = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      if (!newuser.username || !newuser.email || !newuser.password) {
        alert("Please try again");
      }
      axios.post("http://localhost:4200/users/signup", newuser).then(value => {
        console.log("this is value", value);
        this.name = "value";
        alert("use saved");
        this.$router.push("/login");
      });

      console.log("Save", this.name, this.email);
    },
    uploadFile: function() {
       let config = {
      header : {
        'Content-Type' : 'image/png'
      }
      }

      var formData = new FormData();
     this.fileData = formData.append('file', this.imageFile)
      axios.post("http://localhost:4200/fileupload",{name: this.imageName, file: this.imageFile, files: this.file, thesefiles: this.thesefiles, fileData: this.fileData}, {
    headers: {
       'Content-Type' : 'image/png'
    }
  }).then(value => {
        console.log("this is value", value);
      });
    },
     pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          this.thesefiles = files
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
