<template>
 <v-app>
    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

     <v-btn v-if="loggedIn"
          @click="getOut"
          flat
          :to="logout.path">
          <v-icon left dark>{{ logout.icon }}</v-icon>
          {{ logout.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "secretpage", path: "/secretpage", icon: "lock" }
      ],
      logout: { title: "logout", path: "/login", icon: "exit_to_app" },
      loggedIn: false
    };
  },
  updated: function() {
    this.I = false;
    this.$nextTick(function() {
      if (localStorage.getItem("token")) {
        this.loggedIn = true;
        this.menuItems[1].icon = "lock_open";
      } else {
        this.loggedIn = false;
      }
    });
  },
  methods: {
    getOut: function() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.loggedIn = false;
    }
  },
  name: "App"
};
</script>
