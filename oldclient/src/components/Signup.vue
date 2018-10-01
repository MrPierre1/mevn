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

             <v-flex>
              <v-text-field
              type="file" 
              name="file-to-upload"
              v-model="file"
              label="file"
              ></v-text-field>
            </v-flex>

          
     <v-toolbar dark color="primary">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
                <v-icon>link</v-icon>
            </v-btn>
        </v-toolbar>
		<v-content>
			<v-container fluid>
				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
				<v-dialog v-model="dialog" max-width="290">
					<v-card>
						<v-card-title class="headline">Hello World!</v-card-title>
						<v-card-text>Image Upload Script in VUE JS
							<hr>Yubaraj Shrestha
							<br>http://yubarajshrestha.com.np/</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-container>
		</v-content>


            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="onSave">Sign Up</v-btn>
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
      file: ''
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
    onClear: function() {
      alert("clear");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
